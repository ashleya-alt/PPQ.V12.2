import { StatKey, CompanionDef, BoonDef, Platform, ChapterDef } from '../types';

const STAT_META:Record<StatKey, {label:string; emoji:string; color:string}> = {
  trust:{label:'Trust',emoji:'\u{1F91D}',color:'#6fd58a'},
  techCred:{label:'Tech Cred',emoji:'\u{1F527}',color:'#8ab4ff'},
  execAccess:{label:'Exec Access',emoji:'\u{1F451}',color:'#d9a8e4'},
  productMastery:{label:'Product Mastery',emoji:'\u{1F4DA}',color:'#ffb75d'},
};

/** v11: The Stripe embedded payments journey (Launch > Facilitate > Monetize > Grow > Retain) */
const JOURNEY = [
  {id:0,title:'Launch',emoji:'\u{1F680}',color:'#B8C1CE',desc:'Build an exceptional product and charge a subscription fee.',products:'Billing'},
  {id:1,title:'Facilitate',emoji:'\u{1F50C}',color:'#B8B4FF',desc:'Enable payment processing via a bring-your-own-gateway or partner model.',products:'Connect, Payments'},
  {id:2,title:'Monetize',emoji:'\u{1F4B0}',color:'#A9C2FF',desc:'Make money from payments processed through your platform; Checkout and local payment methods maximize conversion.',products:'Payment methods, Checkout, pricing model'},
  {id:3,title:'Grow',emoji:'\u{1F4C8}',color:'#AFA9FF',desc:'Launch incremental payments products: integrated POS, recurring payments, faster payouts.',products:'Terminal, Instant Payouts, Billing, Radar'},
  {id:4,title:'Retain',emoji:'\u{1F512}',color:'#C1BFFF',desc:'Embedded financial services: monetize outside of payments with treasury, bill pay, lending, expense cards.',products:'Capital, Treasury, Issuing'},
];
export function journeyObj(n: number) {
  return JOURNEY[Math.max(0, Math.min(JOURNEY.length - 1, Math.floor(n)))];
}

/** v11: Pricing models are levers INSIDE Monetize, not a maturity ladder. */
const STAGES = [
  {id:0,title:'Subscription Only',tag:'No Payments',color:'#B8C1CE',emoji:'\u{1F4E6}',desc:'Platform earns SaaS fees only'},
  {id:1,title:'Rev Share',tag:'Rev Share',color:'#B8B4FF',emoji:'\u{1F91D}',desc:'Stripe handles pricing, platform earns a share'},
  {id:1.5,title:'Rev Share 2.0',tag:'Rev Share 2.0',color:'#ADA8FF',emoji:'\u{1F4C8}',desc:'Better terms, white-label, 30-80 bps'},
  {id:2,title:'Buy Rate (Blended)',tag:'Buy Rate',color:'#A9C2FF',emoji:'\u{1F4B0}',desc:'Platform owns pricing, keeps the spread'},
  {id:2.5,title:'Segmented Pricing',tag:'Segmented',color:'#AFA9FF',emoji:'\u{1F3AF}',desc:'Different rates by tier, method, and risk'},
  {id:3,title:'IC++',tag:'IC++',color:'#C1BFFF',emoji:'\u{1F52C}',desc:'True cost-plus, zero interchange risk'},
];

/** Returns the highest pricing model at or below n (safe for legacy values like 3.5). */
export function stageObj(n: number) {
  let best = STAGES[0];
  for (const s of STAGES) if (s.id <= n) best = s;
  return best;
}

/** Discovery topics. Uncovered = +2 on dependent dice rolls, missing = -2 ("Guessing"). */
const DISCOVERY:Record<string,{label:string;emoji:string;desc:string}> = {
  disc_attach:{label:'Payments Attach',emoji:'\u{1F517}',desc:'What % of merchants process through the platform today'},
  disc_economics:{label:'Payments Economics',emoji:'\u{1F4CA}',desc:'Payment mix, payments team, P&L owner, interchange fluency'},
  disc_risk:{label:'Risk Profile',emoji:'\u{1F6E1}\uFE0F',desc:'Fraud patterns, risk appetite, risk-team capacity'},
  disc_obj4:{label:'Merchant Needs',emoji:'\u{1F3E6}',desc:'Cash flow, funds-holding, and spend needs (embedded-finance fuel)'},
  disc_competition:{label:'Competitive Landscape',emoji:'\u2694\uFE0F',desc:'Who else is pitching and what the incumbent setup looks like'},
  disc_exec:{label:'Exec Priorities',emoji:'\u{1F451}',desc:'What the board and executives are actually measured on'},
};

const COMPANIONS:CompanionDef[] = [
  {id:'sa',name:'The Architect',emoji:'\u{1F3D7}\uFE0F',title:'Solutions Architect',desc:'Every account has an SA.',passive:'+2 on technical encounters. Available on every account.'},
  {id:'tam',name:'The TAM',emoji:'\u{1F6E1}\uFE0F',title:'Technical Account Manager',desc:'A seasoned guardian who knows every system.',passive:'+2 to dice on crisis encounters.'},
  {id:'partner',name:'The Guildmaster',emoji:'\u{1F91D}',title:'Implementation Partner (SI / ISV)',desc:'A partner guild that brings implementation capacity and partner-sourced deals.',passive:'+2 on integration and defend rolls; faster activation.'},
  {id:'proserv',name:'The Artificers',emoji:'\u{1F9F0}',title:'Professional Services',desc:'Stripe ProServ: master builders for complex migrations and integrations.',passive:'+3 on big pricing moves (buy rate, IC++) and migrations.'},
  {id:'spe',name:'The Envoy',emoji:'\u{1F310}',title:'Stripe Partner Ecosystem (SPE)',desc:'Unlocks SPE tier benefits: growth workshops, co-sell, and MDF.',passive:'+3 on attach and Grow campaigns.'},
];

const BOONS:BoonDef[] = [
  {id:'fraud_shield',name:'Radar Ward',emoji:'\u{1F6E1}\uFE0F',desc:'Forged from Radar Plus / Pro',effect:'+2 on risk and crisis rolls.'},
  {id:'smr_aegis',name:'Aegis of Managed Risk',emoji:'\u{1F530}',desc:'Stripe Managed Risk: Stripe owns decisioning and liability',effect:'Fraud losses covered; frees the risk team.'},
  {id:'merchant_loyalty',name:'Merchant Loyalty Amulet',emoji:'\u{1F48E}',desc:'Earned through embedded financial services (Capital, Financial Accounts, Issuing)',effect:'+1 on Trust rolls; embedded financial services live.'},
  {id:'recurring_ledger',name:'Recurring Ledger',emoji:'\u{1F4D2}',desc:'Bound with Stripe Billing',effect:'+1 on Trust rolls; recurring revenue on recurring revenue.'},
  {id:'speed_talisman',name:'Speed Talisman',emoji:'\u26A1',desc:'Powered by Instant Payouts',effect:'+15% revenue.'},
  {id:'compliance_armor',name:'Compliance Armor',emoji:'\u{1F9E9}',desc:'Woven from Tax + Identity',effect:'+2 compliance dice.'},
  {id:'treasury_key',name:'Treasury Keystone',emoji:'\u{1F511}',desc:'Unlocked via Treasury / Financial Accounts',effect:'+$20K per encounter.'},
  {id:'margin_lens',name:'Margin Lens',emoji:'\u{1F50D}',desc:'Crafted from Margin Reports',effect:'+2 on pricing decisions.'},
  {id:'pricing_forge',name:'Pricing Forge',emoji:'\u2692\uFE0F',desc:'Platform Pricing Tool: no-code pricing schemes and groups',effect:'+2 on pricing decisions; segmentation without engineering.'},
  {id:'sa_rapport',name:'SA Rapport',emoji:'\u{1F91D}',desc:'Built through effective SA deployment',effect:'+2 on technical encounters.'},
  {id:'msap',name:'Pact of Mutual Success',emoji:'\u{1F4DC}',desc:'A Mutual Success & Activation Plan, co-owned with the customer',effect:'+2 on activation, defend, and renewal rolls.'},
];

/** Revenue a strong playthrough reaches on each platform; the score's revenue bonus is a % of this so platforms compare fairly. */
export const REVENUE_BENCHMARK:Record<string,number> = { fitness:650000, property:600000, restaurant:1200000 };
/** Five-tier ladder. Score = four stats + revenue tier bonus + discovery + journey, minus 10 per misstep. */
export const RANKS = [
  {min:0,  title:'Foot Soldier',emoji:'\u{1F6E1}\uFE0F',desc:'You marched. The kingdom barely noticed.'},
  {min:220,title:'Squire',emoji:'\u2694\uFE0F',desc:'You carried the banner and learned the land.'},
  {min:320,title:'Knight',emoji:'\u{1F3C7}',desc:'You won real battles and earned the court\'s respect.'},
  {min:420,title:'Champion',emoji:'\u{1F3C6}',desc:'You guided the platform through every gate with few missteps.'},
  {min:510,title:'Legendary Strategist',emoji:'\u{1F451}',desc:'Discovery, patience, and the right products at the right time. Bards will sing of this renewal.'},
];
const PLATFORMS:Platform[] = [
  {id:'fitness',name:'FitStack',emoji:'\u{1F3CB}\uFE0F',desc:'Gym management SaaS',volume:12000000,startStage:0,startJourney:0,journeyLabel:'Launch to Retain | The Attach Win',startStats:{trust:40,techCred:40,execAccess:40,productMastery:40},briefing:'FitStack is a gym management SaaS serving 2,000 locations. Its merchants are classic small businesses: $50 average tickets, high transaction volume, and tight cash flow.\n\nToday FitStack earns revenue only from software subscriptions. Its gyms take payments through a patchwork of outside processors, and nobody has measured how many would process through FitStack if given the chance.\n\nThe board wants embedded payments and wants them quickly. The CEO returned from a conference convinced the answer is buy rate. The CTO has questions nobody has answered.\n\nYour challenge: discover before you prescribe. Chapter 1 is where you earn Trust, Tech Cred, Exec Access, and Product Mastery, and every topic you uncover adds +2 to the dice later. Win the attach battle first, then guide FitStack from Launch to Retain without rushing to buy rate.'},
  {id:'property',name:'RentFlow',emoji:'\u{1F3E0}',desc:'Property management platform',volume:30000000,startStage:1.5,startJourney:2,journeyLabel:'Monetize to Retain | The Crossroads',startStats:{trust:40,techCred:40,execAccess:40,productMastery:40},briefing:'RentFlow is a property management platform serving 500 properties across 3 countries. It has run on Stripe Connect for two years with an optimized rev share earning 55 bps, and volume is growing 40% a year.\n\nRent is paid overwhelmingly by debit card and ACH. Debit interchange is capped at 1.1 to 1.4%, and 40% of volume moves on ACH, which follows entirely different economics. The margin on buy rate would be razor thin.\n\nCompetitors are circling RentFlow, and Adyen has been courting the CFO. The Series C investor sees peers on buy rate claiming 180 bps, so they are asking, why not RentFlow? No one at RentFlow owns the payments P&L.\n\nYour challenge: decide whether buy rate is even the right destination. Property managers hold deposits, pay owners, and fund maintenance, money that never touches a card network. The real prize may sit outside payments entirely.'},
  {id:'restaurant',name:'OrderOS',emoji:'\u{1F355}',desc:'Restaurant POS + online ordering platform',volume:950000000,startStage:2,startJourney:2,journeyLabel:'Monetize to Retain | The Empire',startStats:{trust:40,techCred:40,execAccess:40,productMastery:40},briefing:'OrderOS is a restaurant POS and online ordering platform: 45,000 restaurants plus ghost kitchens and food halls, $950M in annual processing volume, and a blended buy rate that has been live for 18 months.\n\nAt this scale every basis point is worth millions, and the margin reports are not kind. Twenty percent of merchants are underwater because a flat rate ignores rewards cards, cross-border tourist transactions, and card mix. Engineering says custom pricing logic would take two quarters.\n\nThe 50 largest restaurant groups, 30% of volume, want interchange passthrough pricing. A risk team of three people is drowning in disputes. The COO asks whether to hire five more people or find a smarter way.\n\nYour challenge: fix the margin, serve the enterprise groups, and tame the fraud without adding headcount. At nearly $1B in volume, every decision ripples across the industry.'},
];

const CHAPTERS_FITNESS:Record<number,ChapterDef> = {
  1:{title:'Discovery: The Scouting Expedition',emoji:'\u{1F9ED}',flavor:'Before any banner is raised, a wise champion learns the land. What you uncover here will tip every roll of the dice ahead.'},
  2:{title:'Facilitate \u2192 Monetize: The First Gateway',emoji:'\u{1F6AA}',flavor:'How will payments first flow through FitStack? Rev share is the proven first step. White-labeling Connect before the kingdom is ready is a trap.'},
  3:{title:'Monetize: The Crucible',emoji:'\u2696\uFE0F',flavor:'Revenue flows. The board says "buy rate." The investor says "buy rate." Are they ready?'},
  4:{title:'Grow: The Attach Campaign',emoji:'\u{1F4C8}',flavor:'Every gym that processes on-platform is a victory. Now win the realm, merchant by merchant.'},
  5:{title:'Retain: Beyond the Gateway (Embedded Financial Services)',emoji:'\u{1F512}',flavor:'The richest kingdoms earn gold beyond payments \u2014 lending, treasuries, and cards for their merchants.'},
  6:{title:'Defend: The Siege',emoji:'\u{1F3F0}',flavor:'Success attracts rivals. A dark rider approaches the gates.'},
  7:{title:'The Grand Renewal',emoji:'\u{1F451}',flavor:'Everything culminates. Your guidance will define whether this kingdom thrives.'},
};

const CHAPTERS_PROPERTY:Record<number,ChapterDef> = {
  1:{title:'Discovery: The Ledger of Rails',emoji:'\u{1F9ED}',flavor:'Rent flows through strange rails \u2014 debit, ACH, deposits. Learn them before you price them.'},
  2:{title:'Monetize: The Crossroads',emoji:'\u{1F6E4}\uFE0F',flavor:'The realm stands at a fork. Buy rate or hold? Then price the rails and open new shores. Your discovery will be tested.'},
  3:{title:'Grow: The Churn Playbook',emoji:'\u{1F4C8}',flavor:'A churn threat is a playbook, not a panic. Diagnose, fix with Grow products, and track the plan.'},
  4:{title:'Retain: The Vault (Embedded Financial Services)',emoji:'\u{1F512}',flavor:'Deposits, owner payouts, maintenance spend \u2014 gold that never touches a card network.'},
  5:{title:'Defend: The Adyen Gambit',emoji:'\u{1F3F0}',flavor:'A rival kingdom sends envoys with gold and promises. Will RentFlow stay?'},
  6:{title:'The Grand Renewal',emoji:'\u{1F451}',flavor:'Contract renewal. Everything you\'ve built converges here.'},
};

const CHAPTERS_RESTAURANT:Record<number,ChapterDef> = {
  1:{title:'Discovery: The Imperial Audit',emoji:'\u{1F9ED}',flavor:'The empire is vast but bleeding gold. Before you prescribe, audit the realm.'},
  2:{title:'Monetize: Optimize the Empire',emoji:'\u{1F52C}',flavor:'From blended buy rate to surgical pricing \u2014 and the front door to the counter. Risk is a margin problem too.'},
  3:{title:'Grow: The Omnichannel Frontier',emoji:'\u{1F409}',flavor:'Dragons, departures, and new frontiers. The empire must scale without breaking.'},
  4:{title:'Retain & Defend: The Imperial Treasury',emoji:'\u{1F512}',flavor:'Embedded financial services riches await \u2014 and a rival raids the empire\'s greatest lords.'},
  5:{title:'The Grand Renewal',emoji:'\u{1F451}',flavor:'The renewal defines the next era.'},
};

export function getChapters(pid: string): Record<number, ChapterDef> {
  if (pid === 'fitness') return CHAPTERS_FITNESS;
  if (pid === 'property') return CHAPTERS_PROPERTY;
  return CHAPTERS_RESTAURANT;
}

export { STAT_META, STAGES, JOURNEY, DISCOVERY, COMPANIONS, BOONS, PLATFORMS };
