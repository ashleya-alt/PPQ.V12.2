import { GameState, ChoiceOutcome, CounterfactualSet, Encounter } from '../types';
import { roundReveal, fallbackPick } from './minigame';

/* ============================================================================
 * v11 outcome resolver. Handles every NEW or REPLACED encounter.
 * Returns null to fall through to the v10 resolver for unchanged encounters
 * (and for unchanged choice indices on lightly patched encounters).
 * ========================================================================== */

type Result = { outcome: ChoiceOutcome; counterfactuals: CounterfactualSet };
type Ext = Partial<ChoiceOutcome>;

function O(msg: string, learn: string, rev: number, stats: ChoiceOutcome['stats'], ext: Ext = {}): ChoiceOutcome {
  return { msg, learn, rev, stats, ...ext };
}

/** Renewal multiplier: rewards the behaviors v11 teaches. Returns [multiplier, explanation]. */
function renewalBoost(gs: GameState): [number, string] {
  const parts: [string, number][] = [];
  const f = (x: string) => gs.flags.includes(x);
  if (f('value_case')) parts.push(['value case built', 0.2]);
  if (gs.boons.includes('msap')) parts.push(['MSAP in place', 0.1]);
  if (f('attach_win')) parts.push(['attach win', 0.15]);
  if ((gs.journey || 0) >= 4) parts.push(['embedded financial services live', 0.15]);
  if (f('defended')) parts.push(['competitor defeated', 0.1]);
  if (f('dual_process')) parts.push(['volume lost to a rival', -0.25]);
  if (f('churned_partial')) parts.push(['partial churn', -0.3]);
  if (f('buy_rate_ready')) parts.push(['readiness-proven buy rate', 0.1]);
  if (f('split_model')) parts.push(['split-model complexity', -0.1]);
  if (f('premature_buyrate') && f('on_buyrate') && !f('split_model') && !f('buy_rate_ready') && gs.stage < 2.5) parts.push(['premature buy rate never fixed', -0.2]);
  if (f('ach_priced')) parts.push(['ACH priced separately', 0.05]);
  const m = parts.reduce((s, p) => s + p[1], 1);
  const txt = parts.length ? ' Renewal modifiers: ' + parts.map(p => p[0] + ' ' + (p[1] > 0 ? '+' : '') + Math.round(p[1] * 100) + '%').join(', ') + '.' : '';
  return [Math.max(0.4, m), txt];
}

const DISC_NAMES: Record<string, string> = { disc_economics: 'Payments Economics', disc_exec: 'Exec Priorities', disc_competition: 'Competitive Landscape', disc_attach: 'Payments Attach', disc_risk: 'Risk Posture', disc_obj4: 'Merchant Needs' };

/** Mini-game helpers: picks/correct come from game state in play; the simulator/extractor fall back to all-correct (ok) or none (fail). */
function mgState(gs: GameState, enc: Encounter, i: number, ok: boolean): { correct: number; picks: number[]; total: number } {
  const mg = enc.choices[i].minigame!;
  const total = mg.rounds.length;
  if (gs.minigame) return { correct: gs.minigame.correct, picks: gs.minigame.picks, total };
  const picks = mg.rounds.map(r => fallbackPick(r, ok));
  return { correct: ok ? total : 0, picks, total };
}
function mgReveals(enc: Encounter, i: number, picks: number[]): string[] {
  const mg = enc.choices[i].minigame!;
  const out: string[] = [];
  mg.rounds.forEach((r, idx) => { const f = roundReveal(r, picks[idx]); if (f) out.push(f); });
  return out;
}
function discoveryWorkshop(gs: GameState, enc: Encounter, i: number, ok: boolean, extraOrder: string[], who: string, cf: CounterfactualSet): Result {
  const { correct, picks, total } = mgState(gs, enc, i, ok);
  const reveals = mgReveals(enc, i, picks);
  const known = [...gs.flags, ...reveals];
  const perfect = correct === total;
  const bonus = (ok || perfect) ? extraOrder.find(f => !known.includes(f)) : undefined;
  const all = [...reveals, ...(bonus ? [bonus] : [])];
  const names = (fs: string[]) => fs.map(f => DISC_NAMES[f] || f).join(', ');
  const msg = `Your read of the room lands on ${correct} of ${total} meeting decisions.` + (reveals.length ? ` You earn these discovery topics: ${names(reveals)}.` : ' No discovery topic is earned from the questions.') +
    (perfect && !ok ? ` The rapport roll is flat, but a perfect read doesn\'t need luck: ${who} ${bonus ? 'volunteers one more \u2014 ' + DISC_NAMES[bonus] + ' \u2014' : 'confirms everything'} on the strength of your questions alone.`
      : ok ? ` The rapport roll succeeds: ${who} ${bonus ? 'volunteers one more \u2014 ' + DISC_NAMES[bonus] + ' \u2014 and' : ''} your SA earns the room\'s trust (SA Rapport).` : ' The rapport roll falls flat: polite answers, no extra confidences.');
  const learn = 'Discovery is skill first, luck second: the right questions and the right priorities (skill) uncover topics no matter how the room feels; how far they open up (luck) only adds to it. Every topic uncovered is +2 on the rolls that depend on it; every topic missed is -2.';
  cf[i] = 'The workshop: three pick questions plus a fourth owner-match decision can each earn a topic; a strong rapport roll can add one further generic discovery result.';
  const stats: ChoiceOutcome['stats'] = { trust: 2 * correct + (ok ? 4 : 0), techCred: 2 * correct, execAccess: ok ? 4 : 0 };
  if (correct === 0 && !ok) return { outcome: O(msg + ' The executives leave early.', learn, 0, { trust: -3, execAccess: -3 }, { mistake: 'Ran a discovery workshop and asked the wrong questions' }), counterfactuals: cf };
  return { outcome: O(msg, learn, 0, stats, { addFlag: all.length ? all.join(',') : undefined, unlockBoon: ok ? 'sa_rapport' : undefined }), counterfactuals: cf };
}
function readinessAssessment(gs: GameState, enc: Encounter, i: number, ok: boolean, rv: (r: number) => number, ready: boolean, missing: string[], platform: string, cf: CounterfactualSet): Result {
  const { correct, total } = mgState(gs, enc, i, ok);
  cf[i] = 'The readiness assessment: three pick questions plus a fourth prioritization round, followed by a candor roll. All four decisions must land for a perfect verdict; anything less names the gaps.';
  const learn = 'The readiness questions \u2014 team & P&L owner, a cost model on the real mix, risk & ops ownership, and fixing them in the right order \u2014 decide buy rate. Skill decides the verdict; the team\'s candor only shades it. Answer honestly and you either earn the green light or save the platform from a margin crisis.';
  const candor = ok ? ' The team is fully candid.' : ' The team hedges, but your questions leave them nowhere to hide.';
  if (correct === total) {
    if (ready) return { outcome: O(`Green lights across the board. Every read and every priority was right: ${platform} has a payments owner, a cost model on its real mix, and named risk ops.${candor} Buy rate approved \u2014 earned, not assumed.`, learn, rv(ok ? 45000 : 30000), { trust: ok ? 14 : 10, techCred: 10, execAccess: ok ? 6 : 3 }, { advanceStage: 2, addFlag: 'on_buyrate,buy_rate_ready' }), counterfactuals: cf };
    return { outcome: O(`Every read was right \u2014 which is exactly why the verdict is "not yet." Missing: ${missing.join('; ')}.${candor} The board thanks you for the honesty and funds the gaps.`, learn, rv(ok ? 20000 : 12000), { trust: ok ? 14 : 10, techCred: 6, execAccess: ok ? 6 : 3 }, { addFlag: 'buy_rate_assessed' }), counterfactuals: cf };
  }
  if (correct >= total - 1) return { outcome: O(`${correct} of ${total} reads were right. Gaps found \u2014 ${missing.length ? missing.join('; ') : 'owners not yet named for disputes and reserves'} \u2014 and caught before they cost anything.${ok ? ' The team opens up about the rest.' : ''} Buy rate waits.`, learn, rv(ok ? 12000 : 8000), { trust: ok ? 10 : 7, techCred: 4 }, { addFlag: 'buy_rate_assessed' }), counterfactuals: cf };
  return { outcome: O(`${correct} of ${total} reads were right. The assessment is inconclusive: you asked about the wrong things${ok ? ', and even a candid team can only answer what it\'s asked' : ' and the team told you what you wanted to hear'}. Nobody is wiser.`, learn, rv(2000), { trust: 2, techCred: -2 }), counterfactuals: cf };
}

export function resolveV11(gs: GameState, enc: Encounter, i: number, ok: boolean, rv: (r: number) => number): Result | null {
  const cf: CounterfactualSet = {};
  const has = (x: string) => gs.flags.includes(x);
  const hasB = (x: string) => gs.boons.includes(x);
  const R = (o: ChoiceOutcome): Result => ({ outcome: o, counterfactuals: cf });

  switch (enc.id) {
    /* ---------------------------- DISCOVERY PREP (all platforms) ---------------------------- */
    case 'f_scout': case 'p_scout': case 'r_scout': {
      cf[0] = 'Economics prep: you\'d walk in fluent in the payment mix \u2014 and +2 on every roll that depends on payments economics.';
      cf[1] = 'Court mapping: you\'d know what each executive is measured on \u2014 and +2 on executive rolls.';
      cf[2] = 'Rival scouting: you\'d know who else is pitching \u2014 and +2 when the competitor shows up.';
      if (i === 0) return R(O('You arrive fluent in the payment mix and interchange economics. Every pricing conversation ahead starts from facts.', 'Preparation turns a pitch into a diagnosis. Discovery flag uncovered: Payments Economics (+2 on dependent rolls).', 0, { techCred: 12, productMastery: 10 }, { addFlag: 'disc_economics' }));
      if (i === 1) return R(O('You know who decides, who influences, and what each executive is measured on.', 'Stakeholder mapping is discovery too. Discovery flag uncovered: Exec Priorities (+2 on dependent rolls).', 0, { execAccess: 12, trust: 6 }, { addFlag: 'disc_exec' }));
      return R(O('You know which rivals are circling and what they\'re offering.', 'Know the rival before the rival knows you. Discovery flag uncovered: Competitive Landscape (+2 when the competitor appears).', 0, { productMastery: 8, techCred: 4 }, { addFlag: 'disc_competition' }));
    }

    /* ------------------------------------- FITSTACK ------------------------------------- */
    case 'f_attach_q':
      cf[0] = 'An outcome question reveals the board\'s actual test: platform ARR and retention, not take rate.';
      cf[1] = 'Merchant-pain discovery maps future Capital, Instant Payouts, and Billing plays.';
      cf[2] = 'Pitching buy rate first wins the CEO\'s smile and loses the discovery window.';
      if (i === 0) return R(O('The CEO pauses, then names the board\'s test: embedded payments must lift platform ARR and gym retention within 12 months. The conversation moves from rate to business outcome.', 'Start executive discovery with the outcome the customer is accountable for. The workshop can then measure attach without repeating this question. Discovery flag uncovered: Exec Priorities.', 0, { execAccess: 8, trust: 6 }, { addFlag: 'disc_exec' }));
      if (i === 1) return R(O('Cash flow between membership cycles and failed recurring payments dominate the answer. You\'ve mapped future Capital, Instant Payouts, and Billing plays without pre-selling a product.', 'Merchant-pain discovery uncovers embedded-finance opportunities the platform has not yet put into words.', 0, { trust: 10, productMastery: 4 }, { addFlag: 'disc_obj4' }));
      return R(O('The CEO likes the buy rate vision. The CFO checks out. You leave with enthusiasm and no operating facts.', 'Answering the solution request is not discovery. Redirect to the business outcome before presenting a model.', 0, { execAccess: 3, productMastery: 3, trust: -6 }, { mistake: 'Pitched buy rate before discovery' }));

    case 'f_council':
      cf[0] = 'A facilitated workshop with your SA can uncover economics, risk, and attach in one session.';
      cf[1] = 'A questionnaire gets you facts on paper, but not the "why" behind them.';
      cf[2] = 'A demo in a discovery slot shows products before you understand problems.';
      if (i === 0) return discoveryWorkshop(gs, enc, i, ok, ['disc_exec','disc_competition','disc_obj4'], 'the CEO', cf);
      if (i === 1) return R(O('The questionnaire comes back with useful facts on team and readiness. Some answers are vague.', 'Async discovery is efficient but shallow. Discovery flag uncovered: Payments Economics.', 0, { trust: 4, productMastery: 3 }, { addFlag: 'disc_economics' }));
      return R(O('The demo is slick. The executives nod politely and leave early. You learned nothing new.', 'A demo in a discovery slot is a missed opportunity. Every roll ahead that needed these facts will be a guess.', 0, { productMastery: 4, execAccess: -5 }, { mistake: 'Skipped executive discovery for a demo' }));

    case 'f_crucible': {
      if (i !== 1) return null;
      const missing: string[] = [];
      if (gs.stage < 1.5) missing.push('no white-label / Rev Share 2.0 experience yet');
      if (!has('conversion_win')) missing.push('checkout conversion never optimized');
      if (gs.stats.techCred < 40) missing.push('technical credibility too thin to carry a pricing migration');
      return readinessAssessment(gs, enc, i, ok, rv, missing.length === 0, missing, 'FitStack', cf);
    }
    case 'p_crucible': {
      if (i !== 1) return null;
      const missing: string[] = [];
      if (!has('readiness_roadmap')) missing.push('no readiness roadmap (team, debit cost model, ACH pricing)');
      if (gs.stats.techCred < 40) missing.push('technical credibility too thin to carry a dual-rail pricing migration');
      return readinessAssessment(gs, enc, i, ok, rv, missing.length === 0, missing, 'RentFlow', cf);
    }

    case 'f_margin_crisis': case 'p_margin_crisis':
      if (i !== 3) return null;
      cf[3] = 'Split model: stop feeding new volume into a premature buy rate while keeping the back book intact. Honest, cheaper than a full retreat.';
      return R(O('New merchants onboard on Rev Share 2.0 from Monday; the existing book stays on buy rate while margin reports and segmentation fix it. The CFO calls it "the first adult decision in this project."', 'Unwinding a premature buy rate is slow, public, and trust-expensive. A split model acknowledges the mistake, stops the bleeding on the front book, and buys time to fix the back book.', rv(-5000), { trust: 8, techCred: 4, execAccess: 2 }, { addFlag: 'split_model' }));

    case 'f_reckoning':
      cf[0] = 'Margin Lens: margin reports + segmented pricing turn a bleeding buy rate into a managed one.';
      cf[1] = 'Split model: new gyms on rev share, back book fixed over time. Honest and affordable.';
      cf[2] = 'Full retreat: repricing 2,000 gyms is the honest move \u2014 and the most expensive one.';
      cf[3] = 'Feeding the wyrm: a blanket increase drives the small-ticket gyms to a competitor.';
      if (i === 0) {
        if (ok) return R(O('Margin reports show the wyrm\'s lair: debit tickets under $30. Segmented pricing by rail and ticket size, plus a newly named P&L owner, turns the margin positive in a quarter.', 'Premature buy rate can be rescued \u2014 by seeing the margin and segmenting it. The lesson stands: readiness first.', rv(20000), { trust: 10, techCred: 10, execAccess: 4 }, { unlockBoon: 'margin_lens', advanceStage: 2.5 }));
        return R(O('The reports land but nobody at FitStack owns the follow-through. Segmentation ships half-finished; the wyrm keeps feeding.', 'Tools without an owner don\'t fix margin. Name the P&L owner first.', rv(-15000), { trust: 2, techCred: 4 }, { unlockBoon: 'margin_lens' }));
      }
      if (i === 1) return R(O('New gyms onboard on Rev Share 2.0; the back book stays on buy rate while margin reports fix it. The bleeding slows immediately.', 'A split model is the honest, affordable response to a premature buy rate: stop the front-book losses, fix the back book over time.', rv(-5000), { trust: 8, techCred: 4 }, { addFlag: 'split_model' }));
      if (i === 2) return R(O('Every gym is repriced back to rev share. The CFO respects the honesty; the board asks why Stripe let it happen. Two quarters of goodwill spent in a week.', 'Reverting is possible and honest \u2014 and it is slow, public, and trust-expensive. That cost is why readiness comes first.', rv(-40000), { trust: 4, execAccess: -8, techCred: -3 }, { revertStage: 1.5, removeFlag: 'on_buyrate', addFlag: 'reverted_from_buyrate' }));
      return R(O('Rates go up 30 bps across the board. The small-ticket gyms \u2014 the ones losing money \u2014 leave for a competitor. The wyrm grows.', 'A blanket increase punishes the wrong merchants and accelerates churn. Segment or split; never feed the wyrm.', rv(5000), { trust: -15, execAccess: -8 }, { mistake: 'Blanket rate increase instead of fixing a premature buy rate' }));

    case 'f_decree':
      cf[0] = 'Standard Connect rev share: revenue from day one, Stripe carries onboarding, support, and risk. The proven first step.';
      cf[1] = 'White-label from day one: FitStack owns onboarding support, risk questions, and compliance with no payments team. It almost always collapses.';
      cf[2] = 'Partner gateway: payments embedded with zero pricing risk \u2014 and zero payments revenue.';
      if (i === 0) return R(O('Standard Connect rev share launched. Stripe-hosted onboarding, Stripe-run support and risk. Revenue from day one \u2014 and FitStack\'s tiny team is free to sell.', 'Rev share is where the journey begins. White-labeling and buy rate are destinations earned with readiness, not starting points.', rv(50000), { trust: 10, productMastery: 5 }, { advanceStage: 1, advanceJourney: 2 }));
      if (i === 1) {
        if (ok) return R(O('Against every odd, the white-label launch holds \u2014 because your SA and ProServ practically live at FitStack for a quarter. Onboarding completion is 71%, support is strained, and the CTO has aged a year.', 'Even when early white-labeling "works", it only works with heavy Stripe support and real cost to the platform. Readiness first.', rv(15000), { trust: -4, techCred: 6, execAccess: 4 }, { advanceStage: 1.5, advanceJourney: 2, addFlag: 'whitelabel_early', mistake: 'White-labeled Connect before FitStack had a payments team' }));
        return R(O('White-label launched with no payments team. Gyms stall in verification, support drowns in payout questions, and the CTO is answering compliance emails at midnight.', 'A platform that white-labels Connect owns onboarding, support, risk, and compliance conversations. FitStack had none of that. Start with rev share.', rv(-35000), { trust: -15, techCred: -10, execAccess: -6 }, { advanceStage: 1, advanceJourney: 2, addFlag: 'whitelabel_early,whitelabel_collapse', mistake: 'White-labeled Connect before FitStack was ready' }));
      }
      if (i !== 2) return null;
      return R(O('Gyms can now bring their own gateway through a partner integration. Payments live inside FitStack \u2014 but FitStack earns nothing on it. A partner guild joins your cause.', 'Facilitate is a legitimate step on the journey: it gets payments into the product. But it monetizes nothing. Use it as a bridge to Monetize, not a destination.', rv(10000), { trust: 5, execAccess: -3 }, { advanceJourney: 1, addFlag: 'facilitate_only', unlockCompanion: 'partner' }));

    case 'f_convert':
      cf[0] = 'Standard Connect rev share turns on revenue with zero pricing risk.';
      cf[1] = 'Staying on the partner gateway leaves $12M of volume unmonetized.';
      cf[2] = 'Jumping to buy rate from Facilitate skips every readiness step.';
      if (i === 0) return R(O('Standard Connect rev share live. Same embedded experience, now with revenue.', 'Facilitate \u2192 Monetize is the natural next step once payments are embedded. Rev share monetizes with zero pricing risk.', rv(45000), { trust: 8, productMastery: 5 }, { advanceStage: 1, advanceJourney: 2 }));
      if (i === 1) return R(O('The gateway hums along for a quarter while FitStack earns nothing on payments. Then the CFO forces the issue and moves to Standard Connect rev share anyway \u2014 without you in the room.', 'Facilitation without monetization leaves the platform\'s biggest revenue line on the table. Lead the move to Monetize; don\'t get dragged into it.', rv(10000), { execAccess: -8, trust: -3 }, { advanceStage: 1, advanceJourney: 2, mistake: 'Left the platform in Facilitate with no payments revenue' }));
      return R(O('Buy rate with no team, no cost model, and a debit-heavy mix. Losses start within 60 days.', 'Skipping from Facilitate to buy rate is the fastest route to a margin crisis.', rv(-30000), { trust: -15, techCred: -8 }, { advanceStage: 2, advanceJourney: 2, addFlag: 'on_buyrate,premature_buyrate', mistake: 'Jumped from partner gateway straight to buy rate' }));

    case 'f_msap': case 'p_msap': case 'r_msap': {
      cf[0] = 'Co-built MSAP + ProServ: shared owners and dates, with a builder team de-risking the launch.';
      cf[1] = 'A solo MSAP gives you structure, but less customer ownership.';
      cf[2] = 'No plan: signed deals stall before revenue activates.';
      if (i === 0) return R(O('The customer co-owns every milestone. ProServ joins to de-risk the build. Go-live dates are real now.', 'An MSAP (Mutual Success & Activation Plan) aligns both sides on owners, milestones, and dates. Co-building it creates customer ownership; ProServ de-risks complex launches. Pact of Mutual Success: +2 on activation, defend, and renewal rolls.', rv(20000), { trust: 8, techCred: 6 }, { unlockBoon: 'msap', unlockCompanion: 'proserv' }));
      if (i === 1) return R(O('Your MSAP is thorough. The customer skims it and says "looks great."', 'A plan the customer didn\'t help write is a plan they don\'t own \u2014 but it\'s far better than none.', rv(10000), { trust: 4, productMastery: 3 }, { unlockBoon: 'msap' }));
      return R(O('Three months later, activation is a fraction of plan. The revenue you forecast is still "pending go-live."', 'Signed is not live. Without an activation plan, revenue slips and trust erodes.', -15000, { trust: -6, execAccess: -3 }, { mistake: 'No activation plan after signature' }));
    }

    case 'f_attach_campaign':
      cf[0] = 'SPE growth workshop + embedded onboarding: the fastest way to lift payments attach.';
      cf[1] = 'Fee waivers buy short-term attach that often churns back.';
      cf[2] = 'Mandating payments without onboarding drives gym owners to leave.';
      if (i === 0) {
        if (ok) return R(O('Attach climbs from ~15% to 58% in two quarters. The SPE growth workshop gives FitStack a merchant-facing playbook, and embedded onboarding makes switching painless. The board calls it "the payments win."', 'Payments attach is the key win for SaaS platforms. SPE growth workshops, embedded onboarding, and a clear merchant value proposition move attach faster than any pricing change.', rv(90000), { trust: 8, productMastery: 8, execAccess: 4 }, { unlockCompanion: 'spe', addFlag: 'attach_win', advanceJourney: 3 }));
        return R(O('Attach rises to 32%. The workshop helps, but onboarding friction slows gym owners down.', 'Attach campaigns need both a value proposition and a frictionless switching path.', rv(40000), { trust: 3, productMastery: 4 }, { unlockCompanion: 'spe', advanceJourney: 3 }));
      }
      if (i === 1) return R(O('Fee waivers spike attach to 35% \u2014 and a third of those gyms drift back when the waiver ends.', 'Incentives buy short-term attach. Without onboarding and value, the volume doesn\'t stick.', rv(35000), { trust: 4 }, { advanceJourney: 3 }));
      return R(O('Gym owners revolt. 120 locations cancel FitStack entirely rather than switch processors.', 'Mandates can work at renewal with a strong value proposition \u2014 forcing them without onboarding drives churn.', -20000, { trust: -12, execAccess: -4 }, { mistake: 'Forced a payments mandate on SMB merchants' }));

    case 'f_risk':
      cf[0] = 'Radar Plus: custom rules and dynamic thresholds \u2014 works if someone at FitStack owns the rules.';
      cf[1] = 'Stripe Managed Risk: Stripe owns decisioning and liability. Ideal when the platform has no risk team.';
      cf[2] = 'Radar Pro: account- and customer-abuse prevention. Powerful, but FitStack\'s problem is transaction disputes.';
      cf[3] = 'Staying on Standard while disputes escalate invites network monitoring programs.';
      if (i === 0) {
        if (ok) return R(O('Radar Plus rules tuned with your SA and TAM. Card testing blocked, "forgot to cancel" disputes down 40%.', 'Radar Plus fits platforms that want control \u2014 custom rules and dynamic thresholds \u2014 and can manage account risk themselves.', rv(30000), { techCred: 8, trust: 5 }, { unlockBoon: 'fraud_shield', addFlag: 'fraud_plus', advanceJourney: 3 }));
        return R(O('Radar Plus is live, but nobody at FitStack owns the rules. Disputes dip, then creep back.', 'Plus needs an owner. Without a risk team, Managed Risk is often the better fit.', rv(10000), { techCred: 3 }, { unlockBoon: 'fraud_shield', addFlag: 'fraud_plus', advanceJourney: 3 }));
      }
      if (i === 1) return R(O('Stripe Managed Risk live. Stripe takes on decisioning and liability for FitStack\'s gyms. Dispute losses stop being FitStack\'s problem.', 'SMR is a strategic choice, not a maturity reward: Stripe takes decisioning and liability for a higher fee. For a platform with zero risk headcount, it\'s often the right trade.', rv(40000), { trust: 10, execAccess: 4 }, { unlockBoon: 'smr_aegis', addFlag: 'managed_risk', advanceJourney: 3 }));
      if (i === 2) return R(O('Radar Pro is live. Its account-abuse features go mostly unused \u2014 gyms don\'t face signup abuse.', 'Radar Pro adds account- and customer-abuse prevention (signup, free-trial, bot abuse). Match the plan to the fraud pattern: FitStack\'s problem was transaction disputes.', rv(15000), { productMastery: 3, trust: -2 }, { unlockBoon: 'fraud_shield', addFlag: 'radar_pro', advanceJourney: 3 }));
      return R(O('Disputes keep climbing. Two gyms hit network monitoring thresholds; FitStack takes the blame.', 'Radar Standard is a baseline, not a strategy. When fraud escalates, choose Plus, Pro, or Managed Risk deliberately.', -25000, { trust: -8, techCred: -4 }, { mistake: 'Ignored escalating dispute risk' }));

    case 'f_obj4': case 'r_obj4': {
      const isR = enc.id === 'r_obj4';
      cf[0] = 'Full embedded finance bundle: three new revenue lines that don\'t depend on interchange.';
      cf[1] = 'Capital alone: the easiest embedded-finance entry point, with room to expand.';
      cf[2] = 'Skipping embedded financial services leaves the platform dependent on payments margin alone.';
      if (i === 0) {
        if (ok) return R(O(isR ? 'Capital funds slow seasons, Issuing cards run supplier purchasing, and Financial Accounts hold tips and payroll. OrderOS now earns on money that never touches interchange.' : 'Capital for gym owners, Financial Accounts to hold funds, and Issuing cards for equipment and supplies. FitStack has three new revenue lines.', 'Embedded financial services \u2014 monetize outside of payments. Capital, Treasury/Financial Accounts, and Issuing create new revenue lines and make the platform far stickier. Lead with the merchant pain you discovered.', rv(isR ? 200000 : 110000), { productMastery: 10, trust: 8, execAccess: 6 }, { unlockBoon: 'treasury_key', addFlag: 'obj4_bundle', advanceJourney: 4 }));
        return R(O('Only Capital launches this year \u2014 the bundle pitch didn\'t connect to a clear merchant pain.', 'Embedded-finance pitches land when they start from the merchant problem, not the product list.', rv(isR ? 80000 : 45000), { productMastery: 4, trust: 3 }, { unlockBoon: 'merchant_loyalty', advanceJourney: 4 }));
      }
      if (i === 1) return R(O(hasB('merchant_loyalty') ? 'Capital expands to more merchants. Solid, incremental revenue.' : 'Capital launches. Zero credit risk for the platform, revenue from day one.', 'Capital is the easiest embedded-finance entry point. Treasury and Issuing are the next step.', rv(isR ? 90000 : 50000), { trust: 5, productMastery: 3 }, { unlockBoon: 'merchant_loyalty', advanceJourney: 4 }));
      return R(O('The board asks again next quarter: "What\'s our next revenue line?" You don\'t have an answer.', 'Platforms that only monetize payments leave retention and valuation upside on the table. Embedded financial services are a core part of the journey.', 0, { productMastery: -3, execAccess: -4 }, { mistake: 'Skipped embedded financial services: no revenue outside payments' }));
    }

    case 'f_renewal_prep':
      cf[0] = 'A quantified value case \u2014 attach, revenue, products live \u2014 makes renewal a formality.';
      cf[1] = 'A technical health review proves stability, not business value.';
      cf[2] = 'Walking in without a value case invites a price-only negotiation.';
      if (i === 0) {
        if (ok) return R(O('Your war map lands: attach %, payments revenue, products live, and MSAP milestones hit. The CFO forwards it to the board unedited.', 'Quantify value delivered before you ask for anything. Value case built: +20% at renewal.', 0, { execAccess: 10, trust: 8 }, { addFlag: 'value_case' }));
        return R(O('The value case is solid but the numbers have gaps. Still, the board sees the trajectory.', 'Even an imperfect value case beats none. Value case built: +20% at renewal.', 0, { execAccess: 4, trust: 3 }, { addFlag: 'value_case' }));
      }
      if (i === 1) return R(O('Uptime, integration health, and support stats look great. The CFO asks: "And the business impact?"', 'Technical health matters, but renewals are won on business value.', 0, { techCred: 8, trust: 4 }));
      return R(O('The board opens with "Why shouldn\'t we just ask Adyen for a quote?" You don\'t have numbers ready.', 'Without a value case, renewal becomes a price negotiation.', 0, { execAccess: -6 }, { mistake: 'Walked into renewal without a value case' }));

    case 'f_collapse':
      cf[0] = 'Retreat to Standard Connect: Stripe-hosted onboarding fixes completion overnight. The brand lives on the dashboard.';
      cf[1] = 'Rebuild with SA + ProServ: embedded components, runbooks, and a risk owner. Works only with heavy Stripe lift.';
      cf[2] = 'Pushing through: gyms churn to processors that onboard in minutes.';
      if (i === 0) return R(O('Stripe-hosted onboarding is back within two weeks. Completion jumps to 89%, the ticket queue drains, and the CEO keeps the FitStack brand on the dashboard. Rev share is live.', 'Retreating to the proven path is not failure. Rev share with Stripe-hosted onboarding is where white-label readiness is built, not assumed.', rv(25000), { trust: 10, execAccess: 4, techCred: 3 }, { advanceStage: 1, removeFlag: 'whitelabel_collapse', addFlag: 'retreated_whitelabel' }));
      if (i === 1) {
        if (ok) return R(O('ProServ rebuilds onboarding with embedded components, your SA writes the support runbook, and FitStack finally names a risk owner. Completion recovers to 80%. It cost a quarter.', 'White-label can be rescued \u2014 with ProServ, an SA, and a FitStack owner. The lesson stands: readiness should come first.', rv(5000), { trust: 6, techCred: 10 }, { advanceStage: 1.5, removeFlag: 'whitelabel_collapse', unlockCompanion: 'proserv' }));
        return R(O('The rebuild stalls. ProServ delivers, but FitStack has nobody to own the runbook. Completion stays under 65% and 300 gyms move to a processor that onboards in minutes.', 'Stripe can build the components; the platform must own the operation. Without a payments owner, the rebuild has no landlord.', rv(-30000), { trust: -8, techCred: 2, execAccess: -6 }, { advanceStage: 1, mistake: 'Rebuilt white-label onboarding without a FitStack owner' }));
      }
      return R(O('Gyms do not adapt. 400 locations churn to a processor with 5-minute onboarding. The board asks why payments revenue is negative.', 'Brand promises do not survive broken onboarding. Merchants leave platforms that make it hard to get paid.', rv(-45000), { trust: -15, execAccess: -10 }, { advanceStage: 1, removeFlag: 'whitelabel_collapse', addFlag: 'whitelabel_churn', mistake: 'Pushed through a collapsing white-label launch' }));

    case 'f_conversion':
      cf[0] = 'Checkout + Link + payment methods: conversion lifts volume for everyone \u2014 the platform, the gyms, and you.';
      cf[1] = 'Rate first: a better split on volume that never converts.';
      cf[2] = 'Leaving checkout alone: 39% of sign-ups keep walking away.';
      if (i === 0) {
        if (ok) return R(O('Stripe Checkout with Link, wallets, and bank debits ships to every gym. Sign-up conversion climbs from 61% to 78%; volume through FitStack rises 22% without a single new gym.', 'Monetize is not just rate: it is Checkout, Link, and local payment methods maximizing conversion. More volume beats more basis points.', rv(40000), { trust: 10, productMastery: 8, techCred: 4 }, { addFlag: 'conversion_win' }));
        return R(O('Checkout ships, but half the gyms keep the old form because nobody owns the rollout. Conversion lifts to 68% where it is live.', 'Conversion tooling only pays when the platform rolls it out. Pair it with an MSAP and an owner.', rv(15000), { trust: 4, productMastery: 4 }));
      }
      if (i === 1) return R(O('You renegotiate the split by 8 bps. Conversion stays at 61%. The CFO is pleased; the gyms are not.', 'Rate optimization on unconverted volume is a small win. Conversion first, then rate.', rv(12000), { trust: 3, execAccess: 3 }));
      return R(O('The home-built form stays. Six months later a gym-software rival advertises "one-tap sign-up with Link" and FitStack\'s CEO asks why you never mentioned it.', 'If you do not raise conversion, a competitor will. Checkout and Link are part of the Monetize story.', 0, { trust: -6, productMastery: -3 }, { mistake: 'Ignored checkout conversion' }));

    case 'f_harvest':
      cf[0] = 'Billing for memberships: recurring revenue, dunning, and recovery \u2014 the most natural Grow product for gyms.';
      cf[1] = 'Instant Payouts: 40% adoption in 60 days. Fastest revenue path for cash-flow-sensitive merchants.';
      cf[2] = 'Terminal for the front desk: brings in-person volume onto FitStack, installed by a partner.';
      cf[3] = 'Buy rate is not the gateway to Instant Payouts or Capital. Those attach on rev share just fine; buy rate only adds pricing risk FitStack cannot yet carry.';
      cf[4] = 'Optimize buy rate: margin reports and a pricing review make an existing buy rate healthy before you build on it.';
      if (i === 0) return R(O('Billing launched for memberships. Failed-payment recovery alone saves gyms 4% of revenue a month, and every gym on Billing processes through FitStack.', 'Billing is the Grow product that fits recurring businesses best: it raises attach, retention, and revenue at once.', rv(50000), { trust: 12, productMastery: 8 }, { unlockBoon: 'recurring_ledger', addFlag: 'product_attach_right', advanceJourney: 3 }));
      if (i === 1) return R(O('Instant Payouts at 75 bps. 40% merchant adoption in 60 days.', 'Payout monetization is one of the fastest revenue paths.', rv(45000), { trust: 10, productMastery: 5 }, { unlockBoon: 'speed_talisman', addFlag: 'product_attach_right', advanceJourney: 3 }));
      if (i === 2) {
        if (ok) return R(O('Terminal readers land on 600 front desks in a quarter, installed by the partner guild. In-person volume through FitStack doubles.', 'For platforms whose merchants sell in person, Terminal is a Grow product that unlocks the biggest attach pool.', rv(55000), { trust: 10, productMastery: 8, techCred: 4 }, { addFlag: 'terminal_attach,product_attach_right', unlockCompanion: 'partner', advanceJourney: 3 }));
        return R(O('Terminal pilots in 40 gyms; the rollout stalls on installation logistics and reader orders.', 'Hardware rollouts need an installation partner and a plan. Pilot, then scale with the guild.', rv(15000), { trust: 3, productMastery: 4 }, { addFlag: 'product_attach_right' }));
      }
      if (i === 3) return R(O('Buy rate switches on as the supposed unlock for payouts and lending. Instant Payouts and Capital were available on rev share all along; what FitStack actually acquired is pricing risk with no team, no cost model, and interchange losses within 60 days.', 'Grow products attach on any pricing model. Buy rate is a readiness decision, not a gateway to products, and the red flags (no payments team, no cost model) were still there.', rv(-25000), { trust: -15, techCred: -8, execAccess: -5 }, { advanceStage: 2, addFlag: 'on_buyrate,premature_buyrate', mistake: 'Pushed buy rate despite red flags' }));
      return R(O('Margin Reports go live and the pricing review finds two merchant segments underwater. Fixed in a week. The buy rate is finally healthy.', 'Once on buy rate, margin monitoring is step one \u2014 before any Grow product is built on top.', rv(30000), { trust: 8, techCred: 8 }, { unlockBoon: 'margin_lens', addFlag: 'buyrate_optimized' }));

    case 'f_rival':
      if (i !== 3) return null;
      cf[3] = 'Hold the buy rate and defend on total value: margin data, products live, and the activation plan beat a rate cut.';
      if (ok) return R(O('You bring the margin reports, the products live, and the MSAP to the board. Adyen\'s "no minimums" means FitStack owning risk and support. The board stays \u2014 at the current buy rate.', 'When you are already on buy rate, never defend with a cut. Defend with the value the platform is already getting.', rv(35000), { trust: 10, execAccess: 6 }, { addFlag: 'defended' }));
      return R(O('The board hears the value story but still asks for a concession. You hold the rate and trade a product roadmap commitment instead.', 'Holding price under pressure costs something. A roadmap commitment is cheaper than a rate cut.', rv(10000), { trust: 2, execAccess: -3 }, { addFlag: 'defended_partial' }));

    case 'p_uprising':
      cf[0] = 'The churn playbook: diagnose, fix with Grow products, track with the TAM against the MSAP.';
      cf[1] = 'A business review alone names the causes but fixes nothing this quarter.';
      cf[2] = 'Credits are a band-aid on a structural problem.';
      if (i === 0) {
        if (ok) return R(O('Business review splits the churn: payout speed for owners, ACH autopay for tenants. Instant Payouts and Billing fix both; the TAM tracks recovery weekly against the MSAP. Churn back to 4% in two quarters.', 'A churn threat is a playbook, not a panic: diagnose, fix with Grow products, and measure against the plan.', rv(45000), { trust: 14, techCred: 5, execAccess: 5 }, { unlockBoon: 'speed_talisman', addFlag: 'churn_contained', advanceJourney: 3 }));
        return R(O('The review lands but the fixes slip \u2014 RentFlow has no owner for the Billing migration. Churn slows to 9%.', 'The playbook works only when the platform names an owner. Put the owner in the MSAP.', rv(15000), { trust: 6, execAccess: 2 }, { addFlag: 'churn_contained' }));
      }
      if (i === 1) return R(O('The business review is excellent: two causes, clearly separated, beautifully charted. Fixes are "next quarter." Another 5% churns while the deck circulates.', 'Diagnosis without a fix is a report, not a playbook. Pair the review with Grow products and a plan.', rv(5000), { trust: 6, execAccess: 3 }, { mistake: 'Diagnosed churn without fixing it' }));
      return R(O('Credits slow the exits for a quarter. Then the credits end and the churn resumes \u2014 now with a lower price baked in.', 'Credits treat the symptom and permanently lower the price. Structural churn needs structural fixes.', rv(-10000), { trust: -8, execAccess: -5 }, { mistake: 'Applied band-aid to structural problem' }));

    case 'p_expansion':
      cf[0] = 'Local payment methods + Tax + Identity: launch each market on the rails tenants use. Conversion first.';
      cf[1] = 'Tax + Identity only: compliant, but a cards-only checkout in bank-transfer markets converts poorly.';
      cf[2] = 'Cards only: fast to ship, and 80% of tenants in two markets can\'t pay the way they want.';
      if (i === 0) {
        if (ok) return R(O('Each country launches with local bank debits and wallets, Stripe Tax registered, landlords verified with Identity. Rent conversion in the new markets matches the home market within a quarter.', 'Monetize in new markets is a conversion problem: local payment methods, tax, and identity before rate. The platform earns on volume that actually converts.', rv(45000), { trust: 10, productMastery: 8, techCred: 4 }, { unlockBoon: 'compliance_armor', addFlag: 'expansion_win' }));
        return R(O('Payment methods launch; tax registrations lag and one market goes live late. Conversion is good where it\'s live.', 'Multi-country launches need a compliance plan sequenced with payment methods. ProServ earns its keep here.', rv(20000), { trust: 4, productMastery: 4 }, { unlockBoon: 'compliance_armor' }));
      }
      if (i === 1) return R(O('Tax and Identity ship cleanly. Checkout stays cards-only; in two markets, most tenants can\'t pay the way they want and conversion stalls at 55%.', 'Compliance is necessary, not sufficient. Local payment methods are what convert.', rv(15000), { trust: 5, productMastery: 2 }, { unlockBoon: 'compliance_armor' }));
      return R(O('The same cards-only checkout ships everywhere. Conversion in the new markets is half the home market; a local rival launches with bank transfers and wins the biggest property group.', 'Cards-only in bank-transfer markets is leaving conversion \u2014 and volume \u2014 on the table.', rv(5000), { trust: -5, productMastery: -3 }, { mistake: 'Launched new markets without local payment methods' }));

    case 'p_cost':
      if (i !== 1) return null;
      cf[1] = 'Optimized split + separate ACH pricing: better economics without owning the card mix.';
      return R(O('The rev share split improves 6 points and ACH finally carries a per-item price. Stripe keeps managing the card mix; RentFlow earns more on every rail.', 'On a debit/ACH-heavy platform, pricing the rails separately matters more than which pricing model you\'re on. Rev share can be optimized too.', rv(30000), { trust: 6, techCred: 6, productMastery: 4 }, { addFlag: 'ach_priced' }));

    case 'p_rentroll':
      cf[0] = 'Billing + Instant Payouts: autopay with retries for tenants, same-day payouts for owners. The two Grow products for rent.';
      cf[1] = 'Instant Payouts only: quick revenue, but rent collection stays manual.';
      cf[2] = 'Not now: the most recurring payment in the kingdom stays unoptimized.';
      if (i === 0) {
        if (ok) return R(O('Autopay through Billing covers 70% of tenants in a quarter; failed-rent recovery lifts collections 3%. Owners pay for same-day payouts. Two new revenue lines on existing volume.', 'Grow products on a recurring business: Billing for collection, Instant Payouts for the people waiting on the money.', rv(55000), { trust: 12, productMastery: 8 }, { unlockBoon: 'speed_talisman', addFlag: 'product_attach_right,rentroll_win', advanceJourney: 3 }));
        return R(O('Instant Payouts launch cleanly; the Billing migration stalls on legacy lease data. Half the value, twice the meetings.', 'Billing migrations need ProServ and clean data. Scope them with the platform before promising dates.', rv(20000), { trust: 4, productMastery: 4 }, { unlockBoon: 'speed_talisman', addFlag: 'product_attach_right' }));
      }
      if (i === 1) return R(O('Instant Payouts at 1%. 35% of owners opt in within 60 days.', 'Fast revenue, but rent collection stays manual. Billing is the bigger prize.', rv(30000), { trust: 8 }, { unlockBoon: 'speed_talisman', addFlag: 'product_attach_right' }));
      return R(O('Rent keeps flowing on one-off charges. A property-management rival launches autopay with recovery and wins two of RentFlow\'s largest customers.', 'Grow products are competitive defenses too. Recurring payments without Billing is an opening for rivals.', 0, { trust: -5, productMastery: -3 }, { mistake: 'Left recurring rent unoptimized' }));

    case 'r_frontdoor':
      cf[0] = 'Terminal + Connect as the front door: for in-person-heavy platforms, the counter is where volume and attach live.';
      cf[1] = 'Online first: safer, but 60% of in-store volume keeps leaking.';
      cf[2] = 'Legacy acquirer at the counter: the empire stays split.';
      if (i === 0) {
        if (ok) return R(O('Terminal becomes the lead product: readers and Tap to Pay sold with every Connect account. The partner guild installs 3,000 counters in two quarters and in-store volume through OrderOS triples.', 'For in-person-dominant platforms, Terminal sold with Connect is the front door. Lead with where the merchant actually sells.', rv(120000), { trust: 12, productMastery: 10, techCred: 4 }, { addFlag: 'terminal_frontdoor,terminal_attach', unlockCompanion: 'partner', advanceJourney: 3 }));
        return R(O('Terminal pilots in 200 restaurants. Reader supply and installation scheduling slow the rollout; the COO wants a partner before scaling.', 'Hardware rollouts are a logistics business. Bring an installation partner before promising the empire.', rv(35000), { trust: 4, productMastery: 5 }, { addFlag: 'terminal_frontdoor' }));
      }
      if (i === 1) return R(O('Pricing work continues online. The counter stays with the legacy acquirer for now.', 'Reasonable sequencing \u2014 but the biggest attach pool waits.', rv(15000), { techCred: 3 }));
      return R(O('"Hardware is a distraction" becomes the strategy. A POS rival bundles Terminal-style readers and wins 400 restaurant groups\' counters.', 'On an in-person platform, ignoring the counter hands the front door to a rival.', 0, { trust: -6, execAccess: -4 }, { mistake: 'Ignored in-person payments on an in-person platform' }));

    case 'f_renewal': {
      const [m, txt] = renewalBoost(gs);
      cf[0] = 'Rev Share 2.0 + embedded financial services bundle: the sustainable, sticky outcome for a platform still building payments capability.';
      cf[1] = 'Buy rate + products: the ideal package \u2014 but only when readiness was proven.';
      cf[2] = 'Risk expansion: the new Radar plans plus Managed Risk as an expansion lever.';
      cf[3] = 'Rev share increase only: simple, but leaves the product opportunity on the table.';
      cf[4] = 'Split model: acknowledges a premature buy rate without the overhead of unwinding it.';
      if (i === 4) {
        if (has('buy_rate_ready')) return R(O('You propose splitting a buy rate that was earned and is healthy. The CFO is confused: "Why would we add complexity to something that works?" The deal closes smaller.' + txt, 'A split model is a remedy for a premature buy rate. Applied to a healthy one, it is pure overhead.', Math.round(rv(45000) * m), { trust: -4, execAccess: -4 }, { mistake: 'Split a healthy buy rate' }));
        return R(O('Front book to Rev Share 2.0, back book stays on buy rate with margin reports and embedded financial services. The board appreciates that you named the premature move instead of hiding it \u2014 and that you didn\'t ask them to reprice 2,000 gyms.' + txt, 'When buy rate came too early, the honest renewal acknowledges it and limits complexity: rev share on the front book, fix the back book, products on both.', Math.round(rv(75000) * m), { trust: 12, techCred: 6, execAccess: 6 }, { addFlag: 'split_model' }));
      }
      if (i === 0) return R(O('Rev Share 2.0 + embedded financial services bundle signed. FitStack earns on payments AND beyond payments.' + txt, 'For a platform still building payments capability, optimized rev share plus embedded finance often beats a premature buy rate.', Math.round(rv(90000) * m), { trust: 15, productMastery: 10 }));
      if (i === 1) {
        if (has('buy_rate_ready')) return R(O('Buy rate + product bundle signed. FitStack earned its readiness \u2014 team, P&L owner, and cost model in place.' + txt, 'Buy rate works when readiness is proven, not assumed.', Math.round(rv(110000) * m), { trust: 12, techCred: 10, execAccess: 8 }));
        return R(O('Buy rate + product bundle signed \u2014 but FitStack got to buy rate without ever proving readiness. The products carry the renewal; the pricing still needs a P&L owner.' + txt, 'A buy rate reached by shortcut is fragile. Products and an activation plan make it survivable; readiness makes it strong.', Math.round(rv(80000) * m), { trust: 6, techCred: 4, execAccess: 4 }));
      }
      if (i === 2) return R(O('Risk expansion signed: Radar Plus for most gyms, Pro where account abuse appears, and Managed Risk for the highest-risk segment.' + txt, 'The new Radar plans (Standard \u2192 Plus \u2192 Pro) and Stripe Managed Risk are expansion levers. Position Plus vs. Pro vs. SMR from the risk discovery you did.', Math.round(rv(100000) * m), { trust: 12, techCred: 10, productMastery: 8 }));
      return R(O('Rev share increase signed. Simple. Forgettable.' + txt, 'A rate-only renewal leaves product value on the table.', Math.round(rv(30000) * m), { trust: 3 }, { mistake: 'Rate-only renewal' }));
    }

    /* ------------------------------------- RENTFLOW ------------------------------------- */
    case 'p_ledger':
      cf[0] = 'Attach measurement finds the recurring rent volume still moving outside RentFlow.';
      cf[1] = 'Property-manager interviews reveal the embedded-finance prize.';
      cf[2] = 'Modeling someone else\'s payment mix is how margin crises start.';
      if (i === 0) return R(O('Thirty percent of tenant rent still moves outside RentFlow, mostly through bank portals and checks. The unclaimed recurring volume is now measured before anyone debates its pricing.', 'Measure attach before monetization. The workshop that follows can test the rail economics without repeating this question. Discovery flag uncovered: Payments Attach.', 0, { techCred: 6, productMastery: 8 }, { addFlag: 'disc_attach' }));
      if (i === 1) return R(O('Security deposits sit in a dozen bank accounts. Owner payouts are manual. Maintenance runs on personal cards.', 'Merchant interviews uncover the embedded-finance opportunity without duplicating the workshop\'s payment-mix question. Discovery flag uncovered: Merchant Needs.', 0, { trust: 10, productMastery: 4 }, { addFlag: 'disc_obj4' }));
      return R(O('Your model mirrors the investor\'s deck. It looks great until someone checks the debit mix.', 'Never model a platform on someone else\'s payment mix.', 0, { execAccess: 4, trust: -5 }, { mistake: 'Modeled buy rate on someone else\'s payment mix' }));

    case 'p_council':
      cf[0] = 'A joint session with your SA can surface economics, risk, and the competitive picture at once.';
      cf[1] = 'One sharp question reveals the competitor \u2014 but nothing else.';
      cf[2] = 'Letting the investor define the problem means every roll ahead is a guess.';
      if (i === 0) return discoveryWorkshop(gs, enc, i, ok, ['disc_exec','disc_attach','disc_obj4'], 'the CFO', cf);
      if (i === 1) return R(O('"Adyen. They offered a migration incentive." Now you know what you\'re up against.', 'Ask who else is in the deal. Discovery flag uncovered: Competitive Landscape.', 0, { trust: 3, execAccess: 4 }, { addFlag: 'disc_competition' }));
      return R(O('You run with the investor\'s framing. Everyone feels aligned \u2014 on the wrong problem.', 'Letting someone else define the problem is the most expensive discovery shortcut.', 0, { execAccess: 3, trust: -5 }, { mistake: 'Skipped discovery and accepted the investor\'s framing' }));

    case 'p_obj4':
      cf[0] = 'Financial Accounts + Issuing + Capital: revenue on money that never touches card interchange.';
      cf[1] = 'Capital alone: a solid start on embedded finance.';
      cf[2] = 'Squeezing ACH pricing chases pennies while the deposit vault sits untouched.';
      if (i === 0) {
        if (ok) return R(O('Deposits move into Financial Accounts, maintenance runs on Issuing cards, and Capital funds property managers. RentFlow earns on money that never touches card interchange.', 'For debit- and ACH-heavy platforms, embedded financial services are often bigger than buy rate. Monetize outside of payments where the Durbin cap doesn\'t apply.', rv(120000), { productMastery: 10, trust: 8, execAccess: 5 }, { unlockBoon: 'treasury_key', addFlag: 'obj4_bundle', advanceJourney: 4 }));
        return R(O('Financial Accounts launch for deposits, but compliance reviews delay Issuing and Capital.', 'Embedded finance in multi-country platforms needs compliance planning up front.', rv(50000), { productMastery: 4, trust: 3 }, { unlockBoon: 'treasury_key', advanceJourney: 4 }));
      }
      if (i === 1) return R(O('Capital launches for property managers. Revenue from day one, zero credit risk.', 'Capital is a strong embedded-finance entry point. Deposits and spend are the bigger prize.', rv(45000), { trust: 5, productMastery: 3 }, { unlockBoon: 'merchant_loyalty', advanceJourney: 4 }));
      return R(O('ACH pricing nudged up a few cents. Merchants grumble. The deposit vault sits untouched.', 'On a debit/ACH platform, payment-margin optimization has a hard ceiling. Embedded financial services don\'t.', rv(15000), { trust: -4 }, { mistake: 'Chased thin ACH margin instead of embedded financial services' }));

    case 'p_adyen':
      cf[0] = 'Value narrative grounded in discovery: real mix economics, switching cost, and embedded-finance lock-in.';
      cf[1] = 'Partner + ProServ switching-cost analysis: strong defense, but defensive rather than value-led.';
      cf[2] = 'Matching price trains the customer that every renewal is a rate negotiation.';
      cf[3] = 'Dismissing a live competitive threat is how platforms lose volume.';
      if (i === 0) {
        if (ok) return R(O('You walk the CFO through the real math: on RentFlow\'s debit/ACH mix, Adyen\'s spread is thinner than today\'s rev share, and the offer hands RentFlow risk, onboarding, and compliance it is not staffed for. Embedded financial services and the MSAP seal it. The CFO closes the comparison: "No minimums" does not mean no obligations. RentFlow stays.', 'Defend against Adyen with total value: payment-mix economics, switching cost, embedded financial services, and the activation plan. Discovery is your weapon \u2014 generic value pitches lose to a migration incentive.', rv(80000), { trust: 12, execAccess: 8, productMastery: 5 }, { addFlag: 'defended' }));
        return R(O('Your narrative is solid but generic. RentFlow moves 30% of volume to Adyen "as a test."', 'Without discovery-backed specifics, value narratives lose to a migration incentive.', -40000, { trust: -4, execAccess: -3 }, { addFlag: 'dual_process' }));
      }
      if (i === 1) return R(O('The Guildmaster and ProServ price the migration: 9 months of engineering and new risk and compliance obligations. The CFO pauses the Adyen evaluation.', 'Switching-cost analysis with partners is a powerful defense. Pair it with a value story to win, not just delay.', rv(30000), { techCred: 6, trust: 5 }, { unlockCompanion: 'partner', addFlag: 'defended_partial' }));
      if (i === 2) return R(O('You match Adyen\'s rate. RentFlow stays \u2014 at a margin that wipes out a year of growth.', 'Never compete on price alone. Matching teaches the customer that every renewal is a rate negotiation.', -60000, { trust: 2, execAccess: -4 }, { mistake: 'Panic-matched competitor pricing' }));
      return R(O('Six weeks later, RentFlow migrates its two largest countries to Adyen.', 'A live competitive threat is never "nothing." Engage early with discovery-backed value.', -120000, { trust: -15, execAccess: -10 }, { addFlag: 'churned_partial', mistake: 'Ignored a live competitive threat' }));

    case 'p_renewal': {
      const [m, txt] = renewalBoost(gs);
      cf[0] = 'Buy rate + dual-rail pricing + embedded financial services: the ideal package if RentFlow mastered its payment mix.';
      cf[1] = 'Rev Share 2.0 + embedded financial services suite: often outperforms thin buy rate on a debit-heavy mix.';
      cf[2] = 'Risk expansion: the new Radar plans plus Managed Risk as an expansion lever.';
      cf[3] = 'Rev share increase only: leaves the embedded-finance opportunity on the table.';
      cf[4] = 'Split model: acknowledges a premature buy rate without the overhead of unwinding it.';
      if (i === 4) {
        if (has('buy_rate_ready')) return R(O('You propose splitting a buy rate RentFlow earned with dual-rail pricing in place. The CFO: "Why add complexity to something that works?" The deal closes smaller.' + txt, 'A split model is a remedy for a premature buy rate. Applied to a healthy one, it is pure overhead.', Math.round(rv(50000) * m), { trust: -4, execAccess: -4 }, { mistake: 'Split a healthy buy rate' }));
        return R(O('New properties onboard on Rev Share 2.0; the existing book stays on buy rate with dual-rail pricing and embedded financial services. The investor hears an honest plan instead of a retreat.' + txt, 'When buy rate came too early on a debit/ACH platform, the honest renewal acknowledges it and limits complexity: rev share on the front book, dual-rail pricing to fix the back book, products on both.', Math.round(rv(80000) * m), { trust: 12, techCred: 6, execAccess: 6 }, { addFlag: 'split_model' }));
      }
      if (i === 0) {
        if (has('buy_rate_ready')) return R(O('Buy rate with separate card and ACH economics, plus embedded financial services. RentFlow owns its payments business.' + txt, 'Dual-rail pricing respects the debit/ACH mix; embedded financial services carry the margin.', Math.round(rv(100000) * m), { trust: 12, techCred: 10, productMastery: 8 }));
        return R(O('Buy rate + dual-rail + embedded financial services signed \u2014 on a buy rate RentFlow never proved it was ready for. Dual-rail pricing saves the margin; the products save the renewal.' + txt, 'On debit/ACH, a shortcut buy rate survives only with dual-rail pricing and product depth.', Math.round(rv(75000) * m), { trust: 6, techCred: 6 }));
      }
      if (i === 1) return R(O('Rev Share 2.0 + embedded financial services suite signed. Stripe manages the card mix; RentFlow earns on deposits, spend, and lending.' + txt, 'On a debit- and ACH-heavy mix, optimized rev share plus embedded financial services often beats buy rate.', Math.round(rv(105000) * m), { trust: 15, productMastery: 10 }));
      if (i === 2) return R(O('Risk expansion signed: Radar Plus across the portfolio and Managed Risk for the properties with the highest fraud exposure.' + txt, 'Platforms usually weigh Radar Plus vs. Pro vs. SMR. Position from the risk discovery you did.', Math.round(rv(95000) * m), { trust: 12, techCred: 10, productMastery: 6 }));
      return R(O('Rev share increase signed. The deposit vault stays untouched.' + txt, 'A rate-only renewal ignores the biggest prize on this platform.', Math.round(rv(30000) * m), { trust: 3 }, { mistake: 'Rate-only renewal' }));
    }

    /* ------------------------------------- ORDEROS ------------------------------------- */
    case 'r_audit':
      cf[0] = 'Margin and card-mix analysis shows which merchant segments are underwater.';
      cf[1] = 'Decision-criteria prep surfaces the margin, attach, risk-capacity, and merchant-operating tensions before the QBR without assigning them to people.';
      cf[2] = 'Competitive review shows which top restaurant groups are being courted.';
      cf[3] = 'Skipping the audit turns 18 months of knowledge into 18 months of assumptions.';
      if (i === 0) return R(O('Tourist-area restaurants run far more rewards and cross-border cards than suburban locations. The flat rate hides the loss concentration.', 'Audit the real cost drivers before changing price. The council can then measure attach without repeating this work. Discovery flag uncovered: Payments Economics.', 0, { techCred: 8, productMastery: 6 }, { addFlag: 'disc_economics' }));
      if (i === 1) return R(O('The QBR criteria are clear: sustainable margin, in-store attach growth, fraud-team capacity, and merchant cash flow all need decisions. You have the agenda, but the executives still need to state what they will carry in the council.', 'Decision-criteria prep identifies the tensions without leaking the later owner-match answer. Discovery flag uncovered: Exec Priorities.', 0, { execAccess: 9, trust: 4 }, { addFlag: 'disc_exec' }));
      if (i === 2) return R(O('Adyen is courting twelve of the top fifty groups with IC++ and a one-year rate lock. The threat is specific now.', 'Know which competitor is in which room before the renewal becomes a surprise. Discovery flag uncovered: Competitive Landscape.', 0, { productMastery: 6, execAccess: 4 }, { addFlag: 'disc_competition' }));
      return R(O('You skip the audit. The QBR goes fine \u2014 and you miss what changed in the last six months.', 'Account tenure is not discovery. Empires change.', 0, { execAccess: 2, trust: -5 }, { mistake: 'Assumed account knowledge replaces discovery' }));

    case 'r_council':
      cf[0] = 'A facilitated exec session can surface risk, embedded finance, and attach priorities at once.';
      cf[1] = 'One stakes question reveals the risk urgency.';
      cf[2] = 'Presenting before listening wastes the executive slot.';
      if (i === 0) return discoveryWorkshop(gs, enc, i, ok, ['disc_exec','disc_competition','disc_economics'], 'the COO', cf);
      if (i === 1) return R(O('"We hit network monitoring thresholds and lose our biggest groups." The stakes are clear.', 'Stakes questions reveal priority. Discovery flag uncovered: Risk Profile.', 0, { execAccess: 5, trust: 3 }, { addFlag: 'disc_risk' }));
      return R(O('Your roadmap is polished. The COO checks their phone.', 'Listening first earns the right to present.', 0, { productMastery: 3, execAccess: -5 }, { mistake: 'Presented a roadmap instead of running discovery' }));

    case 'r_burden':
      if (i === 1 || i === 2) return null; // unchanged v10 outcomes
      cf[0] = 'Platform Pricing Tool: segmented pricing by tier, payment method, and geography \u2014 no engineering build.';
      cf[1] = 'Card-mix investigation: understand the cost drivers before acting.';
      cf[2] = 'Blanket 20 bps increase: fast margin, but it pushes away your best merchants first.';
      cf[3] = 'Hand-built application fees: full control, two quarters of engineering, and margin bleeding the whole time.';
      if (i === 0) {
        if (ok) return R(O('Card-mix analysis feeds straight into the Platform Pricing Tool: pricing schemes by tier, payment method, and geography, with connected accounts assigned to pricing groups. Live in three weeks. Margin stabilized.', 'The Platform Pricing Tool is a no-code editor for application-fee logic: default and conditional schemes, pricing groups for connected accounts, payments and Instant Payouts. It saves platforms months of engineering. Pricing Forge: +2 on pricing decisions.', rv(150000), { techCred: 10, trust: 8 }, { unlockBoon: 'pricing_forge', addFlag: 'pricing_tool', advanceStage: 2.5 }));
        return R(O('Pricing Tool schemes live for the top tiers; data gaps slow the long tail. Margin partially recovered.', 'Even partial segmentation through the Pricing Tool beats blanket pricing at this scale.', rv(70000), { techCred: 6, productMastery: 5 }, { unlockBoon: 'pricing_forge', addFlag: 'pricing_tool', advanceStage: 2.5 }));
      }
      return R(O('Engineering ships custom application-fee logic two quarters later. Margin bled the entire time.', 'The Platform Pricing Tool exists so platforms don\'t spend months hard-coding application_fee_amount logic.', rv(40000), { techCred: 2, trust: -3 }, { advanceStage: 2.5, mistake: 'Hand-built pricing logic instead of using the Platform Pricing Tool' }));

    case 'r_tam_recruit':
      cf[0] = 'TAM: crisis response and margin monitoring at scale.';
      cf[1] = 'ProServ: the master builders for IC++ statements and billing.';
      cf[2] = 'Implementation Partner: capacity and restaurant-POS expertise.';
      cf[3] = 'Going alone on a $950M transformation is a single point of failure.';
      if (i === 0) return R(O('The TAM joins the cause. Monitoring, escalation paths, and crisis response are in place.', 'A TAM is a relationship-building investment: proactive monitoring and faster crisis response.', 0, { trust: 8, techCred: 6 }, { unlockCompanion: 'tam' }));
      if (i === 1) return R(O('ProServ joins to build IC++ statement generation and reconciliation.', 'ProServ de-risks complex pricing moves and migrations. +3 on big pricing rolls.', 0, { techCred: 10, productMastery: 4 }, { unlockCompanion: 'proserv' }));
      if (i === 2) return R(O('The Guildmaster joins: an SI with restaurant-POS expertise and spare capacity.', 'Implementation partners add capacity and bring partner-sourced opportunities. +2 on integration and defend rolls.', 0, { techCred: 6, trust: 5 }, { unlockCompanion: 'partner' }));
      return R(O('You go it alone. Your instincts sharpen \u2014 and so does your calendar.', 'At $950M, allies aren\'t a luxury. Know when to bring in the TAM, ProServ, partners, or SPE.', 0, { productMastery: 6, techCred: 3 }, { mistake: 'Went it alone on a $950M transformation' }));

    case 'r_fraud':
      cf[0] = 'Radar Plus: custom rules and dynamic thresholds \u2014 but 3 people tuning rules for 45,000 restaurants is a stretch.';
      cf[1] = 'Radar Pro: Plus + account- and customer-abuse prevention \u2014 strong against fake accounts and promo abuse.';
      cf[2] = 'Stripe Managed Risk: Stripe owns decisioning and liability. Frees the risk team entirely.';
      cf[3] = 'More tooling for a drowning 3-person team doesn\'t change the math.';
      if (i === 0) {
        if (ok) return R(O('Radar Plus rules, tuned with your TAM and SA, cut disputes 30%. The risk team breathes \u2014 a little.', 'Radar Plus fits platforms that want control and can staff the rules. At 45,000 merchants, watch whether the team can keep up.', rv(90000), { techCred: 8, trust: 5 }, { unlockBoon: 'fraud_shield', addFlag: 'fraud_plus', advanceJourney: 3 }));
        return R(O('Rules help, but 3 people can\'t tune them for 45,000 merchants. Disputes plateau.', 'Plus needs ownership and capacity. Consider Managed Risk when the team can\'t scale.', rv(30000), { techCred: 3 }, { unlockBoon: 'fraud_shield', addFlag: 'fraud_plus', advanceJourney: 3 }));
      }
      if (i === 1) {
        if (ok) return R(O('Radar Pro catches the fake-account rings exploiting online-ordering promos and ghost-kitchen signups. Disputes down 35%.', 'Radar Pro adds account- and customer-abuse prevention on top of Plus \u2014 strong for platforms with signup and promo abuse.', rv(110000), { techCred: 10, productMastery: 5 }, { unlockBoon: 'fraud_shield', addFlag: 'radar_pro', advanceJourney: 3 }));
        return R(O('Radar Pro is live, but the team hasn\'t configured the account-abuse features. Partial impact.', 'Pro is powerful when it\'s configured. Pair it with SA and TAM support.', rv(40000), { techCred: 4 }, { unlockBoon: 'fraud_shield', addFlag: 'radar_pro', advanceJourney: 3 }));
      }
      if (i === 2) return R(O('Stripe Managed Risk live. Stripe owns decisioning and liability for OrderOS\'s connected accounts. The risk team shifts to merchant success.', 'SMR is a strategic choice, not a maturity reward: Stripe takes decisioning and liability for a higher fee. When the platform doesn\'t want to scale a risk operation, it\'s the right answer.', rv(130000), { trust: 10, execAccess: 6 }, { unlockBoon: 'smr_aegis', addFlag: 'managed_risk', advanceJourney: 3 }));
      return R(O('New tooling arrives. The 3-person team is still drowning \u2014 now with more dashboards.', 'The in-house path now has an explicit scaling debt: it needs owners, service levels, automation, and real headcount.', -50000, { trust: 3, techCred: -5 }, { addFlag: 'fraud_internal', mistake: 'Asked a 3-person team to absorb risk for 45,000 merchants' }));

    case 'r_scale': {
      cf[0] = 'Scale the Managed Risk choice already made: coverage, escalation paths, and reporting across the full platform.';
      cf[1] = 'Scale the Radar Pro choice already made: automation plus the specialist team required to operate it.';
      cf[2] = 'Scale the Radar Plus choice already made: governed rules, named owners, automation, and analysts.';
      cf[3] = 'Make the earlier internal-tooling choice real with a funded risk-operations program.';
      cf[4] = 'Segment the chosen model so the highest-risk merchants get stricter controls and coverage.';
      cf[5] = 'Cap onboarding until capacity catches up: honest, but growth pays the price.';
      if (i === 0) {
        if (ok) return R(O('Managed Risk expands from the Fraud Dragon decision to every eligible merchant. Escalation paths and reporting are standardized; volume rises 40% with platform risk headcount flat.', 'The Scale Crucible honors the earlier SMR choice. The work now is rollout design and governance, not choosing the product again.', rv(70000), { trust: 12, execAccess: 8 }, { unlockBoon: 'smr_aegis', addFlag: 'managed_risk,scaled_risk_model' }));
        return R(O('The earlier Managed Risk choice expands in phases. Coverage reaches half the platform while the COO validates reporting and escalation controls.', 'A phased expansion still scales the chosen model; it just trades speed for control.', rv(35000), { trust: 5 }, { addFlag: 'managed_risk,scaled_risk_model' }));
      }
      if (i === 1) {
        if (ok) return R(O('The earlier Radar Pro choice gets an operating model: automated account-abuse queues, five specialists, and a monthly model-governance review. Volume grows without the old backlog.', 'Radar Pro scales only when the platform funds the people and governance that operate it.', rv(60000), { execAccess: 7, techCred: 8 }, { unlockBoon: 'fraud_shield', addFlag: 'radar_pro,dedicated_ops_team,scaled_risk_model' }));
        return R(O('The Radar Pro plan is sound, but hiring reaches only two of five specialists. Automation carries the highest-risk queues; the long tail still waits.', 'Scaling in-house risk has execution risk. Capacity plans need staged coverage, not just approved headcount.', -10000, { techCred: 3, execAccess: -2 }, { addFlag: 'radar_pro,dedicated_ops_team' }));
      }
      if (i === 2) {
        if (ok) return R(O('The earlier Radar Plus choice grows into a governed risk pod: named rule owners, automated reviews, weekly tuning, and three new analysts. The team keeps control and absorbs the growth.', 'Radar Plus can scale when rules have owners, operating cadence, and enough analysts. The product choice was already made; this is the operating model.', rv(50000), { techCred: 9, trust: 6 }, { unlockBoon: 'fraud_shield', addFlag: 'fraud_plus,dedicated_ops_team,scaled_risk_model' }));
        return R(O('The Radar Plus pod launches, but automation is late. Rule quality improves while the queue stays stubbornly high.', 'Governance without automation improves decisions but does not create capacity.', rv(10000), { techCred: 4 }, { addFlag: 'fraud_plus,dedicated_ops_team' }));
      }
      if (i === 3) {
        if (ok) return R(O('OrderOS acknowledges what the earlier internal-tooling choice really costs: five operators, service-level targets, automated queues, and executive ownership. The dashboards finally have a team behind them.', 'Internal control is valid only when the platform funds the operating system around the tools.', rv(35000), { execAccess: 8, techCred: 6 }, { addFlag: 'fraud_internal,dedicated_ops_team,scaled_risk_model' }));
        return R(O('Leadership approves the program but funds only two roles. The internal tools improve visibility; coverage still trails growth.', 'A partially funded operating model is still a capacity gap.', -15000, { execAccess: -3, techCred: 3 }, { addFlag: 'fraud_internal,dedicated_ops_team' }));
      }
      if (i === 4) {
        const foundation = has('managed_risk') ? 'Managed Risk' : has('radar_pro') ? 'Radar Pro' : has('fraud_plus') ? 'Radar Plus' : 'the internal-tooling model';
        if (ok) return R(O(`You keep ${foundation} as the foundation and add stricter coverage, controls, and escalation for the highest-risk restaurant segments. The model scales without pretending every merchant needs the same treatment.`, 'Segmentation is a scaling design, not a repeat product decision. Preserve the chosen foundation and spend capacity where risk is concentrated.', rv(55000), { productMastery: 8, trust: 5 }, { addFlag: 'segmented_risk_ops,scaled_risk_model' }));
        return R(O(`The ${foundation} segmentation launches with weak merchant data. The highest-risk cohort improves; some borderline accounts land in the wrong queue.`, 'Segmented operations depend on clean merchant and loss data.', rv(15000), { productMastery: 4, techCred: 2 }, { addFlag: 'segmented_risk_ops' }));
      }
      return R(O('OrderOS caps new high-risk merchant onboarding for a quarter. The dispute queue stabilizes, but growth misses plan.', 'Slowing growth is an honest capacity control. It protects the system, but it is not a long-term scaling model.', rv(5000), { trust: 4, execAccess: -5 }, { addFlag: 'risk_growth_cap', mistake: 'Scaled risk capacity by slowing merchant growth' }));
    }

    case 'r_omni':
      if (i === 0 && ok && has('terminal_frontdoor')) { cf[0] = 'Finishing the rollout: Terminal everywhere plus Instant Payouts completes the omnichannel story.'; return R(O('The front-door bet pays off: Terminal reaches every counter and kiosk, Instant Payouts monetize the speed, and restaurant groups finally see one ledger for in-store and online.', 'Omnichannel is the Grow win for in-person platforms: one provider, one ledger, faster money.', rv(150000), { trust: 12, productMastery: 8 }, { addFlag: 'terminal_attach,omni_win', unlockBoon: 'speed_talisman', advanceJourney: 3 })); }
      cf[0] = 'Terminal consolidation + Instant Payouts: in-store volume onto the platform, plus payout revenue.';
      cf[1] = 'Instant Payouts only: fast revenue, but in-store volume still leaks.';
      cf[2] = 'Leaving in-store to a legacy acquirer forfeits unified commerce.';
      if (i === 0) {
        if (ok) return R(O('Terminal rolls out with the partner\'s installers. In-store attach jumps from 40% to 75%, and Instant Payouts monetize faster cash.', 'For IRL-heavy platforms, Terminal is a front-door Grow product: unified online + in-store data, plus volume that used to leak.', rv(140000), { productMastery: 8, techCred: 6, trust: 5 }, { unlockBoon: 'speed_talisman', addFlag: 'terminal_attach', advanceJourney: 3 }));
        return R(O('Hardware logistics slow the rollout. In-store attach reaches 52%.', 'Terminal rollouts need installation partners and a plan.', rv(50000), { productMastery: 4 }, { unlockBoon: 'speed_talisman', advanceJourney: 3 }));
      }
      if (i === 1) return R(O('Instant Payouts at 1% \u2014 restaurants love same-day cash.', 'Payout monetization is a fast Grow lever.', rv(50000), { trust: 5 }, { unlockBoon: 'speed_talisman', advanceJourney: 3 }));
      return R(O('In-store volume stays with the legacy acquirer. Restaurant groups keep asking for unified reporting.', 'Leaving channel volume off-platform caps growth.', 0, { productMastery: -3 }, { mistake: 'Left in-store volume with a legacy acquirer' }));

    case 'r_raid':
      cf[0] = 'Total-value defense: pricing, risk, and embedded-finance lock-in that a rate lock can\'t match.';
      cf[1] = 'SPE + Partner co-sell: roadmap and switching cost. Strong, but defensive.';
      cf[2] = 'A blanket rate cut hands Adyen the narrative.';
      if (i === 0) {
        if (ok) return R(O('You meet the new VP with the receipts: segmentation and IC++, risk handled, embedded finance live, and an MSAP of milestones hit. Adyen\'s rate lock looks thin next to it. The top 50 stay.', 'Defend with total value, built from discovery. Switching cost lives in pricing tools, risk coverage, and embedded financial services \u2014 not in the rate.', rv(150000), { trust: 12, execAccess: 10 }, { addFlag: 'defended' }));
        return R(O('The new VP isn\'t convinced. Eight of the top 50 groups move to Adyen.', 'Generic defense loses to a rate lock. Discovery and lock-in products make the difference.', -100000, { trust: -5, execAccess: -5 }, { addFlag: 'dual_process' }));
      }
      if (i === 1) return R(O('The Envoy brings SPE co-sell resources and the partner shows the migration cost. Adyen\'s pitch stalls.', 'SPE co-sell and partner switching-cost analysis are strong defensive plays.', rv(60000), { trust: 6, execAccess: 5 }, { unlockCompanion: 'spe', addFlag: 'defended_partial' }));
      return R(O('A blanket cut keeps the top 50 \u2014 and costs $2.8M a year in margin.', 'Never lead a defense with price.', -90000, { execAccess: -5 }, { mistake: 'Panic rate cut to defend against a competitor' }));

    case 'r_renewal': {
      const [m, txt] = renewalBoost(gs);
      cf[0] = 'IC++ + Managed Risk + embedded financial services: the gold standard for a $950M platform.';
      cf[1] = 'Segmented buy rate + Radar Pro + embedded financial services: the pragmatic optimum with in-house risk.';
      cf[2] = 'Imperial Alliance: every lever plus joint go-to-market.';
      cf[3] = 'Optimization only: minimal disruption, minimal upside.';
      if (i === 0) return R(O('IC++ for the top tier, Managed Risk platform-wide, and embedded finance signed. The ultimate partnership at $950M.' + txt, 'Passthrough pricing, Stripe-owned risk, and embedded-finance depth: the gold standard for large platforms.', Math.round(rv(160000) * m), { trust: 15, techCred: 10, execAccess: 10 }));
      if (i === 1) return R(O('Pricing Tool segmentation, Radar Pro, and embedded financial services signed. Pragmatic excellence at scale.' + txt, 'Segmentation + the right Radar plan + embedded finance is a strong, controllable package.', Math.round(rv(130000) * m), { trust: 12, techCred: 8, productMastery: 8 }));
      if (i === 2) return R(O('LEGENDARY! The Imperial Alliance: IC++, Managed Risk, embedded finance, and SPE co-sell. OrderOS and Stripe go to market together.' + txt, 'The deepest platform partnerships combine pricing, risk, embedded finance, and joint go-to-market.', Math.round(rv(200000) * m), { trust: 18, execAccess: 15, productMastery: 10 }));
      return R(O('Buy rate optimization signed. Incremental, forgettable.' + txt, 'At $950M, an optimization-only renewal leaves the biggest levers unused.', Math.round(rv(40000) * m), { trust: 3 }, { mistake: 'Optimization-only renewal' }));
    }
  }
  return null;
}
