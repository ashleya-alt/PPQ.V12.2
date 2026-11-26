import { Encounter, EncChoice, Signal } from '../types';
import type { Minigame } from '../types';
import { ENC_FITNESS } from './encounters-fitness';
import { ENC_PROPERTY } from './encounters-property';
import { ENC_RESTAURANT } from './encounters-restaurant';

/* ============================================================================
 * v11 CAMPAIGNS
 * Builds each platform's encounter list from (a) v10 encounters, patched
 * (chapter, discovery tags, hidden signals, ally swaps) and (b) new v11
 * encounters. Order in each array = play order. Chapters follow the
 * journey: Discovery > Launch/Facilitate > Monetize > Grow > Retain > Defend > Renewal,
 * trimmed by platform maturity.
 * ========================================================================== */

const ALL = [...ENC_FITNESS, ...ENC_PROPERTY, ...ENC_RESTAURANT];
/* ------------------------------- MINI-GAMES ------------------------------- */
const FIT_DISCOVERY_MG: Minigame = {title:'The War Room Workshop',intro:'Four executives, four agendas, ninety minutes. Listen to what each person says, then pick three diagnostic questions. Fourth round: use their statements to match each concern to the accountable executive. The final rapport roll may surface a private board measure that nobody has stated publicly.',openingStatements:[
  {speaker:'CEO',statement:'“Payments growth is on my agenda. I need proof that gyms will actually adopt it.”'},
  {speaker:'CFO',statement:'“Bring me a margin model built on our real ticket and debit mix before we talk rate.”'},
  {speaker:'CTO',statement:'“My team has to fit checkout, onboarding, and integration work into the roadmap.”'},
  {speaker:'Head of Operations',statement:'“When disputes, payout holds, or support escalations hit, they land with my team.”'},
],rollLabel:'Executive rapport: whether the CEO volunteers what the board privately uses to judge payments success',rounds:[
  {prompt:'The CEO opens: "We need buy rate. What\'s your rate?"',options:[
    {label:'"Before rate \u2014 how many of your 2,000 gyms process payments through FitStack today?"',correct:true,reveal:'disc_attach',feedback:'Silence, then: "Almost none." You\'ve found the real starting line: payments attach.'},
    {label:'Walk through Stripe\'s buy rate tiers',feedback:'The CEO smiles; the CFO checks out. You answered the question instead of diagnosing the problem.'},
    {label:'"What did the board promise investors?"',feedback:'Useful colour, but it skips the fact nobody in the room has measured: attach.'}]},
  {prompt:'The CFO: "Our gyms run $50 tickets and a lot of debit. Does that change anything?"',options:[
    {label:'"Not much \u2014 a blended rate smooths it out."',feedback:'It doesn\'t. Fixed network fees on $50 debit tickets are exactly where buy rate math breaks.'},
    {label:'"Yes. Can we pull the real card/debit mix and interchange before anyone models pricing?"',correct:true,reveal:'disc_economics',feedback:'The CTO exhales. The mix is 60% debit. Every pricing conversation now starts from facts.'},
    {label:'Pivot to the integration roadmap',feedback:'The roadmap matters, but you still don\'t know what FitStack\'s payments actually cost.'}]},
  {prompt:'Head of Ops: "Chargebacks are rising across the gym base. Where do you take the discussion?"',options:[
    {label:'"Which gym segment is generating the fastest dispute growth?"',feedback:'Segmentation helps later, but it does not reveal who owns the response when a gym crosses a threshold.'},
    {label:'"Which Radar tier is active across the gym base?"',feedback:'Useful product context, but a tier name alone does not expose the operating gap.'},
    {label:'"Who owns the response when a gym crosses a dispute threshold?"',correct:true,reveal:'disc_risk',feedback:'"Nobody consistently." One focused ownership question exposes the risk gap without giving away the answer.'}]},
  {type:'match',prompt:'Based on what each executive said, match each concern to the person accountable for it.',concerns:[
    {label:'Gym payments adoption and growth sponsorship',why:'The CEO sponsors the growth thesis and needs proof that gyms will adopt payments.'},
    {label:'Unit economics on the debit-heavy mix',why:'The CFO owns payments margin and the cost model.'},
    {label:'Checkout, onboarding, and integration capacity',why:'The CTO owns the implementation path and technical operating load.'},
    {label:'Disputes, payout holds, and merchant support',why:'The Head of Operations owns the day-to-day response.'}],executives:['CFO','Head of Operations','CEO','CTO'],correctMatches:[2,0,3,1],reveal:'disc_exec',feedback:'The statements establish the accountability: adoption with the CEO, economics with the CFO, implementation with the CTO, and disputes and support with Operations.'}]};
const RENT_DISCOVERY_MG: Minigame = {title:'The Council of Stewards',intro:'The CFO, CTO, Head of Operations, and investor each state what they are carrying. Use that conversation evidence in three diagnostic questions, then match each concern to the accountable executive. The final rapport roll may surface the investor’s unstated objective.',openingStatements:[
  {speaker:'CFO',statement:'“I will carry the payments P&L; the model has to reflect our actual debit and ACH mix.”'},
  {speaker:'CTO',statement:'“Any rail change or migration has to fit the architecture and engineering capacity I manage.”'},
  {speaker:'Head of Operations',statement:'“Deposit holds, ACH returns, and payout failures arrive in my team’s queue.”'},
  {speaker:'Investor',statement:'“The 180 bps peer benchmark is my hurdle; I need a credible return case.”'},
],rollLabel:'Executive rapport: whether the CFO will name the investor’s real objective with the investor listening',rounds:[
  {prompt:'The CFO slides over the investor’s benchmark deck: "Our peers earn 180 bps on buy rate. Why wouldn’t we?"',options:[
    {label:'"Those peers are card-heavy. Can we pull RentFlow’s real mix — cards vs. debit vs. ACH — first?"',correct:true,reveal:'disc_economics',feedback:'Rent is overwhelmingly ACH and debit. The 180 bps benchmark was never about RentFlow.'},
    {label:'"180 bps is achievable with the right tiering."',feedback:'You just modeled buy rate on someone else’s payment mix.'},
    {label:'Ask what the investor’s timeline is',feedback:'Timeline matters, but the mix decides whether buy rate works at all.'}]},
  {prompt:'The CFO, carefully: "We’re evaluating options." You suspect a rival is in the building.',options:[
    {label:'Let it go — pressing would feel desperate',feedback:'You leave not knowing Adyen has already presented.'},
    {label:'"Who else are you talking to, and what have they promised?"',correct:true,reveal:'disc_competition',feedback:'"Adyen. No minimums, and they’d white-label everything." Now you know the shape of the fight.'},
    {label:'Pitch Stripe’s reliability record',feedback:'Defensive, and it tells you nothing about the rival’s offer.'}]},
  {prompt:'Head of Operations: "Security deposits, holds, late fees, reserves — it’s all spreadsheets and a prayer."',options:[
    {label:'"Who owns the call when a deposit hold or payout freeze hits?"',correct:true,reveal:'disc_risk',feedback:'Three people, two banks, no reserve-policy owner. RentFlow’s operating risk is now on the table.'},
    {label:'"Treasury would fix that."',feedback:'Probably helpful. But you pitched a Retain product before understanding the operating problem.'},
    {label:'Ask how many spreadsheets are involved',feedback:'Useful process detail, but it misses ownership when money stops moving.'}]},
  {type:'match',prompt:'Based on what each person said, match each concern to the accountable executive.',concerns:[
    {label:'Net margin on the debit/ACH-heavy mix',why:'The CFO owns the payments P&L and the real unit economics.'},
    {label:'Payment-rail architecture and migration effort',why:'The CTO owns the technical path across cards, debit, and ACH.'},
    {label:'Deposit holds, ACH returns, and payout operations',why:'The Head of Operations owns the workflow when money stops moving.'},
    {label:'Growth benchmark and return thesis',why:'The investor owns the 180 bps anchor and the expected growth return.'}],executives:['Investor','CTO','CFO','Head of Operations'],correctMatches:[2,1,3,0],reveal:'disc_exec',feedback:'Economics belongs with the CFO, architecture with the CTO, money movement with Operations, and the benchmark thesis with the investor.'}]};
const REST_DISCOVERY_MG: Minigame = {title:'The Emperor\'s Council',intro:'Thirty minutes with the COO\'s executive staff. Each leader names the pressure they are carrying. Ask three diagnostic questions, then use those statements to match each concern to the accountable executive. The final rapport roll tests whether the COO will commit the staff to act.',openingStatements:[
  {speaker:'Head of Risk',statement:'“Fraud losses and a three-person team are my constraint; capacity is breaking.”'},
  {speaker:'CRO',statement:'“I am accountable for growing in-store attach, not just online ordering.”'},
  {speaker:'COO',statement:'“Merchant cash flow and supplier spend cut across the operating strategy I lead.”'},
  {speaker:'CFO',statement:'“I need the blended buy rate and card mix to deliver sustainable margin.”'},
],rollLabel:'Executive rapport: whether the COO commits the executive staff to the owners you identified',rounds:[
  {prompt:'The Head of Risk, exhausted: "Three of us, 45,000 merchants, and fraud is up 40%."',options:[
    {label:'"Can I shadow your team for a day \u2014 what do the three of you actually do between alerts?"',correct:true,reveal:'disc_risk',feedback:'Manual reviews, spreadsheets, and a Radar Standard setup nobody has tuned. The risk gap has a shape now.'},
    {label:'"Have you considered Managed Risk?"',feedback:'A fair product. The wrong moment: you don\'t yet know what they handle manually.'},
    {label:'"Fraud is a cost of doing business at scale."',feedback:'The Head of Risk stops talking to you.'}]},
  {prompt:'The CRO: "Our restaurants love online ordering. In-store? They use whatever the last rep sold them."',options:[
    {label:'"Let\'s measure it: what share of counter volume runs through OrderOS today vs. a legacy acquirer?"',correct:true,reveal:'disc_attach',feedback:'About 40%. Sixty percent of in-person volume walks past the platform every day.'},
    {label:'"Hardware is a distraction from software margins."',feedback:'For an in-person platform, you just dismissed the biggest attach pool.'},
    {label:'Suggest a Terminal demo next week',feedback:'Demos before measurement. You still don\'t know the size of the prize.'}]},
  {prompt:'The COO: "What do restaurant owners complain about to us, besides fees?"',options:[
    {label:'"Honestly, mostly fees."',feedback:'You accepted the framing. The real pain \u2014 cash flow and supplier spend \u2014 goes unspoken.'},
    {label:'"Can I interview a few owners about cash flow and how they pay suppliers?"',correct:true,reveal:'disc_obj4',feedback:'Waiting on deposits, paying suppliers on personal cards, no working capital. Embedded financial services, mapped.'},
    {label:'Present the OrderOS product roadmap',feedback:'They\'re busy. Showing answers before questions wastes the thirty minutes.'}]},
  {type:'match',prompt:'Based on what each executive said, match each concern to the person accountable for it.',concerns:[
    {label:'Fraud losses and risk-team capacity',why:'The Head of Risk owns fraud operations and staffing reality.'},
    {label:'In-store payments attach and revenue growth',why:'The CRO owns how much counter volume OrderOS captures.'},
    {label:'Merchant cash flow and supplier-spend strategy',why:'The COO owns the cross-functional retention and operating strategy.'},
    {label:'Margin and pricing-model performance',why:'The CFO owns the economics of the blended buy rate.'}],executives:['CRO','CFO','Head of Risk','COO'],correctMatches:[2,0,3,1],reveal:'disc_exec',feedback:'Risk capacity belongs to the Head of Risk, attach growth to the CRO, merchant operating strategy to the COO, and pricing performance to the CFO.'}]};
const FIT_READINESS_MG: Minigame = {title:'The Three Readiness Questions',intro:'Buy rate means FitStack owns pricing, margin, and the 2am merchant call. Before you green-light anything, assess the three things that decide whether a platform is ready. Pick the honest read in each of three rounds, rank the fixes in the fourth, then roll for how much the team will admit. Skill decides the verdict.',rollLabel:'how candid the CTO is about the gaps',rounds:[
  {prompt:'1. Team & ownership. Who owns the payments P&L once FitStack sets prices?',options:[
    {label:'"The CEO said they\'re ready \u2014 take their word for it."',feedback:'Enthusiasm is not a P&L owner.'},
    {label:'"Ask who owns payments margin and who answers merchant pricing questions at 2am."',correct:true,feedback:'"Nobody yet." Now the gap is named instead of assumed.'},
    {label:'"Stripe support covers merchants, so it doesn\'t matter."',feedback:'On buy rate, the platform owns pricing questions. Stripe support won\'t explain FitStack\'s margin.'}]},
  {prompt:'2. Cost model. How should the pricing math be built?',options:[
    {label:'"Use the industry blended benchmark \u2014 it\'s close enough."',feedback:'FitStack is $50 tickets and debit-heavy. Benchmarks hide exactly the fixed fees that sink margin.'},
    {label:'"Model credit interchange; debit is cheaper anyway."',feedback:'Cheaper per transaction, but fixed network fees on small debit tickets are where buy rate goes negative.'},
    {label:'"Build it on FitStack\'s actual mix: debit-heavy, small tickets, fixed network fees included."',correct:true,feedback:'The model shows 30% of transactions underwater at the proposed rate. Better to know now.'}]},
  {prompt:'3. Risk & operations. Who handles disputes, reserves, and onboarding support once FitStack owns pricing?',options:[
    {label:'"Map the owners now: disputes, reserves, payout holds, and merchant onboarding support."',correct:true,feedback:'Two of four have no owner. Readiness has a to-do list instead of a vibe.'},
    {label:'"Radar handles fraud, so risk is covered."',feedback:'Radar scores transactions. Someone still has to own disputes, reserves, and the merchant on hold.'},
    {label:'"Deal with it after launch."',feedback:'That is how margin crises start.'}]},
  {type:'rank',prompt:'4. Sequencing. Rank what FitStack must fix first before buy rate can be approved.',items:[
    {label:'Build margin reports and a pricing table FitStack can actually operate',why:'Tooling comes after the owner and the model it serves.'},
    {label:'Name a payments P&L owner',why:'First. Nothing else sticks without someone accountable for margin.'},
    {label:'Build the cost model on FitStack\'s real debit-heavy, small-ticket mix',why:'Second. The owner needs a true model to price against.'},
    {label:'Assign owners for disputes, reserves, and merchant onboarding support',why:'Third. Operational ownership before pricing goes live.'}],correctOrder:[1,2,3,0],feedback:'Owner, then model, then risk-ops owners, then tooling. Platforms that start with the pricing table and hope an owner appears are the ones that meet the goblins.'}]};
const RENT_READINESS_MG: Minigame = {title:'The Three Readiness Questions',intro:'Buy rate on a debit- and ACH-heavy platform is unforgiving. Assess the three things that decide readiness. Pick the honest read in each of three rounds, rank the fixes in the fourth, then roll for how much the CFO will admit in front of the investor. Skill decides the verdict.',rollLabel:'how candid the CFO is with the investor listening',rounds:[
  {prompt:'1. Team & ownership. Who owns the payments P&L once RentFlow sets prices?',options:[
    {label:'"Ask who owns payments margin and who takes the call when a property manager\'s payout is held."',correct:true,feedback:'"Finance, sort of." Nobody owns it. Named, not assumed.'},
    {label:'"The investor will fund a team once revenue shows up."',feedback:'Teams built after launch inherit the margin crisis.'},
    {label:'"Stripe handles merchant questions."',feedback:'On buy rate, pricing questions belong to the platform.'}]},
  {prompt:'2. Cost model. What has to be in it?',options:[
    {label:'"Card interchange \u2014 that\'s where the margin is."',feedback:'Cards are 30% of RentFlow\'s volume. The model ignores the rails that carry the rent.'},
    {label:'"Separate debit (Durbin caps + fixed fees) and ACH (returns, NSF, per-item costs) \u2014 priced as different rails."',correct:true,feedback:'ACH is unpriced today and debit is thin. The dual-rail gap is visible before it costs money.'},
    {label:'"Use the investor\'s benchmark deck."',feedback:'Someone else\'s payment mix. Again.'}]},
  {prompt:'3. Risk & operations. Deposits, holds, reserves, returns \u2014 who owns them?',options:[
    {label:'"Ops will figure it out."',feedback:'Three people and a spreadsheet will not absorb buy-rate-scale returns and holds.'},
    {label:'"Map owners for ACH returns, deposit holds, reserves, and onboarding support."',correct:true,feedback:'Reserves: nobody. Returns: a shared inbox. The list is the readiness plan.'},
    {label:'"Radar covers it."',feedback:'Radar doesn\'t run reserve policy or answer the frozen-payout call.'}]},
  {type:'rank',prompt:'4. Sequencing. Rank what RentFlow must fix first before buy rate can be approved.',items:[
    {label:'Price ACH per item and separate debit from credit',why:'Second. Dual-rail pricing is the cost model for this platform.'},
    {label:'Name a payments P&L owner',why:'First. Nobody fixes a margin nobody owns.'},
    {label:'Build a reserve policy and name owners for ACH returns and deposit holds',why:'Third. Risk ops before pricing goes live on a returns-heavy rail.'},
    {label:'Launch the investor\'s benchmark pricing tiers',why:'Last \u2014 if at all. Benchmarks built on someone else\'s mix are how this story goes wrong.'}],correctOrder:[1,0,2,3],feedback:'Owner, then dual-rail model, then risk-ops owners, then (maybe) tiers. The investor\'s deck is the last input, not the first.'}]};

function base(id: string): Encounter {
  const e = ALL.find(x => x.id === id);
  if (!e) throw new Error('Missing v10 encounter ' + id);
  return e;
}

/** Head of Payments is no longer a recruitable ally: its bonuses move to ProServ. */
function swapAllies(choices: EncChoice[]): EncChoice[] {
  return choices.map(c => {
    if (!c.companionBonus || c.companionBonus.payments_lead === undefined) return { ...c };
    const { payments_lead, ...rest } = c.companionBonus;
    return { ...c, companionBonus: { ...rest, proserv: Math.max(rest.proserv || 0, payments_lead) } };
  });
}

interface Patch {
  chapter: number;
  discovery?: Record<number, string[]>;
  reveal?: Signal[];
  choices?: (choices: EncChoice[]) => EncChoice[];
  type?: Encounter['type'];
  flavor?: string;
  conditional?: (gs: import('../types').GameState) => boolean;
}
function patch(id: string, p: Patch): Encounter {
  const e = base(id);
  let choices = swapAllies(e.choices);
  if (p.discovery) choices = choices.map((c, i) => (p.discovery![i] ? { ...c, discovery: p.discovery![i] } : c));
  if (p.choices) choices = p.choices(choices);
  return {
    ...e,
    chapter: p.chapter,
    type: p.type || e.type,
    flavor: p.flavor || e.flavor,
    conditional: p.conditional || e.conditional,
    signals: p.reveal ? [...(e.signals || []), ...p.reveal] : e.signals,
    choices,
  };
}

const ungate = (idx: number) => (cs: EncChoice[]) => cs.map((c, i) => (i === idx ? { ...c, requires: undefined } : c));

/* ---------------------------------------------------------------------------
 * 🏋️ FITSTACK: "The Attach Win" (Launch -> Retain, 7 chapters)
 * ------------------------------------------------------------------------- */
const FITNESS: Encounter[] = [
  // Ch1 Discovery
  {id:'f_scout',title:'The Scouting Report',emoji:'\u{1F5FA}\uFE0F',type:'discovery',chapter:1,flavor:'Your first meeting with FitStack\'s leadership is in three days. A champion who arrives prepared asks better questions. Where do you focus your preparation?',choices:[
    {label:'Study the Merchant Ledger',desc:'Gym payments economics: $50 tickets, recurring memberships, debit-heavy mix, interchange basics.'},
    {label:'Map the Royal Court',desc:'Research the board, CEO, CFO, and CTO: what each one is actually measured on.'},
    {label:'Scout the Rival Banners',desc:'Which gym-software competitors embed payments, and who else is pitching FitStack.'}]},
  {id:'f_attach_q',title:'The First Discovery Turn',emoji:'\u{1F517}',type:'discovery',chapter:1,flavor:'First meeting. Before you can sit down, the CEO opens: "So \u2014 how fast can we get to buy rate?" Redirect the solution request without duplicating the attach measurement in the workshop that follows.',signals:[
    {type:'yellow',text:'CEO is leading with a solution, not a problem'},
    {type:'green',text:'Full leadership team in the room: a rare discovery window'},
    {type:'green',text:'\u{1F50D} Your prep: most gyms run recurring memberships on debit \u2014 early buy rate spreads would be thin',reveal:'disc_economics'},
    {type:'green',text:'\u{1F50D} Your court map: the board is measured on ARR growth and net revenue retention \u2014 not take rate',reveal:'disc_exec'}],choices:[
    {label:'Ask: "What business result would make embedded payments a board-level win in 12 months?"',desc:'Start with the executive outcome: platform ARR, retention, and durable growth.'},
    {label:'Ask: "What keeps your gym owners up at night?"',desc:'Discover merchant pain: cash flow and failed recurring payments.'},
    {label:'Answer the question: walk through the buy rate pitch',desc:'Give the CEO what they asked for.'}]},
  {id:'f_council',title:'The War Room Session',emoji:'\u{1F5E3}\uFE0F',type:'discovery',chapter:1,flavor:'You\'ve earned 90 minutes with the CEO, CFO, and CTO together. How do you use it?',signals:[
    {type:'green',text:'Executives are curious and engaged'},
    {type:'yellow',text:'90 minutes goes fast with three executives and three agendas'}],choices:[
    {label:'Run a structured discovery workshop with your SA',desc:'Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.',useDice:true,diceStat:'trust',diceThreshold:12,companionBonus:{sa:2},discovery:['disc_exec'],minigame:FIT_DISCOVERY_MG},
    {label:'Send a discovery questionnaire ahead, then walk through the answers',desc:'Structured, efficient, a little impersonal.'},
    {label:'Skip discovery \u2014 use the time for a product demo',desc:'Show them Connect, Capital, and Radar. Let the product sell itself.'}]},

  // Ch2 Launch -> Facilitate
  {id:'f_decree',title:"The Board's Decree",emoji:'\u{1F4DC}',type:'stage_transition',chapter:2,flavor:'The board demands payments monetization. The CEO saw a white-labeled Connect demo at a conference: "Gyms should never see the word Stripe." The CTO has questions.',signals:[
    {type:'green',text:'Board aligned on wanting payments revenue \u2014 strong executive sponsorship'},
    {type:'yellow',text:'CEO fixated on white-labeling Connect from day one'},
    {type:'red',text:'No payments team, no support playbook, no risk or compliance owner'},
    {type:'yellow',text:'White-label means FitStack owns merchant onboarding support, risk questions, and compliance conversations'},
    {type:'green',text:'\u{1F50D} Your discovery: attach is the first win \u2014 most gyms process off-platform today',reveal:'disc_attach'},
    {type:'red',text:'\u{1F50D} Your discovery: no payments PM, no P&L owner \u2014 FitStack is not ready to white-label Connect',reveal:'disc_economics'}],choices:[
    {label:'Start with Standard Connect Rev Share',desc:'Stripe-hosted onboarding and dashboards. Revenue from day one, zero operational load on FitStack.'},
    {label:'White-label Connect from day one',desc:'FitStack-branded onboarding and payments, with FitStack owning support, risk, and compliance questions. Very hard without a payments team.',useDice:true,diceStat:'techCred',diceThreshold:17,companionBonus:{sa:1,proserv:1}},
    {label:'Partner Gateway Only (Facilitate)',desc:'Let gyms bring their own gateway through a partner integration. No pricing risk \u2014 and no payments revenue.'}]},
  patch('f_technical',{chapter:2}),

  // Ch3 Monetize
  {id:'f_convert',title:'From Gateway to Gold',emoji:'\u{1FA99}',type:'stage_transition',chapter:3,flavor:'The partner gateway works \u2014 but FitStack earns nothing on $12M of volume. The CFO notices.',conditional:(gs)=>gs.flags.includes('facilitate_only'),signals:[
    {type:'green',text:'Payments already embedded in the product \u2014 merchants are used to it'},
    {type:'yellow',text:'CFO asking why payments revenue is still zero'}],choices:[
    {label:'Move to Standard Connect Rev Share',desc:'Turn on monetization with zero pricing risk.'},
    {label:'Stay on the partner gateway',desc:'It works. Why change?'},
    {label:'Jump straight to buy rate',desc:'If we\'re going to monetize, go big.'}]},
  patch('f_margin_crisis',{chapter:3,choices:cs=>[...cs,{label:'Split model: new gyms on Rev Share 2.0, existing book stays on buy rate',desc:'Acknowledge the premature move without the overhead of unwinding it. Stop the bleeding on the front book; fix the back book over time.'}]}),
  {id:'f_collapse',title:'The Onboarding Collapse',emoji:'\u{1F4A5}',type:'consequence',chapter:3,flavor:'White-label launched. Within six weeks: 40% of gyms stall in verification, FitStack support is buried in "why is my payout on hold?" tickets, and the CTO is fielding compliance questions nobody at FitStack can answer.',conditional:(gs)=>gs.flags.includes('whitelabel_collapse'),signals:[
    {type:'red',text:'Onboarding completion down to 58% \u2014 gyms give up mid-verification'},
    {type:'red',text:'Support backlog: 900 open tickets, no payments specialist on staff'},
    {type:'yellow',text:'CEO still wants the brand promise kept'}],choices:[
    {label:'Retreat to Standard Connect: Stripe-hosted onboarding',desc:'Give the hard parts back to Stripe. Keep the brand on the dashboard, not the onboarding.'},
    {label:'Rebuild with the SA + ProServ',desc:'Embedded onboarding components, a support runbook, and a risk owner at FitStack. Expensive and slow.',useDice:true,diceStat:'techCred',diceThreshold:14,companionBonus:{sa:2,proserv:3,tam:1}},
    {label:'Push through \u2014 gyms will adapt',desc:'The brand matters more than a rough quarter.'}]},
  patch('f_whitelabel',{chapter:3,conditional:(gs)=>!gs.flags.includes('premature_buyrate')&&!gs.flags.includes('retreated_whitelabel')&&gs.stage<1.5,flavor:'Merchants see the Stripe brand on onboarding. Rev share is live and the kingdom is stable \u2014 now is the time to white-label and optimize.',choices:cs=>cs.map((c,i)=>i===2?{...c,hidden:true,requires:{notFlag:'on_buyrate'}}:c)}),
  {id:'f_conversion',title:'The Conversion Forge',emoji:'\u{2692}\uFE0F',type:'opportunity',chapter:3,flavor:'Rev share is live, but gym sign-up checkouts convert at 61%. Every abandoned membership is lost volume for FitStack and lost revenue for you. Monetize means maximizing conversion, not just rate.',signals:[
    {type:'yellow',text:'Checkout is a home-built form with card-only, no wallets, no saved payment details'},
    {type:'green',text:'Members sign up on mobile \u2014 Link and wallets convert best here'},
    {type:'green',text:'\u{1F50D} Your ledger study: debit-heavy memberships mean bank debits and wallets matter more than card rate',reveal:'disc_economics'}],choices:[
    {label:'Checkout + Link + payment methods for gym sign-ups',desc:'Stripe Checkout or Payment Element with Link, Apple Pay, Google Pay, and bank debits. Conversion first.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_economics'],companionBonus:{sa:2,proserv:1}},
    {label:'Optimize the rev share rate first',desc:'Negotiate a better split before touching the checkout.'},
    {label:'Leave the checkout alone',desc:'It works. Gyms haven\'t complained.'}]},
  patch('f_crucible',{chapter:3,discovery:{0:['disc_economics'],1:['disc_economics']},choices:cs=>cs.map((c,i)=>i===1?{...c,desc:'Mini-game: three readiness questions (team, cost model, risk ops) plus ranking the fixes. A perfect read on a ready platform is a green light; the candor roll only shades it.',diceStat:'techCred',diceThreshold:12,minigame:FIT_READINESS_MG}:c),reveal:[
    {type:'red',text:'\u{1F50D} Your discovery: still no payments PM, no P&L owner, and a debit-heavy membership mix',reveal:'disc_economics'}]}),
  patch('f_stabilize',{chapter:3,conditional:(gs)=>gs.flags.includes('on_buyrate')||gs.flags.includes('competitive_buyrate')}),

  // Ch4 Grow
  {id:'f_msap',title:'The Pact of Mutual Success',emoji:'\u{1F4DC}',type:'opportunity',chapter:4,flavor:'FitStack committed to embedded payments. Now 2,000 gyms need to actually go live \u2014 and the CEO has already moved on to the next initiative.',signals:[
    {type:'green',text:'Signed commitment and a motivated board'},
    {type:'yellow',text:'No named FitStack owner for go-live milestones'},
    {type:'red',text:'Deals without an activation plan often stall before revenue activates'}],choices:[
    {label:'Co-build an MSAP with FitStack and bring in ProServ',desc:'Mutual Success & Activation Plan: owners, milestones, and dates on both sides. ProServ de-risks the launch.'},
    {label:'Draft the MSAP yourself and share it',desc:'Faster. Less buy-in.'},
    {label:'They signed \u2014 they\'ll figure out go-live',desc:'Move on to the next deal.'}]},
  {id:'f_attach_campaign',title:'The Attach Campaign',emoji:'\u{1F3C6}',type:'opportunity',chapter:4,flavor:'Only a fraction of FitStack\'s 2,000 gyms process on-platform. Every gym that switches is recurring revenue, richer data, and a stickier customer.',signals:[
    {type:'green',text:'Gyms want one system for memberships and payments'},
    {type:'yellow',text:'Switching processors feels risky to small gym owners'},
    {type:'green',text:'\u{1F50D} You measured it: attach is ~15%. 1,700 gyms still process elsewhere.',reveal:'disc_attach'}],choices:[
    {label:'Launch an SPE growth workshop + embedded onboarding',desc:'Engage the Stripe Partner Ecosystem: growth workshop, co-marketing, and Connect embedded onboarding for gyms.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_attach'],companionBonus:{partner:2,proserv:1},boonBonus:{msap:2}},
    {label:'Offer switching incentives: 90 days of waived fees',desc:'Buy attach with short-term credits.'},
    {label:'Mandate integrated payments for all gyms',desc:'Make it a requirement in the next contract cycle.'}]},
  {id:'f_harvest',title:'The First Harvest',emoji:'\u{1F33E}',type:'stage_transition',chapter:4,flavor:'Attach is moving and rev share is generating real revenue. Gym owners are asking for more: recurring memberships, faster payouts, and a terminal at the front desk. Grow means incremental payments products.',signals:[
    {type:'green',text:'Memberships are recurring by nature \u2014 Billing is a natural fit'},
    {type:'green',text:'Merchants are cash-flow sensitive \u2014 payout speed matters most to them'},
    {type:'yellow',text:'Front-desk payments still run on a legacy terminal'},
    {type:'yellow',text:'Platform asks: "should we just go to buy rate now?"'},
    {type:'green',text:'\u{1F50D} Your attach measurement: in-person front-desk volume is the biggest untapped pool',reveal:'disc_attach'}],choices:[
    {label:'Billing for recurring memberships',desc:'Subscriptions, dunning, and failed-payment recovery for every gym. Recurring revenue on recurring revenue.'},
    {label:'Monetize Instant Payouts',desc:'Charge 50-100 bps on instant payouts.'},
    {label:'Terminal for the front desk',desc:'Bring in-person volume onto FitStack with Stripe Terminal, installed by a partner.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_attach'],companionBonus:{partner:2,proserv:1}},
    {label:'Push to buy rate as the gateway to Instant Payouts and Capital',desc:'Treat owning pricing as the unlock for monetizing payouts and lending. Gym owners want more, so skip ahead and own the stack.',hidden:true,requires:{notFlag:'on_buyrate'}},
    {label:'Optimize the buy rate: margin reports + pricing review',desc:'You\'re on buy rate already. Make it healthy before growing on top of it.',hidden:true,requires:{flag:'on_buyrate'}}]},
  {id:'f_risk',title:'The Chargeback Goblins',emoji:'\u{1F47A}',type:'crisis',chapter:4,flavor:'"Forgot to cancel" disputes and card-testing attacks are hitting FitStack\'s gyms. FitStack has no risk team. Which Radar plan \u2014 or Managed Risk \u2014 fits?',signals:[
    {type:'yellow',text:'Dispute rate trending toward network monitoring thresholds'},
    {type:'red',text:'Gym owners are blaming FitStack for the losses'},
    {type:'green',text:'New Radar plans: Standard (included) \u2192 Plus \u2192 Pro, or Stripe Managed Risk'},
    {type:'yellow',text:'\u{1F50D} Your discovery: zero risk headcount and no appetite to build a risk operation',reveal:'disc_risk'}],choices:[
    {label:'Radar Plus: custom rules and dynamic thresholds',desc:'Control and tuning. Someone at FitStack has to own the rules.',useDice:true,diceStat:'techCred',diceThreshold:11,discovery:['disc_risk'],companionBonus:{sa:2,tam:2}},
    {label:'Stripe Managed Risk (SMR)',desc:'Stripe takes on decisioning and liability for connected accounts. Higher fee, no risk team required.'},
    {label:'Radar Pro: Plus + account and customer abuse prevention',desc:'The most advanced protection: signup, free-trial, and bot abuse.'},
    {label:'Stay on Radar Standard and hope it settles',desc:'Standard is already included.'}]},

  {id:'f_reckoning',title:'The Interchange Wyrm',emoji:'\u{1F409}',type:'consequence',chapter:4,flavor:'The goblins were a nuisance. This is a wyrm. Buy rate was switched on before FitStack was ready, and now something is gnawing at the margin every night: fixed network fees on $50 debit tickets, unpriced disputes, and a pricing table nobody owns. The CFO wants to know why payments revenue is shrinking while volume grows.',conditional:(gs)=>gs.flags.includes('premature_buyrate')&&gs.flags.includes('on_buyrate')&&!gs.flags.includes('buy_rate_ready')&&gs.stage<2.5,signals:[
    {type:'red',text:'30% of transactions are underwater at the current rate'},
    {type:'red',text:'Nobody owns the payments P&L \u2014 the wyrm feeds unopposed'},
    {type:'yellow',text:'Moving everyone back to rev share would mean repricing 2,000 gyms and a very public retreat'},
    {type:'green',text:'\u{1F50D} Your ledger study: the losses are concentrated in small debit tickets \u2014 a segmentation problem, not a volume problem',reveal:'disc_economics'}],choices:[
    {label:'Forge the Margin Lens: margin reports + segmented pricing',desc:'See the wyrm before you fight it. Segment pricing by ticket size and rail, and name a P&L owner.',useDice:true,diceStat:'techCred',diceThreshold:12,discovery:['disc_economics'],companionBonus:{tam:2,proserv:2,sa:1},boonBonus:{margin_lens:3}},
    {label:'Split model: new gyms on Rev Share 2.0, existing book stays on buy rate',desc:'Stop feeding the wyrm new volume. Fix the back book over time.'},
    {label:'Full retreat to rev share',desc:'Reprice every gym back to rev share. The honest move \u2014 and a very expensive, very public one.'},
    {label:'Feed the wyrm: raise all rates 30 bps',desc:'Cover the losses with a blanket increase.'}]},

  // Ch5 Retain (Embedded Financial Services)
  {id:'f_obj4',title:'Beyond the Gateway',emoji:'\u{1F3E6}',type:'opportunity',chapter:5,flavor:'The board asks: "What\'s our next revenue line?" Gym owners need cash between membership cycles, a place to hold funds, and cards for equipment and supplies. Embedded financial services: monetize outside of payments.',signals:[
    {type:'green',text:'55% of gyms eligible for Capital'},
    {type:'green',text:'Embedded finance lifts retention and valuation multiples'},
    {type:'green',text:'\u{1F50D} Your discovery: cash flow between membership cycles is the #1 gym-owner pain',reveal:'disc_obj4'}],choices:[
    {label:'Embedded finance bundle: Capital + Financial Accounts + Issuing cards',desc:'Lending, a place to hold funds, and spend cards \u2014 three new revenue lines.',useDice:true,diceStat:'productMastery',diceThreshold:12,discovery:['disc_obj4'],companionBonus:{spe:2,proserv:1},boonBonus:{merchant_loyalty:2}},
    {label:'Start small: Capital only',desc:'The easiest embedded-finance entry point.'},
    {label:'Not now \u2014 stay focused on payments',desc:'One thing at a time.'}]},

  // Ch6 Defend
  patch('f_rival',{chapter:6,type:'defend',discovery:{0:['disc_competition']},reveal:[
    {type:'green',text:'\u{1F50D} Your scouting: Adyen\'s "no minimums" offer requires FitStack to own risk, onboarding, and support',reveal:'disc_competition'}],
    choices:cs=>[...cs.map((c,i)=>i===0?{...c,boonBonus:{...(c.boonBonus||{}),msap:2,treasury_key:1}}:i===1?{...c,label:'Counter with a Rev Share 2.0 optimization',desc:'Better split, white-label experience, conversion tooling \u2014 more value for FitStack without owning pricing risk.',hidden:true,requires:{notFlag:'on_buyrate'}}:i===2?{...c,hidden:true,requires:{notFlag:'on_buyrate'}}:c),
      {label:'Hold the buy rate \u2014 defend on total value, not price',desc:'FitStack is already on buy rate. Show the margin data, products live, and the activation plan instead of cutting.',hidden:true,requires:{flag:'on_buyrate'},useDice:true,diceStat:'execAccess',diceThreshold:11,discovery:['disc_competition'],companionBonus:{tam:2,sa:1},boonBonus:{msap:2,margin_lens:2}}]}),

  // Ch7 Grand Renewal
  {id:'f_renewal_prep',title:'The Renewal War Map',emoji:'\u{1F5FA}\uFE0F',type:'opportunity',chapter:7,flavor:'Renewal is 60 days away. The board will ask one question: "What did payments actually do for us?"',choices:[
    {label:'Build the value case: attach %, revenue, products live, MSAP milestones',desc:'Quantify the value delivered before you ask for anything.',useDice:true,diceStat:'execAccess',diceThreshold:10,discovery:['disc_exec'],boonBonus:{msap:2}},
    {label:'Ask the SA and TAM for a technical health review',desc:'Solid, but technical rather than business value.'},
    {label:'Wing it \u2014 the relationship is strong',desc:'They like you. That\'s enough.'}]},
  {id:'f_renewal',title:'The Grand Renewal',emoji:'\u{1F451}',type:'finale',chapter:7,flavor:'Contract renewal. The Grand Council convenes. Everything culminates here.',choices:[
    {label:'Rev Share 2.0 + Embedded Financial Services',desc:'Optimized rev share with Capital, Instant Payouts, Financial Accounts, and Issuing.',requires:{notFlag:'on_buyrate'}},
    {label:'Buy Rate + Product Bundle',desc:'Lock in buy rate with Billing, Terminal, Instant Payouts, and embedded financial services.',requires:{flag:'on_buyrate'}},
    {label:'Risk Expansion: Radar Plus \u2192 Pro + SMR for high-risk gyms',desc:'The new Radar plan structure as an expansion lever, with Managed Risk where FitStack wants Stripe to own liability.',hidden:true,requires:{flag:'disc_risk'}},
    {label:'Rev Share Increase Only',desc:'Simple but leaves value on the table.'},
    {label:'Split model: front book on Rev Share 2.0, back book stays on buy rate + embedded financial services',desc:'Acknowledge buy rate came early without the overhead of unwinding it. New gyms on rev share; the existing book stays and gets fixed.',hidden:true,requires:{flag:'on_buyrate'}}]},
];

/* ---------------------------------------------------------------------------
 * 🏠 RENTFLOW: "The Crossroads" (Monetize -> Retain, 6 chapters)
 * ------------------------------------------------------------------------- */
const PROPERTY: Encounter[] = [
  // Ch1 Discovery
  {id:'p_scout',title:'The Scouting Report',emoji:'\u{1F5FA}\uFE0F',type:'discovery',chapter:1,flavor:'The investor has called a board session on "the buy rate question" next week. You have a few days to prepare.',choices:[
    {label:'Study Debit & ACH Economics',desc:'Durbin-regulated interchange, debit program fees, ACH pricing models.'},
    {label:'Map the Boardroom',desc:'What the investor, CEO, and CFO are each measured on \u2014 and who really decides.'},
    {label:'Scout the Rival Banners',desc:'Who else is courting RentFlow, and what they\'re offering.'}]},
  {id:'p_ledger',title:'The Ledger of Rails',emoji:'\u{1F4D2}',type:'discovery',chapter:1,flavor:'Your first working session with RentFlow\'s CFO. The investor\'s deck \u2014 "Competitors make 180 bps!" \u2014 is on the table.',signals:[
    {type:'yellow',text:'Investor benchmarks come from other companies, not RentFlow data'},
    {type:'green',text:'CFO willing to open the books'},
    {type:'green',text:'\u{1F50D} Your prep: Durbin caps regulated debit interchange \u2014 the spread math is very different here',reveal:'disc_economics'}],choices:[
    {label:'Measure payments attach: how much rent still moves outside RentFlow?',desc:'Find the volume and recurring rent flows the platform does not capture today.'},
    {label:'Interview three property managers about their money flows',desc:'Deposits, owner payouts, maintenance \u2014 where does the money go, and where does it hurt?'}, 
    {label:'Accept the investor\'s benchmarks and model buy rate',desc:'The board already believes them.'}]},
  {id:'p_council',title:'The Council of Stewards',emoji:'\u{1F5E3}\uFE0F',type:'discovery',chapter:1,flavor:'The CFO, CTO, and Head of Operations agree to a working session. The investor will hear the readout.',choices:[
    {label:'Run a joint discovery session with your SA',desc:'Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.',useDice:true,diceStat:'trust',diceThreshold:12,companionBonus:{sa:2},discovery:['disc_exec'],minigame:RENT_DISCOVERY_MG},
    {label:'Ask the CFO directly: "Who else are you talking to?"',desc:'One sharp question.'},
    {label:'Skip it \u2014 the investor already defined the problem',desc:'Buy rate. Move fast.'}]},

  // Ch2 Monetize
  patch('p_crossroads',{chapter:2,reveal:[
    {type:'green',text:'\u{1F50D} Your mix analysis: under 10% credit \u2014 buy rate spread would be ~20-40 bps, not 180',reveal:'disc_economics'},
    {type:'green',text:'\u{1F50D} The bigger prize: deposits, owner payouts, and maintenance spend never touch card interchange',reveal:'disc_obj4'}]}),
  patch('p_technical',{chapter:2}),
  patch('p_margin_crisis',{chapter:2,choices:cs=>[...cs,{label:'Split model: new properties on Rev Share 2.0, existing book stays on buy rate',desc:'Acknowledge the premature move without the overhead of unwinding it. Stop the bleeding on the front book; fix the back book over time.'}]}),
  patch('p_crucible',{chapter:2,discovery:{0:['disc_economics'],1:['disc_economics']},choices:cs=>cs.map((c,i)=>i===1?{...c,desc:'Mini-game: three readiness questions (team, dual-rail cost model, risk ops) plus ranking the fixes. A perfect read on a ready platform is a green light; the candor roll only shades it.',diceStat:'techCred',diceThreshold:12,minigame:RENT_READINESS_MG}:c)}),
  patch('p_cost',{chapter:2,choices:cs=>cs.map((c,i)=>i===1?{...c,label:'Optimize the Rev Share 2.0 split + price ACH separately',desc:'Keep Stripe carrying the card mix, negotiate a better split, and stop giving ACH away. Works on rev share or buy rate.'}:c)}),
  {id:'p_expansion',title:'Foreign Shores',emoji:'\u{1F30D}',type:'opportunity',chapter:2,flavor:'The platform wants 3 new countries. Each has its own payment rails, local payment methods, tax rules, and identity requirements \u2014 conversion in a new market depends on getting those right before anyone talks about rate.',signals:[
    {type:'yellow',text:'Checkout today is cards-only, in one currency'},
    {type:'green',text:'Tenants in the new markets pay rent by bank transfer and local wallets'},
    {type:'yellow',text:'Each country adds tax registration and landlord verification requirements'},
    {type:'green',text:'\u{1F50D} Your ledger study: in two of the three markets, cards are under 20% of rent payments',reveal:'disc_economics'}],choices:[
    {label:'Local payment methods + Tax + Identity, per market',desc:'Launch each country with the rails tenants actually use, tax handled, landlords verified. Conversion first.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_economics'],companionBonus:{sa:2,proserv:1}},
    {label:'Tax + Identity only',desc:'Compliance first; payment methods later.'},
    {label:'Cards only \u2014 same checkout everywhere',desc:'Ship fast, localize later.'}]},

  // Ch3 Grow
  {id:'p_msap',title:'The Pact of Mutual Success',emoji:'\u{1F4DC}',type:'opportunity',chapter:3,flavor:'Whatever pricing path RentFlow chose, change is coming: new pricing, ACH flows, and international expansion. The CFO and CTO need one shared plan.',signals:[
    {type:'yellow',text:'No dedicated payments team to drive milestones'},
    {type:'green',text:'CFO and CTO both engaged after the Crossroads decision'}],choices:[
    {label:'Co-build an MSAP with the CFO + CTO and bring in ProServ',desc:'Owners, milestones, and dates on both sides. ProServ covers the ACH and multi-country build.'},
    {label:'Draft the MSAP yourself and share it',desc:'Faster. Less buy-in.'},
    {label:'Skip the plan \u2014 they know what to do',desc:'Trust the customer.'}]},
  {id:'p_uprising',title:'The Merchant Uprising',emoji:'\u{1F525}',type:'crisis',chapter:3,flavor:'15% merchant churn in one quarter. Tenants want ACH autopay, property managers say payouts are slow, and the support queue is on fire. A clear churn threat \u2014 which playbook fits?',signals:[
    {type:'red',text:'15% churn in a quarter, concentrated in mid-size property managers'},
    {type:'yellow',text:'Two separate complaints hiding under one churn number'},
    {type:'green',text:'\u{1F50D} Your interviews: owner payouts and deposit handling are the real pain \u2014 not price',reveal:'disc_obj4'}],choices:[
    {label:'Run the churn playbook: business review \u2192 Grow products \u2192 MSAP milestones',desc:'Diagnose the two causes, fix them with Instant Payouts and Billing autopay, and track recovery with the TAM against the MSAP.',useDice:true,diceStat:'trust',diceThreshold:11,discovery:['disc_obj4'],companionBonus:{tam:2,sa:1},boonBonus:{msap:2}},
    {label:'Run a business review only',desc:'Diagnose first. Decide on fixes next quarter.'},
    {label:'Offer merchant credits',desc:'Three months of fee credits to anyone threatening to leave.'}]},
  {id:'p_rentroll',title:'The Rent Roll',emoji:'\u{1F4C6}',type:'opportunity',chapter:3,flavor:'Rent is the most recurring payment in the kingdom \u2014 and RentFlow still collects it with one-off charges. Owners wait days for payouts. Grow means incremental payments products.',signals:[
    {type:'green',text:'Monthly rent + autopay = Billing\'s natural habitat'},
    {type:'green',text:'Owners would pay for same-day payouts'},
    {type:'green',text:'\u{1F50D} Your ledger: ACH rent runs on recurring mandates \u2014 Billing handles retries and failed payments',reveal:'disc_economics'}],choices:[
    {label:'Billing for recurring rent + Instant Payouts for owners',desc:'Autopay with retries and dunning for tenants; same-day payouts for owners, monetized.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_attach','disc_economics'],companionBonus:{proserv:2,sa:1},boonBonus:{msap:1}},
    {label:'Instant Payouts only',desc:'Fast revenue, no billing migration.'},
    {label:'Not now \u2014 the pricing change is enough',desc:'One transformation at a time.'}]},

  // Ch4 Retain (Embedded Financial Services)
  {id:'p_obj4',title:'The Vault of Deposits',emoji:'\u{1F3E6}',type:'opportunity',chapter:4,flavor:'Property managers hold millions in security deposits across dozens of bank accounts, pay owners manually, and run maintenance on personal cards. Embedded financial services: monetize outside of payments.',signals:[
    {type:'green',text:'This money never touches card interchange \u2014 no Durbin cap on this revenue'},
    {type:'yellow',text:'Requires compliance and multi-country thinking'},
    {type:'green',text:'\u{1F50D} Your interviews: deposits and owner payouts are the #1 operational headache',reveal:'disc_obj4'}],choices:[
    {label:'Financial Accounts for deposits + Issuing for maintenance + Capital',desc:'Hold deposits, fund maintenance cards, and lend to property managers.',useDice:true,diceStat:'productMastery',diceThreshold:12,discovery:['disc_obj4'],companionBonus:{proserv:2,spe:1},boonBonus:{compliance_armor:2}},
    {label:'Capital for property managers only',desc:'Start with lending.'},
    {label:'Squeeze more from ACH pricing instead',desc:'Stay inside payments.'}]},

  // Ch5 Defend
  {id:'p_adyen',title:'The Adyen Gambit',emoji:'\u2694\uFE0F',type:'defend',chapter:5,flavor:'Adyen offers RentFlow a buy rate with "no minimums" and a $250K migration incentive. The CFO forwards it to you: "Convince me to stay."',signals:[
    {type:'yellow',text:'CFO is genuinely tempted by the migration incentive'},
    {type:'red',text:'The investor is amplifying the Adyen pitch to the board'},
    {type:'green',text:'\u{1F50D} Your scouting: Adyen\'s offer assumes RentFlow takes on risk, onboarding, and compliance it isn\'t staffed for',reveal:'disc_competition'},
    {type:'green',text:'\u{1F50D} Your mix analysis: on a debit/ACH mix, Adyen\'s buy rate spread is thinner than RentFlow\'s rev share today',reveal:'disc_economics'}],choices:[
    {label:'Competitive value narrative: total platform value, not rate',desc:'Real payment-mix economics, switching cost, embedded financial services, and the activation plan.',useDice:true,diceStat:'productMastery',diceThreshold:13,discovery:['disc_competition','disc_economics'],companionBonus:{sa:2,tam:1,partner:2},boonBonus:{msap:2,treasury_key:2,compliance_armor:1}},
    {label:'Rally the Guild: Partner + ProServ switching-cost analysis',desc:'Show exactly what a migration would cost RentFlow in engineering time and risk.'},
    {label:'Match Adyen\'s pricing',desc:'Neutralize the offer.'},
    {label:'Dismiss it \u2014 they\'d never leave',desc:'Two years on Stripe. Too sticky to move.'}]},

  // Ch6 Grand Renewal
  {id:'p_renewal',title:'The Grand Renewal',emoji:'\u{1F451}',type:'finale',chapter:6,flavor:'Contract renewal. The debit/ACH mix makes this unlike any other negotiation.',choices:[
    {label:'Buy Rate + Dual-Rail Pricing + Embedded Financial Services',desc:'Separate card and ACH economics with Financial Accounts, Issuing, and Tax.',requires:{flag:'on_buyrate'}},
    {label:'Rev Share 2.0 + Embedded Financial Services',desc:'Optimized rev share with Financial Accounts, Issuing, Capital, and Tax. Let Stripe manage the card mix.',requires:{notFlag:'on_buyrate'}},
    {label:'Risk Expansion: Radar Plus + SMR for high-risk properties',desc:'The new Radar plans as an expansion lever, with Managed Risk where RentFlow wants Stripe to own liability.',hidden:true,requires:{flag:'disc_risk'}},
    {label:'Increase Rev Share Only',desc:'Simple. Leaves embedded financial services on the table.'},
    {label:'Split model: front book on Rev Share 2.0, back book stays on buy rate + embedded financial services',desc:'Acknowledge buy rate came early without the overhead of unwinding it. New properties on rev share; the existing book stays and gets fixed with dual-rail pricing.',hidden:true,requires:{flag:'on_buyrate'}}]},
];

/* ---------------------------------------------------------------------------
 * 🍕 ORDEROS: "The Empire" (late Monetize -> Retain, 5 chapters)
 * ------------------------------------------------------------------------- */
const RESTAURANT: Encounter[] = [
  // Ch1 Discovery
  {id:'r_scout',title:'The Scouting Report',emoji:'\u{1F5FA}\uFE0F',type:'discovery',chapter:1,flavor:'Eighteen months on the account \u2014 but the empire has changed. Before the quarterly business review, you prepare.',choices:[
    {label:'Study IC++ and Card-Mix Economics',desc:'Interchange variance, rewards cards, cross-border, statement generation.'},
    {label:'Map the Imperial Court',desc:'COO, CFO, CRO, and Head of Risk: the pressures each brings to the QBR.'},
    {label:'Scout the Rival Banners',desc:'Who is courting OrderOS\'s largest restaurant groups.'}]},
  {id:'r_audit',title:'The Imperial Audit',emoji:'\u{1F50E}',type:'discovery',chapter:1,flavor:'You have one day on site at OrderOS HQ. Where do you spend it?',signals:[
    {type:'green',text:'Leadership open to an honest audit'},
    {type:'yellow',text:'Everyone assumes you already know the account'}],choices:[
    {label:'Audit margin reports and card-mix economics',desc:'Find where rewards cards, cross-border traffic, and flat pricing create losses.'},
    {label:'Compare the decision criteria for the next QBR',desc:'Surface the margin, attach, risk-capacity, and merchant-operating tensions the room must resolve without pre-assigning owners.'},
    {label:'Review competitor activity in the top 50 restaurant groups',desc:'Find which groups are being courted and what rivals are promising.'},
    {label:'Skip the audit \u2014 you\'ve been on this account 18 months',desc:'You know this empire.'}]},
  {id:'r_council',title:'The Emperor\'s Council',emoji:'\u{1F5E3}\uFE0F',type:'discovery',chapter:1,flavor:'The COO grants you the executive staff meeting. Thirty minutes. Make it count.',choices:[
    {label:'Facilitate an executive discovery session with your SA',desc:'Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.',useDice:true,diceStat:'execAccess',diceThreshold:12,companionBonus:{sa:2},discovery:['disc_exec'],minigame:REST_DISCOVERY_MG},
    {label:'Ask the COO: "What happens if you don\'t solve this in 12 months?"',desc:'One question that reveals the stakes.'},
    {label:'Present your roadmap instead',desc:'They\'re busy. Show them the answer.'}]},

  // Ch2 Monetize: Optimize
  {id:'r_burden',title:"The Emperor's Burden",emoji:'\u{1F525}',type:'stage_transition',chapter:2,flavor:'Margin Reports are in. At $950M volume, 20% of merchants underwater means millions in losses \u2014 and engineering says custom pricing logic would take two quarters.',signals:[
    {type:'green',text:'$950M volume \u2014 every basis point of improvement is worth millions'},
    {type:'green',text:'Head of Payments has Margin Reports and wants to act'},
    {type:'green',text:'Platform Pricing Tool: no-code pricing schemes and pricing groups by tier, payment method, and geography'},
    {type:'yellow',text:'Head of Payments recommends a blanket rate increase as the fastest path to margin repair'},
    {type:'red',text:'20% of merchants underwater on high-interchange cards in tourist areas'},
    {type:'green',text:'\u{1F50D} Your prep: tourist-area locations run ~60% rewards cards vs. 25% in suburbs',reveal:'disc_economics'}],choices:[
    {label:'Card-mix analysis \u2192 segment with the Platform Pricing Tool',desc:'No-code pricing schemes and connected-account pricing groups. Live in weeks, not quarters.',useDice:true,diceStat:'techCred',diceThreshold:10,discovery:['disc_economics'],companionBonus:{sa:2,tam:2},boonBonus:{margin_lens:3}},
    {label:'Investigate Card Mix First',desc:'Understand the actual cost drivers before acting. Data before decisions.'},
    {label:'Accept HoP Recommendation: Raise All Rates 20 bps',desc:'Your trusted contact says this is the fastest fix. $1.9M in immediate margin recovery.'},
    {label:'Have engineering hand-build segmented application fees',desc:'Custom application_fee_amount logic. Full control \u2014 two quarters of engineering.'}]},
  patch('r_technical',{chapter:2}),
  {id:'r_frontdoor',title:'The Front Door',emoji:'\u{1F6AA}',type:'opportunity',chapter:2,flavor:'OrderOS sells online ordering \u2014 but restaurants live at the counter. For an in-person-heavy platform, Terminal sold with Connect can be the front door, not an add-on.',signals:[
    {type:'green',text:'Restaurant groups want one provider for counter, kiosk, and online'},
    {type:'yellow',text:'Hardware rollouts need installation partners'},
    {type:'green',text:'\u{1F50D} Your audit: ~60% of in-store volume leaks to a legacy acquirer',reveal:'disc_attach'}],choices:[
    {label:'Lead with Terminal + Connect for the counter',desc:'Make in-person payments the front door: Terminal readers, Tap to Pay, and one Connect account per restaurant.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_attach'],companionBonus:{partner:2,proserv:1}},
    {label:'Online ordering first, in-store later',desc:'Fix pricing on the volume you already have.'},
    {label:'Leave in-store to the legacy acquirer',desc:'Hardware is a distraction.'}]},
  {id:'r_tam_recruit',title:'The War Council',emoji:'\u{1F6E1}\uFE0F',type:'companion',chapter:2,flavor:'At $950M, the transformation ahead requires allies. Who do you bring in first?',choices:[
    {label:'Recruit the TAM (Paid Support)',desc:'Crisis response, margin monitoring, and technical escalation at scale.'},
    {label:'Engage ProServ for the IC++ and billing build',desc:'Stripe Professional Services: master builders for complex migrations.'},
    {label:'Bring in an Implementation Partner (SI)',desc:'A partner guild with restaurant-POS expertise and capacity.'},
    {label:'Go it alone \u2014 sharpen your instincts',desc:'You have 18 months of account knowledge.'}]},
  patch('r_enterprise',{chapter:2,discovery:{0:['disc_economics']}}),
  {id:'r_msap',title:'The Pact for the Rollout',emoji:'\u{1F4DC}',type:'opportunity',chapter:2,flavor:'Pricing is changing for 45,000 restaurants and the top 50 groups. The Head of Payments needs one plan everyone signs.',choices:[
    {label:'Co-build an MSAP with the Head of Payments + ProServ',desc:'Mutual Success & Activation Plan: owners, milestones, and dates on both sides.'},
    {label:'Draft the MSAP yourself and share it',desc:'Faster. Less buy-in.'},
    {label:'Skip the plan \u2014 the team is sophisticated',desc:'They\'ve done migrations before.'}]},

  {id:'r_fraud',title:'The Fraud Dragon',emoji:'\u{1F409}',type:'crisis',chapter:2,flavor:'Dispute rates spiking across 45,000 restaurants. The risk team of 3 is drowning and network monitoring thresholds are approaching. Which Radar plan \u2014 or Managed Risk?',signals:[
    {type:'green',text:'New Radar plans: Standard (included) \u2192 Plus \u2192 Pro, or Stripe Managed Risk'},
    {type:'yellow',text:'Head of Payments wants to keep control in-house'},
    {type:'red',text:'Monitoring-program threshold approaching \u2014 fines and program risk'},
    {type:'yellow',text:'\u{1F50D} Your audit: 400 manual dispute reviews a week, and the COO wants scale without headcount',reveal:'disc_risk'}],choices:[
    {label:'Radar Plus: custom rules and dynamic thresholds',desc:'Control and tuning \u2014 the risk team owns the rules.',useDice:true,diceStat:'techCred',diceThreshold:11,discovery:['disc_risk'],companionBonus:{tam:2,sa:2}},
    {label:'Radar Pro: Plus + account and customer abuse prevention',desc:'Adds protection against fake accounts and promo abuse across online ordering and ghost kitchens.',useDice:true,diceStat:'techCred',diceThreshold:10,discovery:['disc_risk'],companionBonus:{tam:2,sa:1}},
    {label:'Stripe Managed Risk (SMR)',desc:'Stripe takes on decisioning and liability for connected accounts. Higher fee, risk team freed.'},
    {label:'Support the internal team with better tooling',desc:'Honor the Head of Payments\' preference for control.'}]},

  // Ch3 Grow: omnichannel frontier
  {id:'r_omni',title:'The Omnichannel Frontier',emoji:'\u{1F9FE}',type:'opportunity',chapter:3,flavor:'The counter is where the empire\'s volume lives. Finish the omnichannel story: in-store, kiosk, and online on one platform, with faster payouts for every restaurant.',signals:[
    {type:'green',text:'Restaurant groups want unified online + in-store data'},
    {type:'yellow',text:'Hardware rollouts need installation partners'},
    {type:'green',text:'\u{1F50D} Your audit: ~60% of in-store volume leaks to a legacy acquirer',reveal:'disc_attach'}],choices:[
    {label:'Terminal consolidation + Instant Payouts',desc:'Bring in-store volume onto OrderOS with Stripe Terminal, and monetize faster payouts.',useDice:true,diceStat:'productMastery',diceThreshold:12,discovery:['disc_attach'],companionBonus:{partner:2,proserv:2}},
    {label:'Instant Payouts only',desc:'Fast revenue, no hardware.'},
    {label:'Leave in-store to the legacy acquirer',desc:'Online ordering is the core business.'}]},

  patch('r_champion',{chapter:3,discovery:{0:['disc_exec']}}),
  {id:'r_scale',title:'The Scale Crucible',emoji:'\u2696\uFE0F',type:'boss',chapter:3,flavor:'The COO returns to the risk path you chose at the Fraud Dragon: "The first decision is made. Now how does that model handle 40% more volume without breaking?"',signals:[
    {type:'red',text:'Current risk capacity cannot absorb 40% more volume'},
    {type:'yellow',text:'The COO wants the chosen model scaled, not a replay of the initial product selection'},
    {type:'green',text:'A scaled operating model needs coverage, owners, automation, and an explicit control boundary'}],choices:[
    {label:'Scale the Managed Risk rollout to every eligible merchant',desc:'Build from the earlier SMR choice: expand coverage, escalation paths, and reporting without adding platform headcount.',hidden:true,requires:{flag:'managed_risk'},useDice:true,diceStat:'trust',diceThreshold:10,discovery:['disc_risk'],companionBonus:{tam:3,proserv:1}},
    {label:'Operationalize Radar Pro with automation + a 5-person specialist team',desc:'Build from the earlier Radar Pro choice: staff account-abuse controls, automate queues, and govern models.',hidden:true,requires:{flag:'radar_pro'},useDice:true,diceStat:'execAccess',diceThreshold:10,discovery:['disc_risk'],companionBonus:{tam:2,sa:1}},
    {label:'Scale Radar Plus with a rules-governance risk pod',desc:'Build from the earlier Radar Plus choice: named rule owners, review cadences, automation, and additional analysts.',hidden:true,requires:{flag:'fraud_plus'},useDice:true,diceStat:'techCred',diceThreshold:11,discovery:['disc_risk'],companionBonus:{tam:2,sa:2}},
    {label:'Turn the internal-tooling path into a staffed risk-operations program',desc:'Acknowledge the earlier in-house choice: fund the owners, service levels, automation, and five new operators it actually requires.',hidden:true,requires:{flag:'fraud_internal'},useDice:true,diceStat:'execAccess',diceThreshold:12,discovery:['disc_risk'],companionBonus:{tam:2,proserv:1}},
    {label:'Create a segmented operating model for the highest-risk merchants',desc:'Keep the chosen foundation, but add stricter controls, coverage, and escalation for the riskiest segments.',useDice:true,diceStat:'productMastery',diceThreshold:11,discovery:['disc_risk'],companionBonus:{tam:2,sa:1}},
    {label:'Cap merchant onboarding until risk capacity catches up',desc:'A real scaling tradeoff: protect losses by slowing growth instead of pretending capacity is infinite.'}]},
  // Ch4 Retain + Defend
  {id:'r_obj4',title:'The Imperial Treasury',emoji:'\u{1F3E6}',type:'opportunity',chapter:4,flavor:'Restaurants live on thin margins: they need cash for slow seasons, cards for supplier purchasing, and a place to hold tips and payroll funds. Embedded financial services: monetize outside of payments.',signals:[
    {type:'green',text:'Embedded finance revenue doesn\'t depend on interchange'},
    {type:'green',text:'\u{1F50D} Your interviews: supplier spend and slow-season cash are top owner pains',reveal:'disc_obj4'}],choices:[
    {label:'Capital + Issuing supplier cards + Financial Accounts',desc:'Lending, spend, and a place to hold funds \u2014 three new revenue lines.',useDice:true,diceStat:'productMastery',diceThreshold:12,discovery:['disc_obj4'],companionBonus:{spe:2,proserv:1},boonBonus:{merchant_loyalty:2}},
    {label:'Capital only',desc:'The easiest embedded-finance entry point.'},
    {label:'Not a priority this year',desc:'Pricing transformation is enough change.'}]},
  {id:'r_raid',title:'The Competitor Raid',emoji:'\u2694\uFE0F',type:'defend',chapter:4,flavor:'Adyen goes directly after OrderOS\'s top 50 restaurant groups \u2014 and the new VP of Payments came from an Adyen shop.',signals:[
    {type:'red',text:'Top 50 groups = 30% of volume'},
    {type:'yellow',text:'New VP has no history with Stripe'},
    {type:'green',text:'\u{1F50D} Your scouting: Adyen is offering the top 50 IC++ with a one-year rate lock',reveal:'disc_competition'}],choices:[
    {label:'Defend with total value: pricing + risk + embedded-finance lock-in',desc:'IC++/segmentation, Managed Risk or Radar, embedded finance, and the activation plan.',useDice:true,diceStat:'execAccess',diceThreshold:13,discovery:['disc_competition','disc_exec'],companionBonus:{partner:2,proserv:1,tam:1},boonBonus:{msap:2,treasury_key:2,smr_aegis:2,pricing_forge:1}},
    {label:'Co-sell with SPE + Partner: roadmap and switching cost',desc:'Bring the Stripe Partner Ecosystem and the SI to the table.'},
    {label:'Offer the top 50 a blanket rate cut',desc:'Neutralize the price.'}]},

  // Ch5 Grand Renewal
  {id:'r_renewal',title:'The Grand Renewal',emoji:'\u{1F451}',type:'finale',chapter:5,flavor:'Contract renewal on a $950M platform. The entire industry is watching.',choices:[
    {label:'Full Suite: IC++ + Managed Risk + Embedded Financial Services',desc:'Passthrough pricing, Stripe-owned risk, and embedded finance.',requires:{flag:'on_icpp'}},
    {label:'Segmented Buy Rate + Radar Pro + Embedded Financial Services',desc:'Platform Pricing Tool segmentation with in-house risk on the most advanced Radar plan.'},
    {label:'Imperial Alliance: IC++ + SMR + Embedded Finance + SPE co-sell',desc:'The deepest partnership: every lever, plus joint go-to-market.',hidden:true,requires:{flag:'defended',companionCount:3}},
    {label:'Buy Rate Optimization Only',desc:'Incremental improvement. Minimal disruption, minimal upside.'}]},
];

export const CAMPAIGNS: Record<string, Encounter[]> = { fitness: FITNESS, property: PROPERTY, restaurant: RESTAURANT };
