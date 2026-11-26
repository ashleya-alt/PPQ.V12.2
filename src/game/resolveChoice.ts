import { GameState, ChoiceOutcome, CounterfactualSet, StatKey } from '../types';
import { CAMPAIGNS } from '../data/campaigns';
import { Encounter } from '../types';
import { resolveV11 } from './resolveV11';

function getEncounters(pid: string): Encounter[] {
  return CAMPAIGNS[pid] || CAMPAIGNS.restaurant;
}

/**
 * v11: returns the FULL ordered campaign so currentEncIdx stays stable even when
 * flags change which conditional encounters apply. Use isActive / nextActiveIdx
 * to skip encounters whose conditions are not met.
 */
export function getActiveEncounters(pid: string, _gs?: GameState): Encounter[] {
  return getEncounters(pid);
}

export function isActive(enc: Encounter, gs: GameState): boolean {
  return !enc.conditional || enc.conditional(gs);
}

/** Index of the next playable encounter after `from`, or -1 if the campaign is over. */
export function nextActiveIdx(pid: string, gs: GameState, from: number): number {
  const all = getEncounters(pid);
  for (let i = from + 1; i < all.length; i++) if (isActive(all[i], gs)) return i;
  return -1;
}

/** Count of playable encounters (for progress display). */
export function progress(pid: string, gs: GameState): { done: number; total: number } {
  const all = getEncounters(pid);
  let total = 0, done = 0;
  all.forEach((e, i) => { if (i < gs.currentEncIdx) { if (gs.log.some(l => l.nodeId === e.id)) { total++; done++; } } else if (isActive(e, gs)) total++; });
  return { done, total };
}

export function resolveChoice(gs:GameState,choiceIdx:number,diceTotal?:number):{outcome:ChoiceOutcome;counterfactuals:CounterfactualSet} {
  const encs=getActiveEncounters(gs.platformId,gs);const enc=encs[gs.currentEncIdx];const hasBoon=(id:string)=>gs.boons.includes(id);const speedBonus=hasBoon('speed_talisman')?0.15:0;const treasuryBonus=hasBoon('treasury_key')?20000:0;const baseRev=(r:number)=>Math.round(r*(1+speedBonus))+treasuryBonus;const diceSuccess=diceTotal!==undefined?diceTotal>=(enc.choices[choiceIdx].diceThreshold||12):true;const pid=gs.platformId;const cf:CounterfactualSet={};
  {const v11=resolveV11(gs,enc,choiceIdx,diceSuccess,baseRev);if(v11)return v11;}
  if(pid==='fitness'){switch(enc.id){
    case'f_decree':
      cf[0]='Standard Connect would generate revenue from day one with zero risk. The safe, proven starting point.';
      cf[1]='The Grand Vision would inspire the board but set expectations carefully. Buy rate as destination, not starting point.';
      cf[2]='Buy rate with no team, no interchange knowledge, no cost model. The #1 mistake in platform payments.';
      if(choiceIdx===0)return{outcome:{msg:'Standard Connect launched. Revenue from day one.',learn:'Standard Connect Rev Share is the right starting point.',rev:baseRev(50000),stats:{trust:10,productMastery:5},advanceStage:1},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'The grand vision landed. The board sees buy rate as the DESTINATION, not the starting point.',learn:'Paint the full embedded finance roadmap with buy rate as destination.',rev:baseRev(40000),stats:{trust:8,execAccess:8,productMastery:5},advanceStage:1},counterfactuals:cf};
      return{outcome:{msg:'Buy rate with no team, no interchange knowledge, no cost model.',learn:'THIS IS THE #1 MISTAKE in platform payments.',rev:baseRev(-30000),stats:{trust:-20,techCred:-10,execAccess:-8},advanceStage:2,addFlag:'on_buyrate,premature_buyrate',mistake:'Pushed premature buy rate on greenfield platform'},counterfactuals:cf};
    case'f_harvest':
      cf[0]='Capital: 55% attach rate with SMB merchants. Zero credit risk for the platform. Perfect early monetization.';
      cf[1]='Instant Payouts: 40% merchant adoption in 60 days. Fastest revenue path for cash-flow-sensitive merchants.';
      cf[2]='Premature buy rate: interchange losses within 60 days. No team, no cost model, no safety net.';
      if(choiceIdx===0)return{outcome:{msg:'Capital launched! 55% attach rate.',learn:'Capital is a perfect early attach for SMB platforms.',rev:baseRev(55000),stats:{trust:12,productMastery:8},unlockBoon:'merchant_loyalty',addFlag:'product_attach_right'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Instant Payouts at 75 bps. 40% merchant adoption in 60 days.',learn:'Payout monetization is one of the fastest revenue paths.',rev:baseRev(45000),stats:{trust:10,productMastery:5},unlockBoon:'speed_talisman',addFlag:'product_attach_right'},counterfactuals:cf};
      return{outcome:{msg:'Pushed buy rate with no team. Interchange losses within 60 days.',learn:'The RED FLAGS were screaming: no payments team, no cost model.',rev:baseRev(-25000),stats:{trust:-15,techCred:-8,execAccess:-5},advanceStage:2,addFlag:'on_buyrate,premature_buyrate',mistake:'Pushed buy rate despite red flags'},counterfactuals:cf};
    case'f_technical':
      cf[0]='Briefing the SA with context makes them a force multiplier. They arrive prepared and credible.';
      cf[1]='Forwarding the email without context wastes the SA\'s expertise. They go in cold and miss the real concerns.';
      cf[2]='Going solo means 3 days in Connect docs, missing a CFO meeting. High opportunity cost.';
      if(choiceIdx===0)return{outcome:{msg:'You briefed the SA on the CTO\'s concerns, the merchant pain points, and the competitive threat. The SA arrived prepared and credible.',learn:'Your SA is a force multiplier when you brief them well.',rev:baseRev(15000),stats:{trust:12,techCred:10,productMastery:5},unlockBoon:'sa_rapport'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'The SA went in cold. Answered the technical questions competently but missed the real concerns. Credibility gap.',learn:'Forwarding an email without context wastes the SA\'s time.',rev:baseRev(0),stats:{trust:-5,techCred:3,execAccess:-3}},counterfactuals:cf};
      return{outcome:{msg:'You spent 3 days deep in Connect documentation.',learn:'Going solo on technical questions has a high opportunity cost.',rev:baseRev(-5000),stats:{productMastery:5,trust:-10,execAccess:-12},mistake:'Tried to solo a technical deep-dive, missed CFO QBR'},counterfactuals:cf};
    case'f_margin_crisis':
      cf[0]='Emergency segmented pricing is the best recovery move after premature buy rate.';
      cf[1]='Revert to Rev Share: painful emergency board meeting, but sometimes the right call.';
      cf[2]='Blanket rate increase: stabilizes margin but punishes your best merchants first.';
      if(choiceIdx===0)return{outcome:{msg:'Emergency segmented pricing deployed.',learn:'After premature buy rate, margin monitoring is step one.',rev:baseRev(-10000),stats:{trust:5,techCred:8},unlockBoon:'margin_lens',advanceStage:2.5},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Emergency board meeting called. "We\'re reverting to Rev Share.',learn:'Reverting from premature buy rate is painful but honest.',rev:baseRev(-40000),stats:{trust:4,execAccess:-8,techCred:-3},revertStage:1.5,addFlag:'reverted_from_buyrate',removeFlag:'on_buyrate'},counterfactuals:cf};
      return{outcome:{msg:'Raised all rates by 30 bps.',learn:'Blanket rate increases are the bluntest instrument.',rev:baseRev(10000),stats:{trust:-15,execAccess:-8},mistake:'Blanket rate increase instead of segmenting'},counterfactuals:cf};
    case'f_whitelabel':
      cf[0]='Embedded Components: white-label everything. FitStack brand on every payment screen.';
      cf[1]='Capture rate optimization: sometimes the highest-ROI move is capturing existing volume better.';
      cf[2]='Skipping to buy rate without optimizing Rev Share leaves money on the table and increases risk.';
      if(choiceIdx===0)return{outcome:{msg:'Embedded Components deployed! FitStack brand everywhere.',learn:'White-labeling via Embedded Components is a quick win.',rev:baseRev(35000),stats:{trust:12,techCred:8},advanceStage:1.5},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Capture rate pushed from 60% to 82%.',learn:'Sometimes the highest-ROI move is capturing existing volume.',rev:baseRev(40000),stats:{trust:8,productMastery:5},advanceStage:1.5},counterfactuals:cf};
      return{outcome:{msg:'Skipped optimization, went straight to buy rate.',learn:'Skipping stages has a real cost. Rev Share 2.',rev:baseRev(15000),stats:{trust:-8,techCred:-5},advanceStage:2,addFlag:'on_buyrate,skipped_optimization',mistake:'Skipped Rev Share 2.0 optimization'},counterfactuals:cf};
    case'f_rival':
      cf[0]='Value Narrative: reframe the conversation from price to total value. Stripe ecosystem vs. one feature.';
      cf[1]='Rev Share 2.0 math: show that Rev Share + branch products often beats raw buy rate economics.';
      cf[2]='Competitive buy rate with 25% premium minimums: strategically smarter than panic-matching, but pulls forward a transition the platform may not be ready for. Watch for SPIFF bias.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'Value narrative crushed the Adyen pitch.',learn:'Never compete on price alone.',rev:baseRev(30000),stats:{trust:12,productMastery:5}},counterfactuals:cf};return{outcome:{msg:'Value narrative didn\'t land.',learn:'Value narratives require deep Product Mastery to land.',rev:baseRev(5000),stats:{trust:-5,productMastery:3}},counterfactuals:cf};}
      if(choiceIdx===1)return{outcome:{msg:'Rev Share 2.0 math won the day.',learn:'Rev Share 2.0 + branch products often beats raw buy rate.',rev:baseRev(35000),stats:{trust:10,productMastery:8}},counterfactuals:cf};
      return{outcome:{msg:'Competitive buy rate deal signed with minimums at 25% premium to Adyen. SPIFF earned. But did you pull forward a transition the platform was not ready for?',learn:'Competitive buy rate with minimums is strategically smarter than panic-matching. But when your SPIFF aligns with recommending buy rate, check your bias.',rev:baseRev(55000),stats:{trust:-8,execAccess:-5,techCred:-3},advanceStage:2,addFlag:'on_buyrate,competitive_buyrate',mistake:'SPIFF-aligned competitive buy rate may have rushed the transition'},counterfactuals:cf};
    case'f_crucible':
      cf[0]='Green-lighting: high risk. Without readiness, buy rate can fail spectacularly within 30 days.';
      cf[1]='Readiness Assessment: three questions that save millions. Payments team? P&L owner? Interchange knowledge?';
      cf[2]='Holding at Rev Share 2.0: sustainable, growing, risk-free revenue. Staying is often the right call.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'Against the odds, buy rate works! But it required massive Stripe support to stabilize.',learn:'Even when buy rate technically works, the cost is high.',rev:baseRev(60000),stats:{trust:5,techCred:5},advanceStage:2,addFlag:'on_buyrate,buy_rate_ready'},counterfactuals:cf};return{outcome:{msg:'Buy rate launched. Interchange losses on rewards cards within 30 days.',learn:'THE #1 MISTAKE. Three questions could have prevented this.',rev:baseRev(-40000),stats:{trust:-20,techCred:-10,execAccess:-8},advanceStage:2,addFlag:'on_buyrate,premature_buyrate',mistake:'Green-lit buy rate despite red flags'},counterfactuals:cf};}
      if(choiceIdx===1){const readyFlags=gs.flags.includes('product_attach_right')&&gs.stats.techCred>=40;if(diceSuccess)return{outcome:{msg:readyFlags?'Readiness assessment: 2 of 3 green lights! Buy rate can proceed with confidence.':'Assessment reveals gaps. You caught them BEFORE disaster. The board says: "thank you for being honest."',learn:'The three buy-rate readiness questions save millions.',rev:baseRev(readyFlags?30000:10000),stats:{trust:12,techCred:5},advanceStage:readyFlags?2:undefined,addFlag:readyFlags?'on_buyrate,buy_rate_ready':'buy_rate_assessed'},counterfactuals:cf};return{outcome:{msg:'Assessment inconclusive. But you didn\'t push blind \u2014 and that matters more than a perfect score.',learn:'Even an inconclusive readiness check is better than blind.',rev:baseRev(5000),stats:{trust:5}},counterfactuals:cf};}
      return{outcome:{msg:'Held at Rev Share 2.0. Sustainable, growing, risk-free revenue.',learn:'Staying at a stage IS often the right call.',rev:baseRev(25000),stats:{trust:10,productMastery:5}},counterfactuals:cf};
    case'f_stabilize':
      cf[0]='Margin Reports: face the data. Know which merchants are profitable before making any changes.';
      cf[1]='Hire a Payments PM: the single most impactful hire. Someone who owns the payments P&L.';
      cf[2]='Volume growth without fixing margins just scales losses faster.';
      if(choiceIdx===0)return{outcome:{msg:'Margin Reports deployed. For the first time, the platform can see which merchants are profitable.',learn:'After going live on buy rate, Margin Reports are essential.',rev:baseRev(15000),stats:{trust:8,techCred:10,productMastery:5},unlockBoon:'margin_lens'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Payments PM hired. Three months to ramp, but now someone owns the P&L.',learn:'A dedicated Payments PM is the single most impactful hire.',rev:baseRev(5000),stats:{trust:5,execAccess:8}},counterfactuals:cf};
      return{outcome:{msg:'Focused on volume growth. More volume... on a margin-negative model.',learn:'More volume on a broken pricing model just scales losses.',rev:baseRev(-15000),stats:{trust:-12,techCred:-5},mistake:'Scaled volume without fixing margin'},counterfactuals:cf};
  }}
  if(pid==='property'){switch(enc.id){
    case'p_crossroads':
      cf[0]='Pumping the brakes: honest about the debit/ACH reality. Builds more trust than premature speed.';
      cf[1]='Readiness Roadmap: turns no into not yet. Models the actual payment mix economics first.';
      cf[2]='Green-lighting on a debit-heavy mix: the spread is pennies. The #1 mistake for prop-tech platforms.';
      if(choiceIdx===0)return{outcome:{msg:'You pumped the brakes. Showed the investor that debit interchange at 1.2% leaves almost no spread on buy rate. Trust increased.',learn:'Being honest about payment mix economics builds more trust than speed.',rev:baseRev(30000),stats:{trust:15,productMastery:8},addFlag:'held_wisely'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'6-month readiness roadmap: model debit/ACH economics, hire PM, understand Durbin caps. Buy rate earned, not assumed.',learn:'A readiness roadmap turns "no" into "not yet" \u2014 preserving the relationship.',rev:baseRev(15000),stats:{trust:12,execAccess:10,techCred:5},addFlag:'readiness_roadmap'},counterfactuals:cf};
      return{outcome:{msg:'Green-lit buy rate on a debit-heavy mix. Interchange spread is pennies per transaction after fixed costs.',learn:'THE #1 MISTAKE for prop-tech: assuming credit-card economics apply to debit/ACH platforms.',rev:baseRev(-35000),stats:{trust:-18,techCred:-8,execAccess:-10},advanceStage:2,addFlag:'on_buyrate,premature_buyrate',mistake:'Green-lit buy rate on debit-heavy payment mix'},counterfactuals:cf};
    case'p_technical':
      cf[0]='SA briefed with debit/ACH context: the CFO\'s specific concerns make the analysis compelling and credible.';
      cf[1]='Generic deck: a standard buy rate deck built for credit-heavy platforms. Completely misses the debit reality.';
      cf[2]='Solo cost model: a week building debit economics you\'re not expert in. Errors on Durbin and ACH.';
      if(choiceIdx===0)return{outcome:{msg:'You shared the debit-heavy payment mix, the ACH growth trend, and the Durbin implications. The SA delivered a masterclass on dual-rail economics.',learn:'Brief your SA with the customer\'s specific payment mix. Debit/ACH changes the entire analysis.',rev:baseRev(15000),stats:{trust:10,techCred:12,productMastery:5},unlockBoon:'sa_rapport'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'The SA sent the standard buy rate deck. Built for credit-heavy platforms. The CFO spotted the gap immediately.',learn:'A generic deck built for credit-heavy platforms fails on debit/ACH platforms.',rev:baseRev(0),stats:{trust:-5,techCred:2,execAccess:-5}},counterfactuals:cf};
      return{outcome:{msg:'You spent a week building a cost model. Missed Durbin implications on debit and ACH fee structure entirely.',learn:'Going solo on debit/ACH economics without expertise is the fastest way to lose credibility.',rev:baseRev(-10000),stats:{techCred:3,trust:-12,execAccess:-10},mistake:'Solo cost model with debit/ACH errors, missed investor meeting'},counterfactuals:cf};
    case'p_margin_crisis':
      cf[0]='Emergency dual-rail pricing: separate card and ACH economics. First step to stopping the bleeding.';cf[1]='Revert to Rev Share: painful emergency board meeting, but the debit math never worked.';cf[2]='Blanket rate hike: drives away merchants who are already exploring ACH-only alternatives.';
      if(choiceIdx===0)return{outcome:{msg:'Emergency dual-rail pricing. Separated card and ACH into distinct fee structures.',learn:'After premature buy rate on debit, dual-rail pricing is the critical first move.',rev:baseRev(-10000),stats:{trust:5,techCred:8},unlockBoon:'margin_lens',advanceStage:2.5},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Emergency board meeting. "The debit interchange math never worked. We\'re reverting to Rev Share."',learn:'Reverting from premature buy rate is painful but honest when the mix doesn\'t support it.',rev:baseRev(-45000),stats:{trust:4,execAccess:-8,techCred:-3},revertStage:1.5,addFlag:'reverted_from_buyrate',removeFlag:'on_buyrate'},counterfactuals:cf};
      return{outcome:{msg:'Blanket rate increase. Merchants exploring ACH-only alternatives to avoid card fees entirely.',learn:'Raising card rates on a platform where tenants can pay via ACH just accelerates ACH migration.',rev:baseRev(10000),stats:{trust:-18,execAccess:-8},mistake:'Rate increase accelerated ACH migration away from cards'},counterfactuals:cf};
    case'p_crucible':
      cf[0]='Green-lighting: risky on debit-heavy mix. Even success is fragile when interchange is Durbin-capped.';cf[1]='Readiness assessment: three pick questions plus a fourth prioritization decision. All four must land for a perfect verdict.';cf[2]='Holding: Rev Share 2.0 + Treasury + Tax may be the right long-term play for this payment mix.';
      if(choiceIdx===0){const hasRoadmap=gs.flags.includes('readiness_roadmap');if(diceSuccess&&hasRoadmap)return{outcome:{msg:'Roadmap paid off. Team hired, debit cost model built, ACH priced separately. Buy rate works \u2014 barely.',learn:'A readiness roadmap turned a potential disaster into a workable (if thin) buy rate.',rev:baseRev(70000),stats:{trust:10,techCred:8},advanceStage:2,addFlag:'on_buyrate,buy_rate_ready'},counterfactuals:cf};if(diceSuccess)return{outcome:{msg:'Buy rate launched. The debit spread is thin but positive. ACH is unpriced. Living on the edge.',learn:'Even success on debit-heavy buy rate is fragile. The ACH gap will catch you.',rev:baseRev(40000),stats:{trust:3,techCred:-3},advanceStage:2,addFlag:'on_buyrate'},counterfactuals:cf};return{outcome:{msg:'Buy rate launched. Debit interchange after Durbin caps and fixed fees: net negative on 30% of transactions.',learn:'Debit-heavy platforms need debit-specific cost models. Generic buy rate math fails.',rev:baseRev(-40000),stats:{trust:-20,techCred:-10,execAccess:-8},advanceStage:2,addFlag:'on_buyrate,premature_buyrate',mistake:'Buy rate without modeling debit economics'},counterfactuals:cf};}
      if(choiceIdx===1){if(diceSuccess){const ready=gs.flags.includes('readiness_roadmap')&&gs.stats.techCred>=40;return{outcome:{msg:ready?'All four readiness decisions land. Buy rate approved with debit-specific pricing and an ACH strategy.':'Gaps found: no ACH pricing model, no debit program fee analysis. You caught them before disaster.',learn:'Three readiness questions plus correct prioritization can save millions \u2014 especially on debit-heavy platforms.',rev:baseRev(ready?35000:10000),stats:{trust:12,techCred:5},advanceStage:ready?2:undefined,addFlag:ready?'on_buyrate,buy_rate_ready':'buy_rate_assessed'},counterfactuals:cf};}return{outcome:{msg:'Assessment inconclusive. But you didn\'t push blind on debit economics \u2014 and that matters.',learn:'Even an inconclusive readiness check is better than assuming credit economics apply.',rev:baseRev(5000),stats:{trust:5}},counterfactuals:cf};}
      return{outcome:{msg:'Held at Rev Share 2.0. Attached Treasury for escrow and Tax for compliance. Let Stripe manage the payment mix complexity.',learn:'For debit-heavy platforms, Rev Share 2.0 + product attach may outperform thin buy rate spreads.',rev:baseRev(30000),stats:{trust:10,productMastery:8},unlockBoon:'compliance_armor'},counterfactuals:cf};
    case'p_cost':
      cf[0]='Dual-rail pricing: separate card and ACH economics. Face the data on each payment rail.';cf[1]='Treasury + Tax: grow revenue through product attach instead of chasing thin interchange.';cf[2]='Card rate hike: accelerates ACH migration. Merchants will route around your card pricing.';
      if(choiceIdx===0)return{outcome:{msg:'Dual-rail pricing implemented. Cards and ACH priced separately. ACH merchants no longer free-riding.',learn:'On debit/ACH platforms, dual-rail pricing is non-negotiable after buy rate.',rev:baseRev(35000),stats:{trust:8,techCred:10},unlockBoon:'margin_lens',advanceStage:2.5},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Treasury + Tax attached. Treasury for escrow management, Tax for multi-state compliance. New revenue streams growing.',learn:'Product attach grows revenue without fighting thin interchange spreads.',rev:baseRev(40000),stats:{trust:10,productMastery:8},unlockBoon:'treasury_key'},counterfactuals:cf};
      return{outcome:{msg:'Raised card rates. Merchants accelerated ACH migration to avoid card fees. Card volume dropped 20%.',learn:'Raising card rates on a platform where ACH is an option just pushes volume off cards.',rev:baseRev(15000),stats:{trust:-12,execAccess:-8},mistake:'Rate increase accelerated payment mix shift to ACH'},counterfactuals:cf};
    case'p_expansion':
      cf[0]='Tax + Identity: solves compliance first. Payment rails differ by country.';cf[1]='Full BaaS: Treasury + Issuing makes the platform indispensable to merchants.';cf[2]='LPMs only: necessary but not sufficient. Doesn\'t solve the compliance gap.';
      if(choiceIdx===0)return{outcome:{msg:'Tax + Identity deployed. Three new countries launched in 90 days.',learn:'For multi-jurisdiction platforms, compliance comes first.',rev:baseRev(35000),stats:{trust:10,productMastery:8},unlockBoon:'compliance_armor'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'Full BaaS stack deployed. Treasury for escrow, Issuing for virtual cards.',learn:'BaaS makes the platform indispensable to merchants.',rev:baseRev(50000),stats:{trust:12,techCred:8},unlockBoon:'treasury_key'},counterfactuals:cf};
      return{outcome:{msg:'LPMs added. Table stakes but didn\'t solve the compliance gap.',learn:'LPMs are necessary but not sufficient for expansion.',rev:baseRev(10000),stats:{trust:3,productMastery:-3}},counterfactuals:cf};
    case'p_uprising':
      cf[0]='Instant Payouts + white-label: address both complaints simultaneously. Speed and branding.';cf[1]='Business Review: diagnose before prescribing. Is it pricing, UX, or payout speed?';cf[2]='Merchant credits: painkillers, not cures. Buys 90 days of peace, then churn resumes.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'Instant Payouts + white-label deployed! Churn stabilizing.',learn:'Address BOTH complaints simultaneously.',rev:baseRev(30000),stats:{trust:12,techCred:5},unlockBoon:'speed_talisman'},counterfactuals:cf};return{outcome:{msg:'Technical snags on white-label. Partial rollout.',learn:'White-labeling + Instant Payouts requires SA support.',rev:baseRev(10000),stats:{trust:3,techCred:3}},counterfactuals:cf};}
      if(choiceIdx===1)return{outcome:{msg:'Business review revealed root causes: payout speed, ACH UX, and brand confusion.',learn:'Diagnose before prescribing. The real issues are often not what merchants say first.',rev:baseRev(10000),stats:{trust:10,execAccess:5}},counterfactuals:cf};
      return{outcome:{msg:'Fee credits bought 90 days of peace. Then churn resumed.',learn:'Credits are painkillers, not cures.',rev:baseRev(-10000),stats:{trust:-8,execAccess:-5},mistake:'Applied band-aid to structural problem'},counterfactuals:cf};
  }}
  if(pid==='restaurant'){switch(enc.id){
    case'r_burden':
      cf[0]='Segmented pricing: the right answer but takes 90 days. At $950M, every day of delay is costly.';cf[1]='Card mix investigation: understand the actual cost drivers before acting. Data before decisions.';cf[2]='Blanket 20 bps increase: $1.9M in immediate margin recovery. Tempting but pushes away your best merchants first.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'Segmented pricing implemented across 45,000 merchants. Margin stabilized. The right call at scale.',learn:'Segmentation is the right first move for margin repair, even though it takes longer.',rev:baseRev(50000),stats:{trust:10,techCred:10},unlockBoon:'margin_lens',advanceStage:2.5},counterfactuals:cf};return{outcome:{msg:'Segmentation started but data quality issues at 45,000 merchants. Partial rollout to top tier only.',learn:'Even partial segmentation beats blanket pricing at this scale.',rev:baseRev(20000),stats:{techCred:8,productMastery:5},unlockBoon:'margin_lens'},counterfactuals:cf};}
      if(choiceIdx===1)return{outcome:{msg:'Card mix analysis complete. Tourist-area merchants have 60% rewards cards vs. 25% in suburban locations.',learn:'Investigation before action. At $950M, understanding the data prevents million-dollar mistakes.',rev:baseRev(20000),stats:{techCred:12,productMastery:8},unlockBoon:'margin_lens'},counterfactuals:cf};
      return{outcome:{msg:'20 bps rate increase across all 45,000 merchants. $1.9M immediate margin recovery. But your top 50 restaurant groups started shopping alternatives.',learn:'Blanket rate increases generate fast revenue but push away your most sophisticated merchants first.',rev:baseRev(40000),stats:{trust:-12,execAccess:-8},mistake:'Blanket rate increase at $950M scale accelerated enterprise churn'},counterfactuals:cf};
    case'r_technical':
      cf[0]='SA briefed with Margin Reports and enterprise segmentation data. Deep expertise is your secret weapon.';
      cf[1]='CC on email thread: SA reads context but CC\'ing is not deploying your SA effectively.';
      cf[2]='Solo: 18 months on the account gives context, but fresh technical eyes catch what you have normalized.';
      if(choiceIdx===0)return{outcome:{msg:'You shared the Margin Reports, the enterprise vs SMB breakdown, and the IC++ implications at $950M.',learn:'At this complexity level, your SA\'s deep expertise is your secret weapon. Use it.',rev:baseRev(15000),stats:{trust:12,techCred:12,productMastery:5},unlockBoon:'sa_rapport'},counterfactuals:cf};
      if(choiceIdx===1)return{outcome:{msg:'The SA read the thread and gave a competent IC++ overview. But missed the scale-specific nuances.',learn:'CC\'ing an SA on a thread is not deploying them. Brief with context.',rev:baseRev(0),stats:{trust:-5,techCred:3,execAccess:-3}},counterfactuals:cf};
      return{outcome:{msg:'Eighteen months on this account and you know them cold. But at $950M, the IC++ nuances are beyond general knowledge.',learn:'Account tenure gives context, but fresh technical eyes catch things you have normalized.',rev:baseRev(-10000),stats:{productMastery:8,trust:-10,execAccess:-12},mistake:'Solo technical deep-dive, missed enterprise escalations'},counterfactuals:cf};
    case'r_enterprise':
      cf[0]='IC++ for enterprise: passthrough pricing for the top 50. Transparency they demand at $285M in volume.';cf[1]='Tiered pricing: simpler than IC++ but effective. The pragmatic middle ground for everyone.';cf[2]='Holding the line: protects 44,950 simpler merchants but risks losing $285M in enterprise volume.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'IC++ launched for the top 50 restaurant groups. $285M in volume retained with transparent pricing.',learn:'Hybrid model: IC++ for enterprise who demand transparency, blended for the rest.',rev:baseRev(55000),stats:{trust:12,techCred:10},advanceStage:3,addFlag:'on_icpp'},counterfactuals:cf};return{outcome:{msg:'IC++ hit complexity issues. Statement generation at $285M volume harder than expected.',learn:'IC++ is operationally complex at scale. SA support is essential.',rev:baseRev(10000),stats:{trust:3,techCred:5}},counterfactuals:cf};}
      if(choiceIdx===1)return{outcome:{msg:'Tiered pricing deployed. Simpler than IC++ but effective for merchant retention across all segments.',learn:'Volume-based tiering is the pragmatic middle ground.',rev:baseRev(35000),stats:{trust:8,techCred:5},advanceStage:2.5},counterfactuals:cf};
      return{outcome:{msg:'Held the line on uniform pricing. 8 enterprise restaurant groups left. $95M volume loss.',learn:'Pricing consistency has value, but at $950M you cannot ignore enterprise demands.',rev:baseRev(-35000),stats:{trust:-15,execAccess:-10},mistake:'Lost enterprise merchants by refusing to evolve pricing'},counterfactuals:cf};
    case'r_champion':
      cf[0]='Executive sponsor: when champions leave, exec engagement within 30 days is critical.';cf[1]='Account brief: lower ceiling but reliable. Data-driven briefs educate the new VP.';cf[2]='Waiting: new VP signed an Adyen POC within 30 days. The window closes fast.';
      if(choiceIdx===0){if(diceSuccess)return{outcome:{msg:'Executive sponsor meeting within the week. New VP impressed by Stripe leadership engagement.',learn:'When champions leave, exec engagement within 30 days is critical. Especially when the new VP knows competitors.',rev:baseRev(10000),stats:{trust:12,execAccess:10}},counterfactuals:cf};return{outcome:{msg:'Meeting helped but new VP still evaluating. Their Adyen background makes them skeptical.',learn:'Even imperfect exec engagement beats waiting when the new VP knows your competitors.',rev:baseRev(0),stats:{trust:3,execAccess:5}},counterfactuals:cf};}
      if(choiceIdx===1)return{outcome:{msg:'Account brief educated the new VP on the architecture, the scale, and the roadmap. Slower but steady.',learn:'Data-driven briefs are lower ceiling but reliable.',rev:baseRev(5000),stats:{trust:5,execAccess:3}},counterfactuals:cf};
      return{outcome:{msg:'You waited. New VP launched an Adyen POC within 30 days. They know the Adyen playbook by heart.',learn:'30-day window after champion departure. Never wait when the replacement knows your competitors.',rev:baseRev(-30000),stats:{trust:-20,execAccess:-12},mistake:'Failed to engage new stakeholder within 30 days'},counterfactuals:cf};
  }}
  return{outcome:{msg:'The path continues.',learn:'',rev:0,stats:{}},counterfactuals:{}};
}
