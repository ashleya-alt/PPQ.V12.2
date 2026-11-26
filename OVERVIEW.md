# Platform Payments Quest V12.2 — Full Playthrough Overview

Generated from the frozen V12.2 source code on November 25, 2026. This source-derived review artifact catalogs every authored platform chapter, encounter, choice, and mini-game. Its outcome examples are representative source-resolved outcomes, not an exhaustive enumeration of every reachable state or branch combination. Base revenue is shown before Speed Talisman and Treasury Keystone effects unless an outcome itself says otherwise.

## Scope and policy boundary

All company names, scenarios, dollar amounts, basis-point examples, product fit statements, and teaching outcomes below are game rules and fictional training economics encoded in PPQ V12.2. They are not quotes, forecasts, pricing approvals, commitments, eligibility determinations, or real commercial policy. Real customer recommendations require current product documentation, account facts, legal/compliance review, and the appropriate commercial approvals.

## How to read this overview

- Journey: Launch → Facilitate → Monetize → Grow → Retain.
- Pricing model: Subscription Only → Rev Share → Rev Share 2.0 → Buy Rate → Segmented Pricing → IC++. Pricing is a decision lever inside the journey, not a universal maturity ladder.
- Dice choices show both source-resolved success and failure. The game displays the roll purpose before the player rolls, waits for Roll the d20, then waits again for Continue to result; no result timer advances play.
- Discovery flags add +2 each to dependent rolls; missing discovery flags subtract 2 each. Hidden signals and choices appear only when their prerequisites are satisfied.
- Mini-games are skill first and luck second: each correct read adds +2, each misread subtracts 2. Roads Not Taken always shows the generic four-tier comparison and highlights the tier reached.
- Representative outcome extraction starts from Trust, Tech Cred, Exec Access, and Product Mastery at 65, with only the Solutions Architect available and no boons. It then adds the encounter context and only the prerequisites required by the illustrated choice. Dice examples use decisive success/failure totals; mini-game examples use all-correct/all-wrong picks.
- These illustrative contexts are not exhaustive. Material alternatives are called out in the RentFlow decision tree and encounter branch notes; other combinations can vary with prior flags, stage, journey, discovery, allies, boons, dice, and mini-game performance.

## Concise V12.2 change summary

- Discovery round four is now concern-to-executive matching on FitStack, RentFlow, and OrderOS; each mini-game opens with four public executive statements and then uses those statements for four concern/owner matches.
- FitStack’s economics diagnostic is now voiced by the CFO, consistent with the CFO’s ownership of the real ticket/debit margin model.
- Readiness assessments retain the fourth-round rank-the-fixes decision. Four-round helper copy now states three pick questions plus the fourth matching or prioritization decision, with all four required for a perfect verdict.
- Mini-game Roads Not Taken now shows all four generic tiers at once and highlights the tier reached; non-achieved cards stay generic and do not expose missed topics, unchosen answers, or hypothetical hidden discoveries.
- OrderOS scouting now names the COO, CFO, CRO, and Head of Risk; its audit surfaces decision criteria without pre-assigning owners. Scale Crucible continues the actual Fraud Dragon path—Radar Plus, Radar Pro, Managed Risk, or internal tooling—rather than asking the initial product question again.
- FitStack’s White-Label Dawn excludes both premature-buy-rate and retreated-white-label states; retreating after collapse proceeds to Conversion Forge rather than immediately re-offering white-label.
- Dice purpose is visible before rolling; results advance only through Continue.
- FitStack dispute discovery is one focused ownership question, and pre-workshop discovery no longer duplicates the workshop’s attach measurement.
- RentFlow uses the 180 bps fictional benchmark consistently, identifies competitors circling, includes “so they are asking, why not RentFlow?”, and closes the successful defense with “No minimums” does not mean no obligations.
- Readability was improved across meaningful body/action text, narrow header/stat wrapping, score widths, and accessible journey/stage/grade colors. These are source-level changes; browser QA remains pending. Starting stats remain neutral at 40/40/40/40; additive scoring and five ranks remain.

## Core rules, scoring, and generic mini-game results

All platforms start at Trust 40, Tech Cred 40, Exec Access 40, and Product Mastery 40, with the SA already available. Score = four stats + revenue-tier bonus + 5 per discovered topic + journey bonus − 10 per misstep.

| Revenue against platform benchmark | Score bonus |
| --- | ---: |
| Below 25% | 0 |
| 25% to under 50% | 25 |
| 50% to under 75% | 50 |
| 75% to under 100% | 75 |
| 100% to under 125% | 100 |
| 125% or more | 125 |

Benchmarks: FitStack $650,000; RentFlow $600,000; OrderOS $1,200,000. Journey bonus: +25 at Grow, +50 at Retain.

| Rank | Minimum score | Meaning |
| --- | ---: | --- |
| Foot Soldier | 0 | You marched. The kingdom barely noticed. |
| Squire | 220 | You carried the banner and learned the land. |
| Knight | 320 | You won real battles and earned the court's respect. |
| Champion | 420 | You guided the platform through every gate with few missteps. |
| Legendary Strategist | 510 | Discovery, patience, and the right products at the right time. Bards will sing of this renewal. |

### Roads Not Taken: generic four-tier comparison

The runtime panel always shows all four generic tiers and highlights the achieved tier. Only the highlighted tier uses the actual source-resolved result summary; the other three cards retain the generic descriptions below. The comparison does not reveal which topics, answers, owners, or priorities the player missed.

- Clear read: All four decisions land; skill secures the strongest meeting outcome.
- Strong read: Three decisions land; the meeting produces a useful, bounded outcome.
- Partial read: Some decisions land; the outcome remains limited and guarded.
- No read: No decision lands; the meeting produces no usable read.

## RentFlow buy-rate decision tree

RentFlow starts at Rev Share 2.0, Monetize, 40/40/40/40, with no flags. The following is the actual V12.2 branch logic.

### 1. The Crossroads

- Pump the Brakes: stay at Rev Share 2.0; add held_wisely; +$30K, Trust +15, Product Mastery +8.
- Propose a Readiness Roadmap: stay at Rev Share 2.0; add readiness_roadmap; +$15K, Trust +12, Exec Access +10, Tech Cred +5.
- Green-Light Buy Rate: move to Buy Rate; add on_buyrate and premature_buyrate; −$35K, Trust −18, Tech Cred −8, Exec Access −10, and one misstep.

### 2A. Premature path: Margin Crisis and recovery

- Margin Crisis runs whenever premature_buyrate is present.
- Emergency segmented pricing + debit fee optimization: move to Segmented Pricing; keep the historical premature flag and on_buyrate; unlock Margin Lens; −$10K.
- Revert to Rev Share: return to Rev Share 2.0; remove on_buyrate; add reverted_from_buyrate; −$45K. Because on_buyrate is absent, the later Crucible is active again. The historical premature flag remains, so Cost of Power is skipped.
- Raise all merchant rates: remain on premature buy rate; +$10K, Trust −18, Exec Access −8, and one misstep.
- Split model: new properties/front book move to Rev Share 2.0 while the back book remains on buy rate; add split_model; keep on_buyrate and the historical premature flag; −$5K, Trust +8, Tech Cred +4, Exec Access +2.

### 2B. Off-buy-rate path: Buy Rate Crucible

- The Crucible appears only when on_buyrate is absent.
- Direct green light: dice success with readiness_roadmap adds on_buyrate and buy_rate_ready, moves to Buy Rate, and earns +$70K. Success without the roadmap moves live with on_buyrate only and +$40K; it is not readiness-proven. Failure moves live with on_buyrate and premature_buyrate, loses $40K, and logs a misstep.
- Three Questions mini-game: actual readiness requires readiness_roadmap and Tech Cred at least 40. A perfect four-round assessment on a ready platform adds on_buyrate and buy_rate_ready even if the candor roll fails; the roll changes only revenue and stats. A perfect assessment without prerequisites says “not yet” and adds buy_rate_assessed. One miss also waits and adds buy_rate_assessed. Two or more misses are inconclusive.
- Hold at Rev Share 2.0: remain off buy rate; +$30K, Trust +10, Product Mastery +8; unlock Compliance Armor.

### 3. Cost of Power and margin recovery

- Cost of Power runs only when premature_buyrate is absent.
- Dual pricing is available only with on_buyrate; it moves healthy buy rate to Segmented Pricing and unlocks Margin Lens.
- Optimize the Rev Share 2.0 split + price ACH separately works on either pricing state and adds ach_priced, worth +5% at renewal.
- A reverted premature path retains premature_buyrate and therefore skips Cost of Power.

### 4. Adyen Gambit before renewal

- Discovery-backed value narrative: success adds defended and +$80K; defended contributes +10% at renewal. Failure adds dual_process, loses $40K, and contributes −25%. The successful close says: “No minimums” does not mean no obligations.
- Partner + ProServ switching-cost analysis: +$30K, recruits Partner, and adds defended_partial; defended_partial has no direct renewal multiplier.
- Match Adyen pricing: −$60K and one misstep.
- Dismiss the threat: −$120K, adds churned_partial, one misstep, and −30% at renewal.

### 5. Grand Renewal availability and flags

| Renewal choice | Availability | Base revenue and branch behavior |
| --- | --- | --- |
| Buy Rate + Dual-Rail Pricing + Embedded Financial Services | Requires on_buyrate | $100K when buy_rate_ready is present; otherwise shortcut/unproven copy and $75K |
| Rev Share 2.0 + Embedded Financial Services | Requires absence of on_buyrate | $105K |
| Risk Expansion: Radar Plus + SMR | Hidden unless disc_risk was discovered | $95K |
| Increase Rev Share Only | Always available | $30K and a rate-only renewal misstep |
| Split model: front book Rev Share 2.0 / back book buy rate | Hidden unless on_buyrate is present | If buy_rate_ready is present, splitting a healthy buy rate is a misstep with $50K base. Otherwise it acknowledges the premature path, adds/retains split_model, and uses $80K base. |

Renewal base revenue first receives Speed Talisman +15% and Treasury Keystone +$20K if those boons are present, then the renewal multiplier is applied: value_case +20%; MSAP +10%; attach_win +15%; Retain journey +15%; defended +10%; dual_process −25%; churned_partial −30%; buy_rate_ready +10%; split_model −10%; unresolved premature buy rate −20% only while still on unsplit, unproven buy rate below Segmented Pricing; ach_priced +5%. RentFlow’s Rent Roll sets rentroll_win, not attach_win. The isolated premature split branch is $80K × 0.90 = $72K before any Speed/Treasury helper effects.

# 🏋️ FitStack — The Attach Win

Platform: Gym management SaaS. Starts at Launch · Subscription Only · Trust 40 / Tech Cred 40 / Exec Access 40 / Product Mastery 40. Authored chapters: 7. Authored encounters: 21, including 7 conditional encounters.

Briefing: FitStack is a gym management SaaS serving 2,000 locations. Its merchants are classic small businesses: $50 average tickets, high transaction volume, and tight cash flow. Today FitStack earns revenue only from software subscriptions. Its gyms take payments through a patchwork of outside processors, and nobody has measured how many would process through FitStack if given the chance. The board wants embedded payments and wants them quickly. The CEO returned from a conference convinced the answer is buy rate. The CTO has questions nobody has answered. Your challenge: discover before you prescribe. Chapter 1 is where you earn Trust, Tech Cred, Exec Access, and Product Mastery, and every topic you uncover adds +2 to the dice later. Win the attach battle first, then guide FitStack from Launch to Retain without rushing to buy rate.

Flow: The Scouting Report → The First Discovery Turn → The War Room Session → The Board's Decree → The Architecture Question → From Gateway to Gold* → The Margin Crisis* → The Onboarding Collapse* → The White-Label Dawn* → The Conversion Forge → The Buy Rate Crucible* → Stabilizing the Empire* → The Pact of Mutual Success → The Attach Campaign → The First Harvest → The Chargeback Goblins → The Interchange Wyrm* → Beyond the Gateway → The Rival's Shadow → The Renewal War Map → The Grand Renewal. An asterisk marks a conditional encounter.

## Chapter 1: Discovery: The Scouting Expedition

Before any banner is raised, a wise champion learns the land. What you uncover here will tip every roll of the dice ahead.

### The Scouting Report

Type: discovery. Encounter ID: f_scout.
Setup: Your first meeting with FitStack's leadership is in three days. A champion who arrives prepared asks better questions. Where do you focus your preparation?
Choices and outcomes:
A. Study the Merchant Ledger — Gym payments economics: $50 tickets, recurring memberships, debit-heavy mix, interchange basics.
- Outcome: You arrive fluent in the payment mix and interchange economics. Every pricing conversation ahead starts from facts.
  - Effects: Tech Cred +12; Product Mastery +10; flag disc_economics
- Lesson: Preparation turns a pitch into a diagnosis. Discovery flag uncovered: Payments Economics (+2 on dependent rolls).
B. Map the Royal Court — Research the board, CEO, CFO, and CTO: what each one is actually measured on.
- Outcome: You know who decides, who influences, and what each executive is measured on.
  - Effects: Exec Access +12; Trust +6; flag disc_exec
- Lesson: Stakeholder mapping is discovery too. Discovery flag uncovered: Exec Priorities (+2 on dependent rolls).
C. Scout the Rival Banners — Which gym-software competitors embed payments, and who else is pitching FitStack.
- Outcome: You know which rivals are circling and what they're offering.
  - Effects: Product Mastery +8; Tech Cred +4; flag disc_competition
- Lesson: Know the rival before the rival knows you. Discovery flag uncovered: Competitive Landscape (+2 when the competitor appears).

### The First Discovery Turn

Type: discovery. Encounter ID: f_attach_q.
Setup: First meeting. Before you can sit down, the CEO opens: "So — how fast can we get to buy rate?" Redirect the solution request without duplicating the attach measurement in the workshop that follows.
Signals:
- YELLOW: CEO is leading with a solution, not a problem
- GREEN: Full leadership team in the room: a rare discovery window
- GREEN: 🔍 Your prep: most gyms run recurring memberships on debit — early buy rate spreads would be thin Hidden until Payments Economics is discovered.
- GREEN: 🔍 Your court map: the board is measured on ARR growth and net revenue retention — not take rate Hidden until Exec Priorities is discovered.
Choices and outcomes:
A. Ask: "What business result would make embedded payments a board-level win in 12 months?" — Start with the executive outcome: platform ARR, retention, and durable growth.
- Outcome: The CEO pauses, then names the board's test: embedded payments must lift platform ARR and gym retention within 12 months. The conversation moves from rate to business outcome.
  - Effects: Exec Access +8; Trust +6; flag disc_exec
- Lesson: Start executive discovery with the outcome the customer is accountable for. The workshop can then measure attach without repeating this question. Discovery flag uncovered: Exec Priorities.
B. Ask: "What keeps your gym owners up at night?" — Discover merchant pain: cash flow and failed recurring payments.
- Outcome: Cash flow between membership cycles and failed recurring payments dominate the answer. You've mapped future Capital, Instant Payouts, and Billing plays without pre-selling a product.
  - Effects: Trust +10; Product Mastery +4; flag disc_obj4
- Lesson: Merchant-pain discovery uncovers embedded-finance opportunities the platform has not yet put into words.
C. Answer the question: walk through the buy rate pitch — Give the CEO what they asked for.
- Outcome: The CEO likes the buy rate vision. The CFO checks out. You leave with enthusiasm and no operating facts.
  - Effects: Exec Access +3; Product Mastery +3; Trust -6; mistake logged: Pitched buy rate before discovery
- Lesson: Answering the solution request is not discovery. Redirect to the business outcome before presenting a model.

### The War Room Session

Type: discovery. Encounter ID: f_council.
Setup: You've earned 90 minutes with the CEO, CFO, and CTO together. How do you use it?
Signals:
- GREEN: Executives are curious and engaged
- YELLOW: 90 minutes goes fast with three executives and three agendas
Choices and outcomes:
A. Run a structured discovery workshop with your SA — Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.
- Dice: d20 + Trust bonus vs 12.
- Purpose shown before roll: Executive rapport: whether the CEO volunteers what the board privately uses to judge payments success.
- Discovery dependency: Exec Priorities (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2.
- Mini-game: The War Room Workshop. Four executives, four agendas, ninety minutes. Listen to what each person says, then pick three diagnostic questions. Fourth round: use their statements to match each concern to the accountable executive. The final rapport roll may surface a private board measure that nobody has stated publicly.
- Opening statements heard before round one:
  - CEO: “Payments growth is on my agenda. I need proof that gyms will actually adopt it.”
  - CFO: “Bring me a margin model built on our real ticket and debit mix before we talk rate.”
  - CTO: “My team has to fit checkout, onboarding, and integration work into the roadmap.”
  - Head of Operations: “When disputes, payout holds, or support escalations hit, they land with my team.”
- Round 1: The CEO opens: "We need buy rate. What's your rate?"
  - Correct: "Before rate — how many of your 2,000 gyms process payments through FitStack today?" — Silence, then: "Almost none." You've found the real starting line: payments attach.
  - Alternative: Walk through Stripe's buy rate tiers — The CEO smiles; the CFO checks out. You answered the question instead of diagnosing the problem.
  - Alternative: "What did the board promise investors?" — Useful colour, but it skips the fact nobody in the room has measured: attach.
- Round 2: The CFO: "Our gyms run $50 tickets and a lot of debit. Does that change anything?"
  - Alternative: "Not much — a blended rate smooths it out." — It doesn't. Fixed network fees on $50 debit tickets are exactly where buy rate math breaks.
  - Correct: "Yes. Can we pull the real card/debit mix and interchange before anyone models pricing?" — The CTO exhales. The mix is 60% debit. Every pricing conversation now starts from facts.
  - Alternative: Pivot to the integration roadmap — The roadmap matters, but you still don't know what FitStack's payments actually cost.
- Round 3: Head of Ops: "Chargebacks are rising across the gym base. Where do you take the discussion?"
  - Alternative: "Which gym segment is generating the fastest dispute growth?" — Segmentation helps later, but it does not reveal who owns the response when a gym crosses a threshold.
  - Alternative: "Which Radar tier is active across the gym base?" — Useful product context, but a tier name alone does not expose the operating gap.
  - Correct: "Who owns the response when a gym crosses a dispute threshold?" — "Nobody consistently." One focused ownership question exposes the risk gap without giving away the answer.
- Round 4: Based on what each executive said, match each concern to the person accountable for it.
  - Match Gym payments adoption and growth sponsorship → CEO. The CEO sponsors the growth thesis and needs proof that gyms will adopt payments.
  - Match Unit economics on the debit-heavy mix → CFO. The CFO owns payments margin and the cost model.
  - Match Checkout, onboarding, and integration capacity → CTO. The CTO owns the implementation path and technical operating load.
  - Match Disputes, payout holds, and merchant support → Head of Operations. The Head of Operations owns the day-to-day response.
  - Matching rule: every concern must be assigned to its correct executive. The statements establish the accountability: adoption with the CEO, economics with the CFO, implementation with the CTO, and disputes and support with Operations.
- Final roll: Executive rapport: whether the CEO volunteers what the board privately uses to judge payments success. Each correct read adds +2; each misread subtracts 2. Skill fixes the outcome tier; the roll shades the result.
- Success: Your read of the room lands on 4 of 4 meeting decisions. You earn these discovery topics: Payments Attach, Payments Economics, Risk Posture, Exec Priorities. The rapport roll succeeds: the CEO volunteers one more — Competitive Landscape — and your SA earns the room's trust (SA Rapport).
  - Effects: Trust +12; Tech Cred +8; Exec Access +4; boon: SA Rapport; flag disc_attach; flag disc_economics; flag disc_risk; flag disc_exec; flag disc_competition
- Failure: Your read of the room lands on 0 of 4 meeting decisions. No discovery topic is earned from the questions. The rapport roll falls flat: polite answers, no extra confidences. The executives leave early.
  - Effects: Trust -3; Exec Access -3; mistake logged: Ran a discovery workshop and asked the wrong questions
- Lesson: Discovery is skill first, luck second: the right questions and the right priorities (skill) uncover topics no matter how the room feels; how far they open up (luck) only adds to it. Every topic uncovered is +2 on the rolls that depend on it; every topic missed is -2.
B. Send a discovery questionnaire ahead, then walk through the answers — Structured, efficient, a little impersonal.
- Outcome: The questionnaire comes back with useful facts on team and readiness. Some answers are vague.
  - Effects: Trust +4; Product Mastery +3; flag disc_economics
- Lesson: Async discovery is efficient but shallow. Discovery flag uncovered: Payments Economics.
C. Skip discovery — use the time for a product demo — Show them Connect, Capital, and Radar. Let the product sell itself.
- Outcome: The demo is slick. The executives nod politely and leave early. You learned nothing new.
  - Effects: Product Mastery +4; Exec Access -5; mistake logged: Skipped executive discovery for a demo
- Lesson: A demo in a discovery slot is a missed opportunity. Every roll ahead that needed these facts will be a guess.

## Chapter 2: Facilitate → Monetize: The First Gateway

How will payments first flow through FitStack? Rev share is the proven first step. White-labeling Connect before the kingdom is ready is a trap.

### The Board's Decree

Type: stage_transition. Encounter ID: f_decree.
Setup: The board demands payments monetization. The CEO saw a white-labeled Connect demo at a conference: "Gyms should never see the word Stripe." The CTO has questions.
Signals:
- GREEN: Board aligned on wanting payments revenue — strong executive sponsorship
- YELLOW: CEO fixated on white-labeling Connect from day one
- RED: No payments team, no support playbook, no risk or compliance owner
- YELLOW: White-label means FitStack owns merchant onboarding support, risk questions, and compliance conversations
- GREEN: 🔍 Your discovery: attach is the first win — most gyms process off-platform today Hidden until Payments Attach is discovered.
- RED: 🔍 Your discovery: no payments PM, no P&L owner — FitStack is not ready to white-label Connect Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Start with Standard Connect Rev Share — Stripe-hosted onboarding and dashboards. Revenue from day one, zero operational load on FitStack.
- Outcome: Standard Connect rev share launched. Stripe-hosted onboarding, Stripe-run support and risk. Revenue from day one — and FitStack's tiny team is free to sell.
  - Effects: +$50,000 revenue; Trust +10; Product Mastery +5; pricing → Rev Share; journey → Monetize
- Lesson: Rev share is where the journey begins. White-labeling and buy rate are destinations earned with readiness, not starting points.
B. White-label Connect from day one — FitStack-branded onboarding and payments, with FitStack owning support, risk, and compliance questions. Very hard without a payments team.
- Dice: d20 + Tech Cred bonus vs 17.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Ally bonuses when recruited: Solutions Architect +1, Professional Services +1.
- Success: Against every odd, the white-label launch holds — because your SA and ProServ practically live at FitStack for a quarter. Onboarding completion is 71%, support is strained, and the CTO has aged a year.
  - Effects: +$15,000 revenue; Trust -4; Tech Cred +6; Exec Access +4; pricing → Rev Share 2.0; journey → Monetize; flag whitelabel_early; mistake logged: White-labeled Connect before FitStack had a payments team
- Failure: White-label launched with no payments team. Gyms stall in verification, support drowns in payout questions, and the CTO is answering compliance emails at midnight.
  - Effects: −$35,000 revenue; Trust -15; Tech Cred -10; Exec Access -6; pricing → Rev Share; journey → Monetize; flag whitelabel_early; flag whitelabel_collapse; mistake logged: White-labeled Connect before FitStack was ready
- Lesson: Even when early white-labeling "works", it only works with heavy Stripe support and real cost to the platform. Readiness first.
C. Partner Gateway Only (Facilitate) — Let gyms bring their own gateway through a partner integration. No pricing risk — and no payments revenue.
- Outcome: Gyms can now bring their own gateway through a partner integration. Payments live inside FitStack — but FitStack earns nothing on it. A partner guild joins your cause.
  - Effects: +$10,000 revenue; Trust +5; Exec Access -3; journey → Facilitate; ally joins: Implementation Partner (SI / ISV); flag facilitate_only
- Lesson: Facilitate is a legitimate step on the journey: it gets payments into the product. But it monetizes nothing. Use it as a bridge to Monetize, not a destination.

### The Architecture Question

Type: technical. Encounter ID: f_technical.
Setup: The CTO asks detailed questions about Connect charge flows and pricing.
Signals:
- GREEN: CTO is engaged and asking technical questions — strong buying signal
- YELLOW: Questions are detailed — getting them wrong would erode credibility fast
- RED: You don't know the answer off the top of your head
Choices and outcomes:
A. Brief the SA with context and co-present — Share the CTO's concerns, merchant
- Outcome: You briefed the SA on the CTO's concerns, the merchant pain points, and the competitive threat. The SA arrived prepared and credible.
  - Effects: +$15,000 revenue; Trust +12; Tech Cred +10; Product Mastery +5; boon: SA Rapport
- Lesson: Your SA is a force multiplier when you brief them well.
B. Forward the Email to the SA — "Can you handle this?" Pass it to the expert.
- Outcome: The SA went in cold. Answered the technical questions competently but missed the real concerns. Credibility gap.
  - Effects: Trust -5; Tech Cred +3; Exec Access -3
- Lesson: Forwarding an email without context wastes the SA's time.
C. Try to answer it yourself — You've read the docs.
- Outcome: You spent 3 days deep in Connect documentation.
  - Effects: −$5,000 revenue; Product Mastery +5; Trust -10; Exec Access -12; mistake logged: Tried to solo a technical deep-dive, missed CFO QBR
- Lesson: Going solo on technical questions has a high opportunity cost.

## Chapter 3: Monetize: The Crucible

Revenue flows. The board says "buy rate." The investor says "buy rate." Are they ready?

### From Gateway to Gold

Type: stage_transition. Encounter ID: f_convert.
Availability: conditional. Appears after Partner Gateway Only established the Facilitate path.
Setup: The partner gateway works — but FitStack earns nothing on $12M of volume. The CFO notices.
Signals:
- GREEN: Payments already embedded in the product — merchants are used to it
- YELLOW: CFO asking why payments revenue is still zero
Choices and outcomes:
A. Move to Standard Connect Rev Share — Turn on monetization with zero pricing risk.
- Outcome: Standard Connect rev share live. Same embedded experience, now with revenue.
  - Effects: +$45,000 revenue; Trust +8; Product Mastery +5; pricing → Rev Share; journey → Monetize
- Lesson: Facilitate → Monetize is the natural next step once payments are embedded. Rev share monetizes with zero pricing risk.
B. Stay on the partner gateway — It works. Why change?
- Outcome: The gateway hums along for a quarter while FitStack earns nothing on payments. Then the CFO forces the issue and moves to Standard Connect rev share anyway — without you in the room.
  - Effects: +$10,000 revenue; Exec Access -8; Trust -3; pricing → Rev Share; journey → Monetize; mistake logged: Left the platform in Facilitate with no payments revenue
- Lesson: Facilitation without monetization leaves the platform's biggest revenue line on the table. Lead the move to Monetize; don't get dragged into it.
C. Jump straight to buy rate — If we're going to monetize, go big.
- Outcome: Buy rate with no team, no cost model, and a debit-heavy mix. Losses start within 60 days.
  - Effects: −$30,000 revenue; Trust -15; Tech Cred -8; pricing → Buy Rate (Blended); journey → Monetize; flag on_buyrate; flag premature_buyrate; mistake logged: Jumped from partner gateway straight to buy rate
- Lesson: Skipping from Facilitate to buy rate is the fastest route to a margin crisis.

### The Margin Crisis

Type: consequence. Encounter ID: f_margin_crisis.
Availability: conditional. Appears only after a premature buy-rate move.
Setup: 60 days into buy rate. Margin Reports show 25% of merchants underwater.
Signals:
- RED: 25% of merchants are margin-negative — bleeding money on every transaction
- RED: No cost model predicted rewards card interchange costs accurately
- RED: Board trust eroding — "you told us this would be profitable"
Choices and outcomes:
A. Emergency Segmented Pricing — Face the data. Triage merchants by profitability.
- Outcome: Emergency segmented pricing deployed.
  - Effects: −$10,000 revenue; Trust +5; Tech Cred +8; pricing → Segmented Pricing; boon: Margin Lens
- Lesson: After premature buy rate, margin monitoring is step one.
B. Revert to Rev Share — Admit the mistake.
- Outcome: Emergency board meeting called. "We're reverting to Rev Share.
  - Effects: −$40,000 revenue; Trust +4; Exec Access -8; Tech Cred -3; pricing reverts → Rev Share 2.0; flag reverted_from_buyrate; removes flag on_buyrate
- Lesson: Reverting from premature buy rate is painful but honest.
C. Raise all rates by 30 bps — Across-the-board increase to cover losses.
- Outcome: Raised all rates by 30 bps.
  - Effects: +$10,000 revenue; Trust -15; Exec Access -8; mistake logged: Blanket rate increase instead of segmenting
- Lesson: Blanket rate increases are the bluntest instrument.
D. Split model: new gyms on Rev Share 2.0, existing book stays on buy rate — Acknowledge the premature move without the overhead of unwinding it. Stop the bleeding on the front book; fix the back book over time.
- Outcome: New merchants onboard on Rev Share 2.0 from Monday; the existing book stays on buy rate while margin reports and segmentation fix it. The CFO calls it "the first adult decision in this project."
  - Effects: −$5,000 revenue; Trust +8; Tech Cred +4; Exec Access +2; flag split_model
- Lesson: Unwinding a premature buy rate is slow, public, and trust-expensive. A split model acknowledges the mistake, stops the bleeding on the front book, and buys time to fix the back book.

### The Onboarding Collapse

Type: consequence. Encounter ID: f_collapse.
Availability: conditional. Appears only after the early white-label launch failed.
Setup: White-label launched. Within six weeks: 40% of gyms stall in verification, FitStack support is buried in "why is my payout on hold?" tickets, and the CTO is fielding compliance questions nobody at FitStack can answer.
Signals:
- RED: Onboarding completion down to 58% — gyms give up mid-verification
- RED: Support backlog: 900 open tickets, no payments specialist on staff
- YELLOW: CEO still wants the brand promise kept
Choices and outcomes:
A. Retreat to Standard Connect: Stripe-hosted onboarding — Give the hard parts back to Stripe. Keep the brand on the dashboard, not the onboarding.
- Outcome: Stripe-hosted onboarding is back within two weeks. Completion jumps to 89%, the ticket queue drains, and the CEO keeps the FitStack brand on the dashboard. Rev share is live.
  - Effects: +$25,000 revenue; Trust +10; Exec Access +4; Tech Cred +3; pricing → Rev Share; flag retreated_whitelabel; removes flag whitelabel_collapse
- Lesson: Retreating to the proven path is not failure. Rev share with Stripe-hosted onboarding is where white-label readiness is built, not assumed.
B. Rebuild with the SA + ProServ — Embedded onboarding components, a support runbook, and a risk owner at FitStack. Expensive and slow.
- Dice: d20 + Tech Cred bonus vs 14.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Ally bonuses when recruited: Solutions Architect +2, Professional Services +3, Technical Account Manager +1.
- Success: ProServ rebuilds onboarding with embedded components, your SA writes the support runbook, and FitStack finally names a risk owner. Completion recovers to 80%. It cost a quarter.
  - Effects: +$5,000 revenue; Trust +6; Tech Cred +10; pricing → Rev Share 2.0; ally joins: Professional Services; removes flag whitelabel_collapse
- Failure: The rebuild stalls. ProServ delivers, but FitStack has nobody to own the runbook. Completion stays under 65% and 300 gyms move to a processor that onboards in minutes.
  - Effects: −$30,000 revenue; Trust -8; Tech Cred +2; Exec Access -6; pricing → Rev Share; mistake logged: Rebuilt white-label onboarding without a FitStack owner
- Lesson: White-label can be rescued — with ProServ, an SA, and a FitStack owner. The lesson stands: readiness should come first.
C. Push through — gyms will adapt — The brand matters more than a rough quarter.
- Outcome: Gyms do not adapt. 400 locations churn to a processor with 5-minute onboarding. The board asks why payments revenue is negative.
  - Effects: −$45,000 revenue; Trust -15; Exec Access -10; pricing → Rev Share; flag whitelabel_churn; removes flag whitelabel_collapse; mistake logged: Pushed through a collapsing white-label launch
- Lesson: Brand promises do not survive broken onboarding. Merchants leave platforms that make it hard to get paid.
Branch note: choosing Retreat to Standard Connect removes whitelabel_collapse and adds retreated_whitelabel. Because White-Label Dawn excludes retreated_whitelabel, the deterministic sequence continues from Onboarding Collapse directly to Conversion Forge; White-Label Dawn is not immediately re-offered.

### The White-Label Dawn

Type: stage_transition. Encounter ID: f_whitelabel.
Availability: conditional. Full gate: appears only while pricing is below Rev Share 2.0 (stage < 1.5), premature_buyrate is absent, and retreated_whitelabel is absent. After an early white-label failure is retreated, this encounter is not offered again.
Setup: Merchants see the Stripe brand on onboarding. Rev share is live and the kingdom is stable — now is the time to white-label and optimize.
Signals:
- GREEN: Merchants asking "why does it say Stripe, not FitStack?" our brand?"
- GREEN: Rev share capture rate is only 60% — significant room to grow
- YELLOW: CEO still asking about buy rate timeline — manage expectations carefully
Choices and outcomes:
A. Deploy Embedded Components — White-label everything.
- Outcome: Embedded Components deployed! FitStack brand everywhere.
  - Effects: +$35,000 revenue; Trust +12; Tech Cred +8; pricing → Rev Share 2.0
- Lesson: White-labeling via Embedded Components is a quick win.
B. Optimize Capture Rate First — Focus on getting more merchant volume through Connect.
- Outcome: Capture rate pushed from 60% to 82%.
  - Effects: +$40,000 revenue; Trust +8; Product Mastery +5; pricing → Rev Share 2.0
- Lesson: Sometimes the highest-ROI move is capturing existing volume.
C. Skip Ahead to Buy Rate — Why optimize rev share when you could own pricing?
- Availability: hidden until its prerequisite is met; requires absence of flag on_buyrate.
- Outcome: Skipped optimization, went straight to buy rate.
  - Effects: +$15,000 revenue; Trust -8; Tech Cred -5; pricing → Buy Rate (Blended); flag on_buyrate; flag skipped_optimization; mistake logged: Skipped Rev Share 2.0 optimization
- Lesson: Skipping stages has a real cost. Rev Share 2.

### The Conversion Forge

Type: opportunity. Encounter ID: f_conversion.
Setup: Rev share is live, but gym sign-up checkouts convert at 61%. Every abandoned membership is lost volume for FitStack and lost revenue for you. Monetize means maximizing conversion, not just rate.
Signals:
- YELLOW: Checkout is a home-built form with card-only, no wallets, no saved payment details
- GREEN: Members sign up on mobile — Link and wallets convert best here
- GREEN: 🔍 Your ledger study: debit-heavy memberships mean bank debits and wallets matter more than card rate Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Checkout + Link + payment methods for gym sign-ups — Stripe Checkout or Payment Element with Link, Apple Pay, Google Pay, and bank debits. Conversion first.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2, Professional Services +1.
- Success: Stripe Checkout with Link, wallets, and bank debits ships to every gym. Sign-up conversion climbs from 61% to 78%; volume through FitStack rises 22% without a single new gym.
  - Effects: +$40,000 revenue; Trust +10; Product Mastery +8; Tech Cred +4; flag conversion_win
- Failure: Checkout ships, but half the gyms keep the old form because nobody owns the rollout. Conversion lifts to 68% where it is live.
  - Effects: +$15,000 revenue; Trust +4; Product Mastery +4
- Lesson: Monetize is not just rate: it is Checkout, Link, and local payment methods maximizing conversion. More volume beats more basis points.
B. Optimize the rev share rate first — Negotiate a better split before touching the checkout.
- Outcome: You renegotiate the split by 8 bps. Conversion stays at 61%. The CFO is pleased; the gyms are not.
  - Effects: +$12,000 revenue; Trust +3; Exec Access +3
- Lesson: Rate optimization on unconverted volume is a small win. Conversion first, then rate.
C. Leave the checkout alone — It works. Gyms haven't complained.
- Outcome: The home-built form stays. Six months later a gym-software rival advertises "one-tap sign-up with Link" and FitStack's CEO asks why you never mentioned it.
  - Effects: Trust -6; Product Mastery -3; mistake logged: Ignored checkout conversion
- Lesson: If you do not raise conversion, a competitor will. Checkout and Link are part of the Monetize story.

### The Buy Rate Crucible

Type: boss. Encounter ID: f_crucible.
Availability: conditional. Appears only while FitStack is not on buy rate; this extraction gives the readiness option its actual conversion prerequisite.
Setup: THE moment. The board says it is time for buy rate. Are they ready?
Signals:
- GREEN: Volume growing 40% YoY — economics could work at this scale
- YELLOW: CEO says "we're ready" but can't explain interchange
- RED: No dedicated payments team — no product, sales, or ops ownership
- RED: No P&L owner for payments business — nobody is accountable for margin
- RED: "Can't we just charge 2.9% + 30 cents?" = no interchange understanding
- RED: 🔍 Your discovery: still no payments PM, no P&L owner, and a debit-heavy membership mix Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Green-Light Buy Rate — Push through. Deal with operational gaps later.
- Dice: d20 + Tech Cred bonus vs 16.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Professional Services +4, Solutions Architect +2.
- Boon bonuses when earned: Margin Lens +2.
- Success: Against the odds, buy rate works! But it required massive Stripe support to stabilize.
  - Effects: +$60,000 revenue; Trust +5; Tech Cred +5; pricing → Buy Rate (Blended); flag on_buyrate; flag buy_rate_ready
- Failure: Buy rate launched. Interchange losses on rewards cards within 30 days.
  - Effects: −$40,000 revenue; Trust -20; Tech Cred -10; Exec Access -8; pricing → Buy Rate (Blended); flag on_buyrate; flag premature_buyrate; mistake logged: Green-lit buy rate despite red flags
- Lesson: Even when buy rate technically works, the cost is high.
B. Run the Readiness Assessment — Mini-game: three readiness questions (team, cost model, risk ops) plus ranking the fixes. A perfect read on a ready platform is a green light; the candor roll only shades it.
- Dice: d20 + Tech Cred bonus vs 12.
- Purpose shown before roll: how candid the CTO is about the gaps.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Professional Services +3.
- Mini-game: The Three Readiness Questions. Buy rate means FitStack owns pricing, margin, and the 2am merchant call. Before you green-light anything, assess the three things that decide whether a platform is ready. Pick the honest read in each of three rounds, rank the fixes in the fourth, then roll for how much the team will admit. Skill decides the verdict.
- Round 1: 1. Team & ownership. Who owns the payments P&L once FitStack sets prices?
  - Alternative: "The CEO said they're ready — take their word for it." — Enthusiasm is not a P&L owner.
  - Correct: "Ask who owns payments margin and who answers merchant pricing questions at 2am." — "Nobody yet." Now the gap is named instead of assumed.
  - Alternative: "Stripe support covers merchants, so it doesn't matter." — On buy rate, the platform owns pricing questions. Stripe support won't explain FitStack's margin.
- Round 2: 2. Cost model. How should the pricing math be built?
  - Alternative: "Use the industry blended benchmark — it's close enough." — FitStack is $50 tickets and debit-heavy. Benchmarks hide exactly the fixed fees that sink margin.
  - Alternative: "Model credit interchange; debit is cheaper anyway." — Cheaper per transaction, but fixed network fees on small debit tickets are where buy rate goes negative.
  - Correct: "Build it on FitStack's actual mix: debit-heavy, small tickets, fixed network fees included." — The model shows 30% of transactions underwater at the proposed rate. Better to know now.
- Round 3: 3. Risk & operations. Who handles disputes, reserves, and onboarding support once FitStack owns pricing?
  - Correct: "Map the owners now: disputes, reserves, payout holds, and merchant onboarding support." — Two of four have no owner. Readiness has a to-do list instead of a vibe.
  - Alternative: "Radar handles fraud, so risk is covered." — Radar scores transactions. Someone still has to own disputes, reserves, and the merchant on hold.
  - Alternative: "Deal with it after launch." — That is how margin crises start.
- Round 4: 4. Sequencing. Rank what FitStack must fix first before buy rate can be approved.
  - Rank 1: Name a payments P&L owner. First. Nothing else sticks without someone accountable for margin.
  - Rank 2: Build the cost model on FitStack's real debit-heavy, small-ticket mix. Second. The owner needs a true model to price against.
  - Rank 3: Assign owners for disputes, reserves, and merchant onboarding support. Third. Operational ownership before pricing goes live.
  - Rank 4: Build margin reports and a pricing table FitStack can actually operate. Tooling comes after the owner and the model it serves.
  - Readiness-ranking rule: the top priority must be exact and no item may be more than one slot from its authored position. Owner, then model, then risk-ops owners, then tooling. Platforms that start with the pricing table and hope an owner appears are the ones that meet the goblins.
- Final roll: how candid the CTO is about the gaps. Each correct read adds +2; each misread subtracts 2. Skill fixes the outcome tier; the roll shades the result.
- Success: Green lights across the board. Every read and every priority was right: FitStack has a payments owner, a cost model on its real mix, and named risk ops. The team is fully candid. Buy rate approved — earned, not assumed.
  - Effects: +$45,000 revenue; Trust +14; Tech Cred +10; Exec Access +6; pricing → Buy Rate (Blended); flag on_buyrate; flag buy_rate_ready
- Failure: 0 of 4 reads were right. The assessment is inconclusive: you asked about the wrong things and the team told you what you wanted to hear. Nobody is wiser.
  - Effects: +$2,000 revenue; Trust +2; Tech Cred -2
- Lesson: The readiness questions — team & P&L owner, a cost model on the real mix, risk & ops ownership, and fixing them in the right order — decide buy rate. Skill decides the verdict; the team's candor only shades it. Answer honestly and you either earn the green light or save the platform from a margin crisis.
C. Recommend Holding at Rev Share 2.0 — The signals say not ready. Rev Share 2.0 is the right play.
- Outcome: Held at Rev Share 2.0. Sustainable, growing, risk-free revenue.
  - Effects: +$25,000 revenue; Trust +10; Product Mastery +5
- Lesson: Staying at a stage IS often the right call.

### Stabilizing the Empire

Type: stage_transition. Encounter ID: f_stabilize.
Availability: conditional. Appears only when FitStack is on buy rate or competitive buy rate.
Setup: You're on buy rate — whether you were ready or not.
Choices and outcomes:
A. Implement Margin Reports + Monitoring — Face the data. Know which merchants are profitable.
- Outcome: Margin Reports deployed. For the first time, the platform can see which merchants are profitable.
  - Effects: +$15,000 revenue; Trust +8; Tech Cred +10; Product Mastery +5; boon: Margin Lens
- Lesson: After going live on buy rate, Margin Reports are essential.
B. Hire a Payments PM — Finally get the P&L owner this platform desperately needs.
- Outcome: Payments PM hired. Three months to ramp, but now someone owns the P&L.
  - Effects: +$5,000 revenue; Trust +5; Exec Access +8
- Lesson: A dedicated Payments PM is the single most impactful hire.
C. Focus on Volume Growth — More volume fixes everything, right?
- Outcome: Focused on volume growth. More volume... on a margin-negative model.
  - Effects: −$15,000 revenue; Trust -12; Tech Cred -5; mistake logged: Scaled volume without fixing margin
- Lesson: More volume on a broken pricing model just scales losses.

## Chapter 4: Grow: The Attach Campaign

Every gym that processes on-platform is a victory. Now win the realm, merchant by merchant.

### The Pact of Mutual Success

Type: opportunity. Encounter ID: f_msap.
Setup: FitStack committed to embedded payments. Now 2,000 gyms need to actually go live — and the CEO has already moved on to the next initiative.
Signals:
- GREEN: Signed commitment and a motivated board
- YELLOW: No named FitStack owner for go-live milestones
- RED: Deals without an activation plan often stall before revenue activates
Choices and outcomes:
A. Co-build an MSAP with FitStack and bring in ProServ — Mutual Success & Activation Plan: owners, milestones, and dates on both sides. ProServ de-risks the launch.
- Outcome: The customer co-owns every milestone. ProServ joins to de-risk the build. Go-live dates are real now.
  - Effects: +$20,000 revenue; Trust +8; Tech Cred +6; ally joins: Professional Services; boon: Pact of Mutual Success
- Lesson: An MSAP (Mutual Success & Activation Plan) aligns both sides on owners, milestones, and dates. Co-building it creates customer ownership; ProServ de-risks complex launches. Pact of Mutual Success: +2 on activation, defend, and renewal rolls.
B. Draft the MSAP yourself and share it — Faster. Less buy-in.
- Outcome: Your MSAP is thorough. The customer skims it and says "looks great."
  - Effects: +$10,000 revenue; Trust +4; Product Mastery +3; boon: Pact of Mutual Success
- Lesson: A plan the customer didn't help write is a plan they don't own — but it's far better than none.
C. They signed — they'll figure out go-live — Move on to the next deal.
- Outcome: Three months later, activation is a fraction of plan. The revenue you forecast is still "pending go-live."
  - Effects: −$15,000 revenue; Trust -6; Exec Access -3; mistake logged: No activation plan after signature
- Lesson: Signed is not live. Without an activation plan, revenue slips and trust erodes.

### The Attach Campaign

Type: opportunity. Encounter ID: f_attach_campaign.
Setup: Only a fraction of FitStack's 2,000 gyms process on-platform. Every gym that switches is recurring revenue, richer data, and a stickier customer.
Signals:
- GREEN: Gyms want one system for memberships and payments
- YELLOW: Switching processors feels risky to small gym owners
- GREEN: 🔍 You measured it: attach is ~15%. 1,700 gyms still process elsewhere. Hidden until Payments Attach is discovered.
Choices and outcomes:
A. Launch an SPE growth workshop + embedded onboarding — Engage the Stripe Partner Ecosystem: growth workshop, co-marketing, and Connect embedded onboarding for gyms.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Attach (+2 each found, −2 each missing).
- Ally bonuses when recruited: Implementation Partner (SI / ISV) +2, Professional Services +1.
- Boon bonuses when earned: Pact of Mutual Success +2.
- Success: Attach climbs from ~15% to 58% in two quarters. The SPE growth workshop gives FitStack a merchant-facing playbook, and embedded onboarding makes switching painless. The board calls it "the payments win."
  - Effects: +$90,000 revenue; Trust +8; Product Mastery +8; Exec Access +4; journey → Grow; ally joins: Stripe Partner Ecosystem (SPE); flag attach_win
- Failure: Attach rises to 32%. The workshop helps, but onboarding friction slows gym owners down.
  - Effects: +$40,000 revenue; Trust +3; Product Mastery +4; journey → Grow; ally joins: Stripe Partner Ecosystem (SPE)
- Lesson: Payments attach is the key win for SaaS platforms. SPE growth workshops, embedded onboarding, and a clear merchant value proposition move attach faster than any pricing change.
B. Offer switching incentives: 90 days of waived fees — Buy attach with short-term credits.
- Outcome: Fee waivers spike attach to 35% — and a third of those gyms drift back when the waiver ends.
  - Effects: +$35,000 revenue; Trust +4; journey → Grow
- Lesson: Incentives buy short-term attach. Without onboarding and value, the volume doesn't stick.
C. Mandate integrated payments for all gyms — Make it a requirement in the next contract cycle.
- Outcome: Gym owners revolt. 120 locations cancel FitStack entirely rather than switch processors.
  - Effects: −$20,000 revenue; Trust -12; Exec Access -4; mistake logged: Forced a payments mandate on SMB merchants
- Lesson: Mandates can work at renewal with a strong value proposition — forcing them without onboarding drives churn.

### The First Harvest

Type: stage_transition. Encounter ID: f_harvest.
Setup: Attach is moving and rev share is generating real revenue. Gym owners are asking for more: recurring memberships, faster payouts, and a terminal at the front desk. Grow means incremental payments products.
Signals:
- GREEN: Memberships are recurring by nature — Billing is a natural fit
- GREEN: Merchants are cash-flow sensitive — payout speed matters most to them
- YELLOW: Front-desk payments still run on a legacy terminal
- YELLOW: Platform asks: "should we just go to buy rate now?"
- GREEN: 🔍 Your attach measurement: in-person front-desk volume is the biggest untapped pool Hidden until Payments Attach is discovered.
Choices and outcomes:
A. Billing for recurring memberships — Subscriptions, dunning, and failed-payment recovery for every gym. Recurring revenue on recurring revenue.
- Outcome: Billing launched for memberships. Failed-payment recovery alone saves gyms 4% of revenue a month, and every gym on Billing processes through FitStack.
  - Effects: +$50,000 revenue; Trust +12; Product Mastery +8; journey → Grow; boon: Recurring Ledger; flag product_attach_right
- Lesson: Billing is the Grow product that fits recurring businesses best: it raises attach, retention, and revenue at once.
B. Monetize Instant Payouts — Charge 50-100 bps on instant payouts.
- Outcome: Instant Payouts at 75 bps. 40% merchant adoption in 60 days.
  - Effects: +$45,000 revenue; Trust +10; Product Mastery +5; journey → Grow; boon: Speed Talisman; flag product_attach_right
- Lesson: Payout monetization is one of the fastest revenue paths.
C. Terminal for the front desk — Bring in-person volume onto FitStack with Stripe Terminal, installed by a partner.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Attach (+2 each found, −2 each missing).
- Ally bonuses when recruited: Implementation Partner (SI / ISV) +2, Professional Services +1.
- Success: Terminal readers land on 600 front desks in a quarter, installed by the partner guild. In-person volume through FitStack doubles.
  - Effects: +$55,000 revenue; Trust +10; Product Mastery +8; Tech Cred +4; journey → Grow; ally joins: Implementation Partner (SI / ISV); flag terminal_attach; flag product_attach_right
- Failure: Terminal pilots in 40 gyms; the rollout stalls on installation logistics and reader orders.
  - Effects: +$15,000 revenue; Trust +3; Product Mastery +4; flag product_attach_right
- Lesson: For platforms whose merchants sell in person, Terminal is a Grow product that unlocks the biggest attach pool.
D. Push to buy rate as the gateway to Instant Payouts and Capital — Treat owning pricing as the unlock for monetizing payouts and lending. Gym owners want more, so skip ahead and own the stack.
- Availability: hidden until its prerequisite is met; requires absence of flag on_buyrate.
- Outcome: Buy rate switches on as the supposed unlock for payouts and lending. Instant Payouts and Capital were available on rev share all along; what FitStack actually acquired is pricing risk with no team, no cost model, and interchange losses within 60 days.
  - Effects: −$25,000 revenue; Trust -15; Tech Cred -8; Exec Access -5; pricing → Buy Rate (Blended); flag on_buyrate; flag premature_buyrate; mistake logged: Pushed buy rate despite red flags
- Lesson: Grow products attach on any pricing model. Buy rate is a readiness decision, not a gateway to products, and the red flags (no payments team, no cost model) were still there.
E. Optimize the buy rate: margin reports + pricing review — You're on buy rate already. Make it healthy before growing on top of it.
- Availability: hidden until its prerequisite is met; requires flag on_buyrate.
- Outcome: Margin Reports go live and the pricing review finds two merchant segments underwater. Fixed in a week. The buy rate is finally healthy.
  - Effects: +$30,000 revenue; Trust +8; Tech Cred +8; boon: Margin Lens; flag buyrate_optimized
- Lesson: Once on buy rate, margin monitoring is step one — before any Grow product is built on top.

### The Chargeback Goblins

Type: crisis. Encounter ID: f_risk.
Setup: "Forgot to cancel" disputes and card-testing attacks are hitting FitStack's gyms. FitStack has no risk team. Which Radar plan — or Managed Risk — fits?
Signals:
- YELLOW: Dispute rate trending toward network monitoring thresholds
- RED: Gym owners are blaming FitStack for the losses
- GREEN: New Radar plans: Standard (included) → Plus → Pro, or Stripe Managed Risk
- YELLOW: 🔍 Your discovery: zero risk headcount and no appetite to build a risk operation Hidden until Risk Profile is discovered.
Choices and outcomes:
A. Radar Plus: custom rules and dynamic thresholds — Control and tuning. Someone at FitStack has to own the rules.
- Dice: d20 + Tech Cred bonus vs 11.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2, Technical Account Manager +2.
- Success: Radar Plus rules tuned with your SA and TAM. Card testing blocked, "forgot to cancel" disputes down 40%.
  - Effects: +$30,000 revenue; Tech Cred +8; Trust +5; journey → Grow; boon: Radar Ward; flag fraud_plus
- Failure: Radar Plus is live, but nobody at FitStack owns the rules. Disputes dip, then creep back.
  - Effects: +$10,000 revenue; Tech Cred +3; journey → Grow; boon: Radar Ward; flag fraud_plus
- Lesson: Radar Plus fits platforms that want control — custom rules and dynamic thresholds — and can manage account risk themselves.
B. Stripe Managed Risk (SMR) — Stripe takes on decisioning and liability for connected accounts. Higher fee, no risk team required.
- Outcome: Stripe Managed Risk live. Stripe takes on decisioning and liability for FitStack's gyms. Dispute losses stop being FitStack's problem.
  - Effects: +$40,000 revenue; Trust +10; Exec Access +4; journey → Grow; boon: Aegis of Managed Risk; flag managed_risk
- Lesson: SMR is a strategic choice, not a maturity reward: Stripe takes decisioning and liability for a higher fee. For a platform with zero risk headcount, it's often the right trade.
C. Radar Pro: Plus + account and customer abuse prevention — The most advanced protection: signup, free-trial, and bot abuse.
- Outcome: Radar Pro is live. Its account-abuse features go mostly unused — gyms don't face signup abuse.
  - Effects: +$15,000 revenue; Product Mastery +3; Trust -2; journey → Grow; boon: Radar Ward; flag radar_pro
- Lesson: Radar Pro adds account- and customer-abuse prevention (signup, free-trial, bot abuse). Match the plan to the fraud pattern: FitStack's problem was transaction disputes.
D. Stay on Radar Standard and hope it settles — Standard is already included.
- Outcome: Disputes keep climbing. Two gyms hit network monitoring thresholds; FitStack takes the blame.
  - Effects: −$25,000 revenue; Trust -8; Tech Cred -4; mistake logged: Ignored escalating dispute risk
- Lesson: Radar Standard is a baseline, not a strategy. When fraud escalates, choose Plus, Pro, or Managed Risk deliberately.

### The Interchange Wyrm

Type: consequence. Encounter ID: f_reckoning.
Availability: conditional. Appears only for unresolved premature buy rate below segmented pricing.
Setup: The goblins were a nuisance. This is a wyrm. Buy rate was switched on before FitStack was ready, and now something is gnawing at the margin every night: fixed network fees on $50 debit tickets, unpriced disputes, and a pricing table nobody owns. The CFO wants to know why payments revenue is shrinking while volume grows.
Signals:
- RED: 30% of transactions are underwater at the current rate
- RED: Nobody owns the payments P&L — the wyrm feeds unopposed
- YELLOW: Moving everyone back to rev share would mean repricing 2,000 gyms and a very public retreat
- GREEN: 🔍 Your ledger study: the losses are concentrated in small debit tickets — a segmentation problem, not a volume problem Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Forge the Margin Lens: margin reports + segmented pricing — See the wyrm before you fight it. Segment pricing by ticket size and rail, and name a P&L owner.
- Dice: d20 + Tech Cred bonus vs 12.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Professional Services +2, Solutions Architect +1.
- Boon bonuses when earned: Margin Lens +3.
- Success: Margin reports show the wyrm's lair: debit tickets under $30. Segmented pricing by rail and ticket size, plus a newly named P&L owner, turns the margin positive in a quarter.
  - Effects: +$20,000 revenue; Trust +10; Tech Cred +10; Exec Access +4; pricing → Segmented Pricing; boon: Margin Lens
- Failure: The reports land but nobody at FitStack owns the follow-through. Segmentation ships half-finished; the wyrm keeps feeding.
  - Effects: −$15,000 revenue; Trust +2; Tech Cred +4; boon: Margin Lens
- Lesson: Premature buy rate can be rescued — by seeing the margin and segmenting it. The lesson stands: readiness first.
B. Split model: new gyms on Rev Share 2.0, existing book stays on buy rate — Stop feeding the wyrm new volume. Fix the back book over time.
- Outcome: New gyms onboard on Rev Share 2.0; the back book stays on buy rate while margin reports fix it. The bleeding slows immediately.
  - Effects: −$5,000 revenue; Trust +8; Tech Cred +4; flag split_model
- Lesson: A split model is the honest, affordable response to a premature buy rate: stop the front-book losses, fix the back book over time.
C. Full retreat to rev share — Reprice every gym back to rev share. The honest move — and a very expensive, very public one.
- Outcome: Every gym is repriced back to rev share. The CFO respects the honesty; the board asks why Stripe let it happen. Two quarters of goodwill spent in a week.
  - Effects: −$40,000 revenue; Trust +4; Exec Access -8; Tech Cred -3; pricing reverts → Rev Share 2.0; flag reverted_from_buyrate; removes flag on_buyrate
- Lesson: Reverting is possible and honest — and it is slow, public, and trust-expensive. That cost is why readiness comes first.
D. Feed the wyrm: raise all rates 30 bps — Cover the losses with a blanket increase.
- Outcome: Rates go up 30 bps across the board. The small-ticket gyms — the ones losing money — leave for a competitor. The wyrm grows.
  - Effects: +$5,000 revenue; Trust -15; Exec Access -8; mistake logged: Blanket rate increase instead of fixing a premature buy rate
- Lesson: A blanket increase punishes the wrong merchants and accelerates churn. Segment or split; never feed the wyrm.

## Chapter 5: Retain: Beyond the Gateway (Embedded Financial Services)

The richest kingdoms earn gold beyond payments — lending, treasuries, and cards for their merchants.

### Beyond the Gateway

Type: opportunity. Encounter ID: f_obj4.
Setup: The board asks: "What's our next revenue line?" Gym owners need cash between membership cycles, a place to hold funds, and cards for equipment and supplies. Embedded financial services: monetize outside of payments.
Signals:
- GREEN: 55% of gyms eligible for Capital
- GREEN: Embedded finance lifts retention and valuation multiples
- GREEN: 🔍 Your discovery: cash flow between membership cycles is the #1 gym-owner pain Hidden until Merchant Needs is discovered.
Choices and outcomes:
A. Embedded finance bundle: Capital + Financial Accounts + Issuing cards — Lending, a place to hold funds, and spend cards — three new revenue lines.
- Dice: d20 + Product Mastery bonus vs 12.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Merchant Needs (+2 each found, −2 each missing).
- Ally bonuses when recruited: Stripe Partner Ecosystem (SPE) +2, Professional Services +1.
- Boon bonuses when earned: Merchant Loyalty Amulet +2.
- Success: Capital for gym owners, Financial Accounts to hold funds, and Issuing cards for equipment and supplies. FitStack has three new revenue lines.
  - Effects: +$110,000 revenue; Product Mastery +10; Trust +8; Exec Access +6; journey → Retain; boon: Treasury Keystone; flag obj4_bundle
- Failure: Only Capital launches this year — the bundle pitch didn't connect to a clear merchant pain.
  - Effects: +$45,000 revenue; Product Mastery +4; Trust +3; journey → Retain; boon: Merchant Loyalty Amulet
- Lesson: Embedded financial services — monetize outside of payments. Capital, Treasury/Financial Accounts, and Issuing create new revenue lines and make the platform far stickier. Lead with the merchant pain you discovered.
B. Start small: Capital only — The easiest embedded-finance entry point.
- Outcome: Capital launches. Zero credit risk for the platform, revenue from day one.
  - Effects: +$50,000 revenue; Trust +5; Product Mastery +3; journey → Retain; boon: Merchant Loyalty Amulet
- Lesson: Capital is the easiest embedded-finance entry point. Treasury and Issuing are the next step.
C. Not now — stay focused on payments — One thing at a time.
- Outcome: The board asks again next quarter: "What's our next revenue line?" You don't have an answer.
  - Effects: Product Mastery -3; Exec Access -4; mistake logged: Skipped embedded financial services: no revenue outside payments
- Lesson: Platforms that only monetize payments leave retention and valuation upside on the table. Embedded financial services are a core part of the journey.

## Chapter 6: Defend: The Siege

Success attracts rivals. A dark rider approaches the gates.

### The Rival's Shadow

Type: defend. Encounter ID: f_rival.
Setup: Adyen just pitched a buy-rate deal with "no minimums.
Signals:
- GREEN: 🔍 Your scouting: Adyen's "no minimums" offer requires FitStack to own risk, onboarding, and support Hidden until Competitive Landscape is discovered.
Choices and outcomes:
A. Counter with Value Narrative — Reframe around total value: Stripe ecosystem vs price.
- Dice: d20 + Product Mastery bonus vs 12.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Competitive Landscape (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2.
- Boon bonuses when earned: SA Rapport +2, Pact of Mutual Success +2, Treasury Keystone +1.
- Success: Value narrative crushed the Adyen pitch.
  - Effects: +$30,000 revenue; Trust +12; Product Mastery +5
- Failure: Value narrative didn't land.
  - Effects: +$5,000 revenue; Trust -5; Product Mastery +3
- Lesson: Never compete on price alone.
B. Counter with a Rev Share 2.0 optimization — Better split, white-label experience, conversion tooling — more value for FitStack without owning pricing risk.
- Availability: hidden until its prerequisite is met; requires absence of flag on_buyrate.
- Outcome: Rev Share 2.0 math won the day.
  - Effects: +$35,000 revenue; Trust +10; Product Mastery +8
- Lesson: Rev Share 2.0 + branch products often beats raw buy rate.
C. Competitive Buy Rate: Minimums at 25% Premium to Adyen — You just happen to note that this deal is SPIFF-eligible.
- Availability: hidden until its prerequisite is met; requires absence of flag on_buyrate.
- Outcome: Competitive buy rate deal signed with minimums at 25% premium to Adyen. SPIFF earned. But did you pull forward a transition the platform was not ready for?
  - Effects: +$55,000 revenue; Trust -8; Exec Access -5; Tech Cred -3; pricing → Buy Rate (Blended); flag on_buyrate; flag competitive_buyrate; mistake logged: SPIFF-aligned competitive buy rate may have rushed the transition
- Lesson: Competitive buy rate with minimums is strategically smarter than panic-matching. But when your SPIFF aligns with recommending buy rate, check your bias.
D. Hold the buy rate — defend on total value, not price — FitStack is already on buy rate. Show the margin data, products live, and the activation plan instead of cutting.
- Availability: hidden until its prerequisite is met; requires flag on_buyrate.
- Dice: d20 + Exec Access bonus vs 11.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Competitive Landscape (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +1.
- Boon bonuses when earned: Pact of Mutual Success +2, Margin Lens +2.
- Success: You bring the margin reports, the products live, and the MSAP to the board. Adyen's "no minimums" means FitStack owning risk and support. The board stays — at the current buy rate.
  - Effects: +$35,000 revenue; Trust +10; Exec Access +6; flag defended
- Failure: The board hears the value story but still asks for a concession. You hold the rate and trade a product roadmap commitment instead.
  - Effects: +$10,000 revenue; Trust +2; Exec Access -3; flag defended_partial
- Lesson: When you are already on buy rate, never defend with a cut. Defend with the value the platform is already getting.

## Chapter 7: The Grand Renewal

Everything culminates. Your guidance will define whether this kingdom thrives.

### The Renewal War Map

Type: opportunity. Encounter ID: f_renewal_prep.
Setup: Renewal is 60 days away. The board will ask one question: "What did payments actually do for us?"
Choices and outcomes:
A. Build the value case: attach %, revenue, products live, MSAP milestones — Quantify the value delivered before you ask for anything.
- Dice: d20 + Exec Access bonus vs 10.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Exec Priorities (+2 each found, −2 each missing).
- Boon bonuses when earned: Pact of Mutual Success +2.
- Success: Your war map lands: attach %, payments revenue, products live, and MSAP milestones hit. The CFO forwards it to the board unedited.
  - Effects: Exec Access +10; Trust +8; flag value_case
- Failure: The value case is solid but the numbers have gaps. Still, the board sees the trajectory.
  - Effects: Exec Access +4; Trust +3; flag value_case
- Lesson: Quantify value delivered before you ask for anything. Value case built: +20% at renewal.
B. Ask the SA and TAM for a technical health review — Solid, but technical rather than business value.
- Outcome: Uptime, integration health, and support stats look great. The CFO asks: "And the business impact?"
  - Effects: Tech Cred +8; Trust +4
- Lesson: Technical health matters, but renewals are won on business value.
C. Wing it — the relationship is strong — They like you. That's enough.
- Outcome: The board opens with "Why shouldn't we just ask Adyen for a quote?" You don't have numbers ready.
  - Effects: Exec Access -6; mistake logged: Walked into renewal without a value case
- Lesson: Without a value case, renewal becomes a price negotiation.

### The Grand Renewal

Type: finale. Encounter ID: f_renewal.
Setup: Contract renewal. The Grand Council convenes. Everything culminates here.
Choices and outcomes:
A. Rev Share 2.0 + Embedded Financial Services — Optimized rev share with Capital, Instant Payouts, Financial Accounts, and Issuing.
- Availability: requires absence of flag on_buyrate.
- Outcome: Rev Share 2.0 + embedded financial services bundle signed. FitStack earns on payments AND beyond payments.
  - Effects: +$90,000 revenue; Trust +15; Product Mastery +10
- Lesson: For a platform still building payments capability, optimized rev share plus embedded finance often beats a premature buy rate.
B. Buy Rate + Product Bundle — Lock in buy rate with Billing, Terminal, Instant Payouts, and embedded financial services.
- Availability: requires flag on_buyrate.
- Outcome: Buy rate + product bundle signed — but FitStack got to buy rate without ever proving readiness. The products carry the renewal; the pricing still needs a P&L owner.
  - Effects: +$80,000 revenue; Trust +6; Tech Cred +4; Exec Access +4
- Lesson: A buy rate reached by shortcut is fragile. Products and an activation plan make it survivable; readiness makes it strong.
C. Risk Expansion: Radar Plus → Pro + SMR for high-risk gyms — The new Radar plan structure as an expansion lever, with Managed Risk where FitStack wants Stripe to own liability.
- Availability: hidden until its prerequisite is met; requires flag disc_risk.
- Outcome: Risk expansion signed: Radar Plus for most gyms, Pro where account abuse appears, and Managed Risk for the highest-risk segment.
  - Effects: +$100,000 revenue; Trust +12; Tech Cred +10; Product Mastery +8
- Lesson: The new Radar plans (Standard → Plus → Pro) and Stripe Managed Risk are expansion levers. Position Plus vs. Pro vs. SMR from the risk discovery you did.
D. Rev Share Increase Only — Simple but leaves value on the table.
- Outcome: Rev share increase signed. Simple. Forgettable.
  - Effects: +$30,000 revenue; Trust +3; mistake logged: Rate-only renewal
- Lesson: A rate-only renewal leaves product value on the table.
E. Split model: front book on Rev Share 2.0, back book stays on buy rate + embedded financial services — Acknowledge buy rate came early without the overhead of unwinding it. New gyms on rev share; the existing book stays and gets fixed.
- Availability: hidden until its prerequisite is met; requires flag on_buyrate.
- Outcome: Front book to Rev Share 2.0, back book stays on buy rate with margin reports and embedded financial services. The board appreciates that you named the premature move instead of hiding it — and that you didn't ask them to reprice 2,000 gyms.
  - Effects: +$75,000 revenue; Trust +12; Tech Cred +6; Exec Access +6; flag split_model
- Lesson: When buy rate came too early, the honest renewal acknowledges it and limits complexity: rev share on the front book, fix the back book, products on both.

# 🏠 RentFlow — The Crossroads

Platform: Property management platform. Starts at Monetize · Rev Share 2.0 · Trust 40 / Tech Cred 40 / Exec Access 40 / Product Mastery 40. Authored chapters: 6. Authored encounters: 15, including 3 conditional encounters.

Briefing: RentFlow is a property management platform serving 500 properties across 3 countries. It has run on Stripe Connect for two years with an optimized rev share earning 55 bps, and volume is growing 40% a year. Rent is paid overwhelmingly by debit card and ACH. Debit interchange is capped at 1.1 to 1.4%, and 40% of volume moves on ACH, which follows entirely different economics. The margin on buy rate would be razor thin. Competitors are circling RentFlow, and Adyen has been courting the CFO. The Series C investor sees peers on buy rate claiming 180 bps, so they are asking, why not RentFlow? No one at RentFlow owns the payments P&L. Your challenge: decide whether buy rate is even the right destination. Property managers hold deposits, pay owners, and fund maintenance, money that never touches a card network. The real prize may sit outside payments entirely.

Flow: The Scouting Report → The Ledger of Rails → The Council of Stewards → The Crossroads → The Economics Question → The Margin Crisis* → The Buy Rate Crucible* → The Cost of Power* → Foreign Shores → The Pact of Mutual Success → The Merchant Uprising → The Rent Roll → The Vault of Deposits → The Adyen Gambit → The Grand Renewal. An asterisk marks a conditional encounter.

## Chapter 1: Discovery: The Ledger of Rails

Rent flows through strange rails — debit, ACH, deposits. Learn them before you price them.

### The Scouting Report

Type: discovery. Encounter ID: p_scout.
Setup: The investor has called a board session on "the buy rate question" next week. You have a few days to prepare.
Choices and outcomes:
A. Study Debit & ACH Economics — Durbin-regulated interchange, debit program fees, ACH pricing models.
- Outcome: You arrive fluent in the payment mix and interchange economics. Every pricing conversation ahead starts from facts.
  - Effects: Tech Cred +12; Product Mastery +10; flag disc_economics
- Lesson: Preparation turns a pitch into a diagnosis. Discovery flag uncovered: Payments Economics (+2 on dependent rolls).
B. Map the Boardroom — What the investor, CEO, and CFO are each measured on — and who really decides.
- Outcome: You know who decides, who influences, and what each executive is measured on.
  - Effects: Exec Access +12; Trust +6; flag disc_exec
- Lesson: Stakeholder mapping is discovery too. Discovery flag uncovered: Exec Priorities (+2 on dependent rolls).
C. Scout the Rival Banners — Who else is courting RentFlow, and what they're offering.
- Outcome: You know which rivals are circling and what they're offering.
  - Effects: Product Mastery +8; Tech Cred +4; flag disc_competition
- Lesson: Know the rival before the rival knows you. Discovery flag uncovered: Competitive Landscape (+2 when the competitor appears).

### The Ledger of Rails

Type: discovery. Encounter ID: p_ledger.
Setup: Your first working session with RentFlow's CFO. The investor's deck — "Competitors make 180 bps!" — is on the table.
Signals:
- YELLOW: Investor benchmarks come from other companies, not RentFlow data
- GREEN: CFO willing to open the books
- GREEN: 🔍 Your prep: Durbin caps regulated debit interchange — the spread math is very different here Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Measure payments attach: how much rent still moves outside RentFlow? — Find the volume and recurring rent flows the platform does not capture today.
- Outcome: Thirty percent of tenant rent still moves outside RentFlow, mostly through bank portals and checks. The unclaimed recurring volume is now measured before anyone debates its pricing.
  - Effects: Tech Cred +6; Product Mastery +8; flag disc_attach
- Lesson: Measure attach before monetization. The workshop that follows can test the rail economics without repeating this question. Discovery flag uncovered: Payments Attach.
B. Interview three property managers about their money flows — Deposits, owner payouts, maintenance — where does the money go, and where does it hurt?
- Outcome: Security deposits sit in a dozen bank accounts. Owner payouts are manual. Maintenance runs on personal cards.
  - Effects: Trust +10; Product Mastery +4; flag disc_obj4
- Lesson: Merchant interviews uncover the embedded-finance opportunity without duplicating the workshop's payment-mix question. Discovery flag uncovered: Merchant Needs.
C. Accept the investor's benchmarks and model buy rate — The board already believes them.
- Outcome: Your model mirrors the investor's deck. It looks great until someone checks the debit mix.
  - Effects: Exec Access +4; Trust -5; mistake logged: Modeled buy rate on someone else's payment mix
- Lesson: Never model a platform on someone else's payment mix.

### The Council of Stewards

Type: discovery. Encounter ID: p_council.
Setup: The CFO, CTO, and Head of Operations agree to a working session. The investor will hear the readout.
Choices and outcomes:
A. Run a joint discovery session with your SA — Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.
- Dice: d20 + Trust bonus vs 12.
- Purpose shown before roll: Executive rapport: whether the CFO will name the investor’s real objective with the investor listening.
- Discovery dependency: Exec Priorities (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2.
- Mini-game: The Council of Stewards. The CFO, CTO, Head of Operations, and investor each state what they are carrying. Use that conversation evidence in three diagnostic questions, then match each concern to the accountable executive. The final rapport roll may surface the investor’s unstated objective.
- Opening statements heard before round one:
  - CFO: “I will carry the payments P&L; the model has to reflect our actual debit and ACH mix.”
  - CTO: “Any rail change or migration has to fit the architecture and engineering capacity I manage.”
  - Head of Operations: “Deposit holds, ACH returns, and payout failures arrive in my team’s queue.”
  - Investor: “The 180 bps peer benchmark is my hurdle; I need a credible return case.”
- Round 1: The CFO slides over the investor’s benchmark deck: "Our peers earn 180 bps on buy rate. Why wouldn’t we?"
  - Correct: "Those peers are card-heavy. Can we pull RentFlow’s real mix — cards vs. debit vs. ACH — first?" — Rent is overwhelmingly ACH and debit. The 180 bps benchmark was never about RentFlow.
  - Alternative: "180 bps is achievable with the right tiering." — You just modeled buy rate on someone else’s payment mix.
  - Alternative: Ask what the investor’s timeline is — Timeline matters, but the mix decides whether buy rate works at all.
- Round 2: The CFO, carefully: "We’re evaluating options." You suspect a rival is in the building.
  - Alternative: Let it go — pressing would feel desperate — You leave not knowing Adyen has already presented.
  - Correct: "Who else are you talking to, and what have they promised?" — "Adyen. No minimums, and they’d white-label everything." Now you know the shape of the fight.
  - Alternative: Pitch Stripe’s reliability record — Defensive, and it tells you nothing about the rival’s offer.
- Round 3: Head of Operations: "Security deposits, holds, late fees, reserves — it’s all spreadsheets and a prayer."
  - Correct: "Who owns the call when a deposit hold or payout freeze hits?" — Three people, two banks, no reserve-policy owner. RentFlow’s operating risk is now on the table.
  - Alternative: "Treasury would fix that." — Probably helpful. But you pitched a Retain product before understanding the operating problem.
  - Alternative: Ask how many spreadsheets are involved — Useful process detail, but it misses ownership when money stops moving.
- Round 4: Based on what each person said, match each concern to the accountable executive.
  - Match Net margin on the debit/ACH-heavy mix → CFO. The CFO owns the payments P&L and the real unit economics.
  - Match Payment-rail architecture and migration effort → CTO. The CTO owns the technical path across cards, debit, and ACH.
  - Match Deposit holds, ACH returns, and payout operations → Head of Operations. The Head of Operations owns the workflow when money stops moving.
  - Match Growth benchmark and return thesis → Investor. The investor owns the 180 bps anchor and the expected growth return.
  - Matching rule: every concern must be assigned to its correct executive. Economics belongs with the CFO, architecture with the CTO, money movement with Operations, and the benchmark thesis with the investor.
- Final roll: Executive rapport: whether the CFO will name the investor’s real objective with the investor listening. Each correct read adds +2; each misread subtracts 2. Skill fixes the outcome tier; the roll shades the result.
- Success: Your read of the room lands on 4 of 4 meeting decisions. You earn these discovery topics: Payments Economics, Competitive Landscape, Risk Posture, Exec Priorities. The rapport roll succeeds: the CFO volunteers one more — Payments Attach — and your SA earns the room's trust (SA Rapport).
  - Effects: Trust +12; Tech Cred +8; Exec Access +4; boon: SA Rapport; flag disc_economics; flag disc_competition; flag disc_risk; flag disc_exec; flag disc_attach
- Failure: Your read of the room lands on 0 of 4 meeting decisions. No discovery topic is earned from the questions. The rapport roll falls flat: polite answers, no extra confidences. The executives leave early.
  - Effects: Trust -3; Exec Access -3; mistake logged: Ran a discovery workshop and asked the wrong questions
- Lesson: Discovery is skill first, luck second: the right questions and the right priorities (skill) uncover topics no matter how the room feels; how far they open up (luck) only adds to it. Every topic uncovered is +2 on the rolls that depend on it; every topic missed is -2.
B. Ask the CFO directly: "Who else are you talking to?" — One sharp question.
- Outcome: "Adyen. They offered a migration incentive." Now you know what you're up against.
  - Effects: Trust +3; Exec Access +4; flag disc_competition
- Lesson: Ask who else is in the deal. Discovery flag uncovered: Competitive Landscape.
C. Skip it — the investor already defined the problem — Buy rate. Move fast.
- Outcome: You run with the investor's framing. Everyone feels aligned — on the wrong problem.
  - Effects: Exec Access +3; Trust -5; mistake logged: Skipped discovery and accepted the investor's framing
- Lesson: Letting someone else define the problem is the most expensive discovery shortcut.

## Chapter 2: Monetize: The Crossroads

The realm stands at a fork. Buy rate or hold? Then price the rails and open new shores. Your discovery will be tested.

### The Crossroads

Type: stage_transition. Encounter ID: p_crossroads.
Setup: The investor is in the boardroom: "When are we going to buy rate?"
Signals:
- GREEN: Volume growing 40% YoY — strong trajectory for pricing power
- GREEN: Already on optimized Rev Share 2.0 earning 55 bps — solid foundation
- YELLOW: Debit-heavy payment mix: avg interchange only 1.1–1.4%. Razor-thin buy rate spread.
- YELLOW: 40% of rent payments are ACH — completely different economics than cards
- RED: No dedicated payments PM or team — critical operational gap
- RED: No one owns the payments P&L — accountability vacuum
- RED: Investor comparing to credit-heavy e-commerce competitors — apples to oranges
- GREEN: 🔍 Your mix analysis: under 10% credit — buy rate spread would be ~20-40 bps, not 180 Hidden until Payments Economics is discovered.
- GREEN: 🔍 The bigger prize: deposits, owner payouts, and maintenance spend never touch card interchange Hidden until Merchant Needs is discovered.
Choices and outcomes:
A. Pump the Brakes — Be honest: debit-heavy mix means buy rate math looks very different here.
- Outcome: You pumped the brakes. Showed the investor that debit interchange at 1.2% leaves almost no spread on buy rate. Trust increased.
  - Effects: +$30,000 revenue; Trust +15; Product Mastery +8; flag held_wisely
- Lesson: Being honest about payment mix economics builds more trust than speed.
B. Propose a Readiness Roadmap — Acknowledge the aspiration but lay out the readiness gaps and payment mix reality.
- Outcome: 6-month readiness roadmap: model debit/ACH economics, hire PM, understand Durbin caps. Buy rate earned, not assumed.
  - Effects: +$15,000 revenue; Trust +12; Exec Access +10; Tech Cred +5; flag readiness_roadmap
- Lesson: A readiness roadmap turns "no" into "not yet" — preserving the relationship.
C. Green-Light Buy Rate — The investor wants it, the CEO wants it. Give them what they want.
- Outcome: Green-lit buy rate on a debit-heavy mix. Interchange spread is pennies per transaction after fixed costs.
  - Effects: −$35,000 revenue; Trust -18; Tech Cred -8; Exec Access -10; pricing → Buy Rate (Blended); flag on_buyrate; flag premature_buyrate; mistake logged: Green-lit buy rate on debit-heavy payment mix
- Lesson: THE #1 MISTAKE for prop-tech: assuming credit-card economics apply to debit/ACH platforms.

### The Economics Question

Type: technical. Encounter ID: p_technical.
Setup: The CFO wants a detailed cost model: buy rate vs rev share on a debit/ACH mix.
Signals:
- GREEN: CFO engaging on economics — serious buying signal worth investing in
- YELLOW: Getting the debit math wrong would be catastrophic with this CFO's scrutiny
- RED: No one has modeled ACH economics alongside card buy rate before
Choices and outcomes:
A. Brief the SA with full context, co-present analysis — Share the CFO's specific questions, the debit-heavy mix data, and investor pressure.
- Outcome: You shared the debit-heavy payment mix, the ACH growth trend, and the Durbin implications. The SA delivered a masterclass on dual-rail economics.
  - Effects: +$15,000 revenue; Trust +10; Tech Cred +12; Product Mastery +5; boon: SA Rapport
- Lesson: Brief your SA with the customer's specific payment mix. Debit/ACH changes the entire analysis.
B. Ask the SA to "send over the buy rate deck" — They have a standard deck, right?
- Outcome: The SA sent the standard buy rate deck. Built for credit-heavy platforms. The CFO spotted the gap immediately.
  - Effects: Trust -5; Tech Cred +2; Exec Access -5
- Lesson: A generic deck built for credit-heavy platforms fails on debit/ACH platforms.
C. Build the cost model yourself — You know the economics well enough.
- Outcome: You spent a week building a cost model. Missed Durbin implications on debit and ACH fee structure entirely.
  - Effects: −$10,000 revenue; Tech Cred +3; Trust -12; Exec Access -10; mistake logged: Solo cost model with debit/ACH errors, missed investor meeting
- Lesson: Going solo on debit/ACH economics without expertise is the fastest way to lose credibility.

### The Margin Crisis

Type: consequence. Encounter ID: p_margin_crisis.
Availability: conditional. Appears whenever the historical premature-buy-rate flag is present.
Setup: 60 days into buy rate. The debit interchange spread is pennies per transaction.
Signals:
- RED: Debit interchange so low that per-transaction fixed costs eat the entire spread
- RED: ACH volume growing 15% QoQ but priced as an afterthought — effectively free
- RED: Investor now asking "who approved this without modeling the payment mix?"
Choices and outcomes:
A. Emergency segmented pricing + debit fee optimization — Separate card and ACH pricing. Optimize debit program fees.
- Outcome: Emergency dual-rail pricing. Separated card and ACH into distinct fee structures.
  - Effects: −$10,000 revenue; Trust +5; Tech Cred +8; pricing → Segmented Pricing; boon: Margin Lens
- Lesson: After premature buy rate on debit, dual-rail pricing is the critical first move.
B. Revert to Rev Share — Call an emergency board meeting.
- Outcome: Emergency board meeting. "The debit interchange math never worked. We're reverting to Rev Share."
  - Effects: −$45,000 revenue; Trust +4; Exec Access -8; Tech Cred -3; pricing reverts → Rev Share 2.0; flag reverted_from_buyrate; removes flag on_buyrate
- Lesson: Reverting from premature buy rate is painful but honest when the mix doesn't support it.
C. Raise all merchant rates to cover the gap — Cover the gap with a blanket increase.
- Outcome: Blanket rate increase. Merchants exploring ACH-only alternatives to avoid card fees entirely.
  - Effects: +$10,000 revenue; Trust -18; Exec Access -8; mistake logged: Rate increase accelerated ACH migration away from cards
- Lesson: Raising card rates on a platform where tenants can pay via ACH just accelerates ACH migration.
D. Split model: new properties on Rev Share 2.0, existing book stays on buy rate — Acknowledge the premature move without the overhead of unwinding it. Stop the bleeding on the front book; fix the back book over time.
- Outcome: New merchants onboard on Rev Share 2.0 from Monday; the existing book stays on buy rate while margin reports and segmentation fix it. The CFO calls it "the first adult decision in this project."
  - Effects: −$5,000 revenue; Trust +8; Tech Cred +4; Exec Access +2; flag split_model
- Lesson: Unwinding a premature buy rate is slow, public, and trust-expensive. A split model acknowledges the mistake, stops the bleeding on the front book, and buys time to fix the back book.

### The Buy Rate Crucible

Type: boss. Encounter ID: p_crucible.
Availability: conditional. Appears only while RentFlow is not on buy rate; the readiness option is shown with the real roadmap prerequisite present.
Setup: Six months later. Decision time. Is buy rate even right for this payment mix?
Signals:
- GREEN: Volume at $30M annual — scale exists if economics work
- YELLOW: CFO modeled buy rate on card volume only — ignores 40% ACH completely
- YELLOW: Debit program fees (network access, switch fees) eat into the thin interchange spread
- RED: Once you commit to buy rate on this mix, switching back is brutal
Choices and outcomes:
A. Green-Light Buy Rate — The signals are mixed but the investor is insistent.
- Dice: d20 + Tech Cred bonus vs 14.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +3, Professional Services +4, Solutions Architect +2.
- Boon bonuses when earned: Margin Lens +3.
- Success: Roadmap paid off. Team hired, debit cost model built, ACH priced separately. Buy rate works — barely.
  - Effects: +$70,000 revenue; Trust +10; Tech Cred +8; pricing → Buy Rate (Blended); flag on_buyrate; flag buy_rate_ready
- Failure: Buy rate launched. Debit interchange after Durbin caps and fixed fees: net negative on 30% of transactions.
  - Effects: −$40,000 revenue; Trust -20; Tech Cred -10; Exec Access -8; pricing → Buy Rate (Blended); flag on_buyrate; flag premature_buyrate; mistake logged: Buy rate without modeling debit economics
- Lesson: A readiness roadmap turned a potential disaster into a workable (if thin) buy rate.
B. Run the Readiness Assessment — Mini-game: three readiness questions (team, dual-rail cost model, risk ops) plus ranking the fixes. A perfect read on a ready platform is a green light; the candor roll only shades it.
- Dice: d20 + Tech Cred bonus vs 12.
- Purpose shown before roll: how candid the CFO is with the investor listening.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Professional Services +2.
- Mini-game: The Three Readiness Questions. Buy rate on a debit- and ACH-heavy platform is unforgiving. Assess the three things that decide readiness. Pick the honest read in each of three rounds, rank the fixes in the fourth, then roll for how much the CFO will admit in front of the investor. Skill decides the verdict.
- Round 1: 1. Team & ownership. Who owns the payments P&L once RentFlow sets prices?
  - Correct: "Ask who owns payments margin and who takes the call when a property manager's payout is held." — "Finance, sort of." Nobody owns it. Named, not assumed.
  - Alternative: "The investor will fund a team once revenue shows up." — Teams built after launch inherit the margin crisis.
  - Alternative: "Stripe handles merchant questions." — On buy rate, pricing questions belong to the platform.
- Round 2: 2. Cost model. What has to be in it?
  - Alternative: "Card interchange — that's where the margin is." — Cards are 30% of RentFlow's volume. The model ignores the rails that carry the rent.
  - Correct: "Separate debit (Durbin caps + fixed fees) and ACH (returns, NSF, per-item costs) — priced as different rails." — ACH is unpriced today and debit is thin. The dual-rail gap is visible before it costs money.
  - Alternative: "Use the investor's benchmark deck." — Someone else's payment mix. Again.
- Round 3: 3. Risk & operations. Deposits, holds, reserves, returns — who owns them?
  - Alternative: "Ops will figure it out." — Three people and a spreadsheet will not absorb buy-rate-scale returns and holds.
  - Correct: "Map owners for ACH returns, deposit holds, reserves, and onboarding support." — Reserves: nobody. Returns: a shared inbox. The list is the readiness plan.
  - Alternative: "Radar covers it." — Radar doesn't run reserve policy or answer the frozen-payout call.
- Round 4: 4. Sequencing. Rank what RentFlow must fix first before buy rate can be approved.
  - Rank 1: Name a payments P&L owner. First. Nobody fixes a margin nobody owns.
  - Rank 2: Price ACH per item and separate debit from credit. Second. Dual-rail pricing is the cost model for this platform.
  - Rank 3: Build a reserve policy and name owners for ACH returns and deposit holds. Third. Risk ops before pricing goes live on a returns-heavy rail.
  - Rank 4: Launch the investor's benchmark pricing tiers. Last — if at all. Benchmarks built on someone else's mix are how this story goes wrong.
  - Readiness-ranking rule: the top priority must be exact and no item may be more than one slot from its authored position. Owner, then dual-rail model, then risk-ops owners, then (maybe) tiers. The investor's deck is the last input, not the first.
- Final roll: how candid the CFO is with the investor listening. Each correct read adds +2; each misread subtracts 2. Skill fixes the outcome tier; the roll shades the result.
- Success: Green lights across the board. Every read and every priority was right: RentFlow has a payments owner, a cost model on its real mix, and named risk ops. The team is fully candid. Buy rate approved — earned, not assumed.
  - Effects: +$45,000 revenue; Trust +14; Tech Cred +10; Exec Access +6; pricing → Buy Rate (Blended); flag on_buyrate; flag buy_rate_ready
- Failure: 0 of 4 reads were right. The assessment is inconclusive: you asked about the wrong things and the team told you what you wanted to hear. Nobody is wiser.
  - Effects: +$2,000 revenue; Trust +2; Tech Cred -2
- Lesson: The readiness questions — team & P&L owner, a cost model on the real mix, risk & ops ownership, and fixing them in the right order — decide buy rate. Skill decides the verdict; the team's candor only shades it. Answer honestly and you either earn the green light or save the platform from a margin crisis.
C. Hold at Rev Share 2.0 — Buy rate may not be the right destination for debit-heavy platforms.
- Outcome: Held at Rev Share 2.0. Attached Treasury for escrow and Tax for compliance. Let Stripe manage the payment mix complexity.
  - Effects: +$30,000 revenue; Trust +10; Product Mastery +8; boon: Compliance Armor
- Lesson: For debit-heavy platforms, Rev Share 2.0 + product attach may outperform thin buy rate spreads.
Branch note: the extracted successful readiness result above uses readiness_roadmap, Tech Cred 65, and a perfect four-round assessment. Without the roadmap or Tech Cred 40, the same perfect assessment returns “not yet”; with one miss, buy rate waits; with two or more misses, the assessment is inconclusive.

### The Cost of Power

Type: stage_transition. Encounter ID: p_cost.
Availability: conditional. Runs only when premature_buyrate is absent. Dual pricing additionally requires on_buyrate; the rev-share/ACH option works on either state.
Setup: Living with your pricing choice. The payment mix is shifting under your feet.
Signals:
- YELLOW: ACH share growing to 45% — your card-only pricing model is leaking volume
- YELLOW: Merchants with high ACH percentage are effectively free-riders on card pricing
- RED: Debit interchange is capped — you cannot raise it. The only lever is product attach.
Choices and outcomes:
A. Implement Dual Pricing: Cards + ACH — Separate pricing for each payment rail. Face the data.
- Availability: requires flag on_buyrate.
- Outcome: Dual-rail pricing implemented. Cards and ACH priced separately. ACH merchants no longer free-riding.
  - Effects: +$35,000 revenue; Trust +8; Tech Cred +10; pricing → Segmented Pricing; boon: Margin Lens
- Lesson: On debit/ACH platforms, dual-rail pricing is non-negotiable after buy rate.
B. Optimize the Rev Share 2.0 split + price ACH separately — Keep Stripe carrying the card mix, negotiate a better split, and stop giving ACH away. Works on rev share or buy rate.
- Outcome: The rev share split improves 6 points and ACH finally carries a per-item price. Stripe keeps managing the card mix; RentFlow earns more on every rail.
  - Effects: +$30,000 revenue; Trust +6; Tech Cred +6; Product Mastery +4; flag ach_priced
- Lesson: On a debit/ACH-heavy platform, pricing the rails separately matters more than which pricing model you're on. Rev share can be optimized too.
C. Raise the Card Rate Across All Merchants — Simplest fix: charge everyone more on cards.
- Outcome: Raised card rates. Merchants accelerated ACH migration to avoid card fees. Card volume dropped 20%.
  - Effects: +$15,000 revenue; Trust -12; Exec Access -8; mistake logged: Rate increase accelerated payment mix shift to ACH
- Lesson: Raising card rates on a platform where ACH is an option just pushes volume off cards.

### Foreign Shores

Type: opportunity. Encounter ID: p_expansion.
Setup: The platform wants 3 new countries. Each has its own payment rails, local payment methods, tax rules, and identity requirements — conversion in a new market depends on getting those right before anyone talks about rate.
Signals:
- YELLOW: Checkout today is cards-only, in one currency
- GREEN: Tenants in the new markets pay rent by bank transfer and local wallets
- YELLOW: Each country adds tax registration and landlord verification requirements
- GREEN: 🔍 Your ledger study: in two of the three markets, cards are under 20% of rent payments Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Local payment methods + Tax + Identity, per market — Launch each country with the rails tenants actually use, tax handled, landlords verified. Conversion first.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2, Professional Services +1.
- Success: Each country launches with local bank debits and wallets, Stripe Tax registered, landlords verified with Identity. Rent conversion in the new markets matches the home market within a quarter.
  - Effects: +$45,000 revenue; Trust +10; Product Mastery +8; Tech Cred +4; boon: Compliance Armor; flag expansion_win
- Failure: Payment methods launch; tax registrations lag and one market goes live late. Conversion is good where it's live.
  - Effects: +$20,000 revenue; Trust +4; Product Mastery +4; boon: Compliance Armor
- Lesson: Monetize in new markets is a conversion problem: local payment methods, tax, and identity before rate. The platform earns on volume that actually converts.
B. Tax + Identity only — Compliance first; payment methods later.
- Outcome: Tax and Identity ship cleanly. Checkout stays cards-only; in two markets, most tenants can't pay the way they want and conversion stalls at 55%.
  - Effects: +$15,000 revenue; Trust +5; Product Mastery +2; boon: Compliance Armor
- Lesson: Compliance is necessary, not sufficient. Local payment methods are what convert.
C. Cards only — same checkout everywhere — Ship fast, localize later.
- Outcome: The same cards-only checkout ships everywhere. Conversion in the new markets is half the home market; a local rival launches with bank transfers and wins the biggest property group.
  - Effects: +$5,000 revenue; Trust -5; Product Mastery -3; mistake logged: Launched new markets without local payment methods
- Lesson: Cards-only in bank-transfer markets is leaving conversion — and volume — on the table.

## Chapter 3: Grow: The Churn Playbook

A churn threat is a playbook, not a panic. Diagnose, fix with Grow products, and track the plan.

### The Pact of Mutual Success

Type: opportunity. Encounter ID: p_msap.
Setup: Whatever pricing path RentFlow chose, change is coming: new pricing, ACH flows, and international expansion. The CFO and CTO need one shared plan.
Signals:
- YELLOW: No dedicated payments team to drive milestones
- GREEN: CFO and CTO both engaged after the Crossroads decision
Choices and outcomes:
A. Co-build an MSAP with the CFO + CTO and bring in ProServ — Owners, milestones, and dates on both sides. ProServ covers the ACH and multi-country build.
- Outcome: The customer co-owns every milestone. ProServ joins to de-risk the build. Go-live dates are real now.
  - Effects: +$20,000 revenue; Trust +8; Tech Cred +6; ally joins: Professional Services; boon: Pact of Mutual Success
- Lesson: An MSAP (Mutual Success & Activation Plan) aligns both sides on owners, milestones, and dates. Co-building it creates customer ownership; ProServ de-risks complex launches. Pact of Mutual Success: +2 on activation, defend, and renewal rolls.
B. Draft the MSAP yourself and share it — Faster. Less buy-in.
- Outcome: Your MSAP is thorough. The customer skims it and says "looks great."
  - Effects: +$10,000 revenue; Trust +4; Product Mastery +3; boon: Pact of Mutual Success
- Lesson: A plan the customer didn't help write is a plan they don't own — but it's far better than none.
C. Skip the plan — they know what to do — Trust the customer.
- Outcome: Three months later, activation is a fraction of plan. The revenue you forecast is still "pending go-live."
  - Effects: −$15,000 revenue; Trust -6; Exec Access -3; mistake logged: No activation plan after signature
- Lesson: Signed is not live. Without an activation plan, revenue slips and trust erodes.

### The Merchant Uprising

Type: crisis. Encounter ID: p_uprising.
Setup: 15% merchant churn in one quarter. Tenants want ACH autopay, property managers say payouts are slow, and the support queue is on fire. A clear churn threat — which playbook fits?
Signals:
- RED: 15% churn in a quarter, concentrated in mid-size property managers
- YELLOW: Two separate complaints hiding under one churn number
- GREEN: 🔍 Your interviews: owner payouts and deposit handling are the real pain — not price Hidden until Merchant Needs is discovered.
Choices and outcomes:
A. Run the churn playbook: business review → Grow products → MSAP milestones — Diagnose the two causes, fix them with Instant Payouts and Billing autopay, and track recovery with the TAM against the MSAP.
- Dice: d20 + Trust bonus vs 11.
- Purpose shown before roll: whether this Trust approach succeeds.
- Discovery dependency: Merchant Needs (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +1.
- Boon bonuses when earned: Pact of Mutual Success +2.
- Success: Business review splits the churn: payout speed for owners, ACH autopay for tenants. Instant Payouts and Billing fix both; the TAM tracks recovery weekly against the MSAP. Churn back to 4% in two quarters.
  - Effects: +$45,000 revenue; Trust +14; Tech Cred +5; Exec Access +5; journey → Grow; boon: Speed Talisman; flag churn_contained
- Failure: The review lands but the fixes slip — RentFlow has no owner for the Billing migration. Churn slows to 9%.
  - Effects: +$15,000 revenue; Trust +6; Exec Access +2; flag churn_contained
- Lesson: A churn threat is a playbook, not a panic: diagnose, fix with Grow products, and measure against the plan.
B. Run a business review only — Diagnose first. Decide on fixes next quarter.
- Outcome: The business review is excellent: two causes, clearly separated, beautifully charted. Fixes are "next quarter." Another 5% churns while the deck circulates.
  - Effects: +$5,000 revenue; Trust +6; Exec Access +3; mistake logged: Diagnosed churn without fixing it
- Lesson: Diagnosis without a fix is a report, not a playbook. Pair the review with Grow products and a plan.
C. Offer merchant credits — Three months of fee credits to anyone threatening to leave.
- Outcome: Credits slow the exits for a quarter. Then the credits end and the churn resumes — now with a lower price baked in.
  - Effects: −$10,000 revenue; Trust -8; Exec Access -5; mistake logged: Applied band-aid to structural problem
- Lesson: Credits treat the symptom and permanently lower the price. Structural churn needs structural fixes.

### The Rent Roll

Type: opportunity. Encounter ID: p_rentroll.
Setup: Rent is the most recurring payment in the kingdom — and RentFlow still collects it with one-off charges. Owners wait days for payouts. Grow means incremental payments products.
Signals:
- GREEN: Monthly rent + autopay = Billing's natural habitat
- GREEN: Owners would pay for same-day payouts
- GREEN: 🔍 Your ledger: ACH rent runs on recurring mandates — Billing handles retries and failed payments Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Billing for recurring rent + Instant Payouts for owners — Autopay with retries and dunning for tenants; same-day payouts for owners, monetized.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Attach, Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Professional Services +2, Solutions Architect +1.
- Boon bonuses when earned: Pact of Mutual Success +1.
- Success: Autopay through Billing covers 70% of tenants in a quarter; failed-rent recovery lifts collections 3%. Owners pay for same-day payouts. Two new revenue lines on existing volume.
  - Effects: +$55,000 revenue; Trust +12; Product Mastery +8; journey → Grow; boon: Speed Talisman; flag product_attach_right; flag rentroll_win
- Failure: Instant Payouts launch cleanly; the Billing migration stalls on legacy lease data. Half the value, twice the meetings.
  - Effects: +$20,000 revenue; Trust +4; Product Mastery +4; boon: Speed Talisman; flag product_attach_right
- Lesson: Grow products on a recurring business: Billing for collection, Instant Payouts for the people waiting on the money.
B. Instant Payouts only — Fast revenue, no billing migration.
- Outcome: Instant Payouts at 1%. 35% of owners opt in within 60 days.
  - Effects: +$30,000 revenue; Trust +8; boon: Speed Talisman; flag product_attach_right
- Lesson: Fast revenue, but rent collection stays manual. Billing is the bigger prize.
C. Not now — the pricing change is enough — One transformation at a time.
- Outcome: Rent keeps flowing on one-off charges. A property-management rival launches autopay with recovery and wins two of RentFlow's largest customers.
  - Effects: Trust -5; Product Mastery -3; mistake logged: Left recurring rent unoptimized
- Lesson: Grow products are competitive defenses too. Recurring payments without Billing is an opening for rivals.

## Chapter 4: Retain: The Vault (Embedded Financial Services)

Deposits, owner payouts, maintenance spend — gold that never touches a card network.

### The Vault of Deposits

Type: opportunity. Encounter ID: p_obj4.
Setup: Property managers hold millions in security deposits across dozens of bank accounts, pay owners manually, and run maintenance on personal cards. Embedded financial services: monetize outside of payments.
Signals:
- GREEN: This money never touches card interchange — no Durbin cap on this revenue
- YELLOW: Requires compliance and multi-country thinking
- GREEN: 🔍 Your interviews: deposits and owner payouts are the #1 operational headache Hidden until Merchant Needs is discovered.
Choices and outcomes:
A. Financial Accounts for deposits + Issuing for maintenance + Capital — Hold deposits, fund maintenance cards, and lend to property managers.
- Dice: d20 + Product Mastery bonus vs 12.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Merchant Needs (+2 each found, −2 each missing).
- Ally bonuses when recruited: Professional Services +2, Stripe Partner Ecosystem (SPE) +1.
- Boon bonuses when earned: Compliance Armor +2.
- Success: Deposits move into Financial Accounts, maintenance runs on Issuing cards, and Capital funds property managers. RentFlow earns on money that never touches card interchange.
  - Effects: +$120,000 revenue; Product Mastery +10; Trust +8; Exec Access +5; journey → Retain; boon: Treasury Keystone; flag obj4_bundle
- Failure: Financial Accounts launch for deposits, but compliance reviews delay Issuing and Capital.
  - Effects: +$50,000 revenue; Product Mastery +4; Trust +3; journey → Retain; boon: Treasury Keystone
- Lesson: For debit- and ACH-heavy platforms, embedded financial services are often bigger than buy rate. Monetize outside of payments where the Durbin cap doesn't apply.
B. Capital for property managers only — Start with lending.
- Outcome: Capital launches for property managers. Revenue from day one, zero credit risk.
  - Effects: +$45,000 revenue; Trust +5; Product Mastery +3; journey → Retain; boon: Merchant Loyalty Amulet
- Lesson: Capital is a strong embedded-finance entry point. Deposits and spend are the bigger prize.
C. Squeeze more from ACH pricing instead — Stay inside payments.
- Outcome: ACH pricing nudged up a few cents. Merchants grumble. The deposit vault sits untouched.
  - Effects: +$15,000 revenue; Trust -4; mistake logged: Chased thin ACH margin instead of embedded financial services
- Lesson: On a debit/ACH platform, payment-margin optimization has a hard ceiling. Embedded financial services don't.

## Chapter 5: Defend: The Adyen Gambit

A rival kingdom sends envoys with gold and promises. Will RentFlow stay?

### The Adyen Gambit

Type: defend. Encounter ID: p_adyen.
Setup: Adyen offers RentFlow a buy rate with "no minimums" and a $250K migration incentive. The CFO forwards it to you: "Convince me to stay."
Signals:
- YELLOW: CFO is genuinely tempted by the migration incentive
- RED: The investor is amplifying the Adyen pitch to the board
- GREEN: 🔍 Your scouting: Adyen's offer assumes RentFlow takes on risk, onboarding, and compliance it isn't staffed for Hidden until Competitive Landscape is discovered.
- GREEN: 🔍 Your mix analysis: on a debit/ACH mix, Adyen's buy rate spread is thinner than RentFlow's rev share today Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Competitive value narrative: total platform value, not rate — Real payment-mix economics, switching cost, embedded financial services, and the activation plan.
- Dice: d20 + Product Mastery bonus vs 13.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Competitive Landscape, Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2, Technical Account Manager +1, Implementation Partner (SI / ISV) +2.
- Boon bonuses when earned: Pact of Mutual Success +2, Treasury Keystone +2, Compliance Armor +1.
- Success: You walk the CFO through the real math: on RentFlow's debit/ACH mix, Adyen's spread is thinner than today's rev share, and the offer hands RentFlow risk, onboarding, and compliance it is not staffed for. Embedded financial services and the MSAP seal it. The CFO closes the comparison: "No minimums" does not mean no obligations. RentFlow stays.
  - Effects: +$80,000 revenue; Trust +12; Exec Access +8; Product Mastery +5; flag defended
- Failure: Your narrative is solid but generic. RentFlow moves 30% of volume to Adyen "as a test."
  - Effects: −$40,000 revenue; Trust -4; Exec Access -3; flag dual_process
- Lesson: Defend against Adyen with total value: payment-mix economics, switching cost, embedded financial services, and the activation plan. Discovery is your weapon — generic value pitches lose to a migration incentive.
B. Rally the Guild: Partner + ProServ switching-cost analysis — Show exactly what a migration would cost RentFlow in engineering time and risk.
- Outcome: The Guildmaster and ProServ price the migration: 9 months of engineering and new risk and compliance obligations. The CFO pauses the Adyen evaluation.
  - Effects: +$30,000 revenue; Tech Cred +6; Trust +5; ally joins: Implementation Partner (SI / ISV); flag defended_partial
- Lesson: Switching-cost analysis with partners is a powerful defense. Pair it with a value story to win, not just delay.
C. Match Adyen's pricing — Neutralize the offer.
- Outcome: You match Adyen's rate. RentFlow stays — at a margin that wipes out a year of growth.
  - Effects: −$60,000 revenue; Trust +2; Exec Access -4; mistake logged: Panic-matched competitor pricing
- Lesson: Never compete on price alone. Matching teaches the customer that every renewal is a rate negotiation.
D. Dismiss it — they'd never leave — Two years on Stripe. Too sticky to move.
- Outcome: Six weeks later, RentFlow migrates its two largest countries to Adyen.
  - Effects: −$120,000 revenue; Trust -15; Exec Access -10; flag churned_partial; mistake logged: Ignored a live competitive threat
- Lesson: A live competitive threat is never "nothing." Engage early with discovery-backed value.

## Chapter 6: The Grand Renewal

Contract renewal. Everything you've built converges here.

### The Grand Renewal

Type: finale. Encounter ID: p_renewal.
Setup: Contract renewal. The debit/ACH mix makes this unlike any other negotiation.
Choices and outcomes:
A. Buy Rate + Dual-Rail Pricing + Embedded Financial Services — Separate card and ACH economics with Financial Accounts, Issuing, and Tax.
- Availability: requires flag on_buyrate.
- Outcome: Buy rate + dual-rail + embedded financial services signed — on a buy rate RentFlow never proved it was ready for. Dual-rail pricing saves the margin; the products save the renewal.
  - Effects: +$75,000 revenue; Trust +6; Tech Cred +6
- Lesson: On debit/ACH, a shortcut buy rate survives only with dual-rail pricing and product depth.
B. Rev Share 2.0 + Embedded Financial Services — Optimized rev share with Financial Accounts, Issuing, Capital, and Tax. Let Stripe manage the card mix.
- Availability: requires absence of flag on_buyrate.
- Outcome: Rev Share 2.0 + embedded financial services suite signed. Stripe manages the card mix; RentFlow earns on deposits, spend, and lending.
  - Effects: +$105,000 revenue; Trust +15; Product Mastery +10
- Lesson: On a debit- and ACH-heavy mix, optimized rev share plus embedded financial services often beats buy rate.
C. Risk Expansion: Radar Plus + SMR for high-risk properties — The new Radar plans as an expansion lever, with Managed Risk where RentFlow wants Stripe to own liability.
- Availability: hidden until its prerequisite is met; requires flag disc_risk.
- Outcome: Risk expansion signed: Radar Plus across the portfolio and Managed Risk for the properties with the highest fraud exposure.
  - Effects: +$95,000 revenue; Trust +12; Tech Cred +10; Product Mastery +6
- Lesson: Platforms usually weigh Radar Plus vs. Pro vs. SMR. Position from the risk discovery you did.
D. Increase Rev Share Only — Simple. Leaves embedded financial services on the table.
- Outcome: Rev share increase signed. The deposit vault stays untouched.
  - Effects: +$30,000 revenue; Trust +3; mistake logged: Rate-only renewal
- Lesson: A rate-only renewal ignores the biggest prize on this platform.
E. Split model: front book on Rev Share 2.0, back book stays on buy rate + embedded financial services — Acknowledge buy rate came early without the overhead of unwinding it. New properties on rev share; the existing book stays and gets fixed with dual-rail pricing.
- Availability: hidden until its prerequisite is met; requires flag on_buyrate.
- Outcome: New properties onboard on Rev Share 2.0; the existing book stays on buy rate with dual-rail pricing and embedded financial services. The investor hears an honest plan instead of a retreat.
  - Effects: +$80,000 revenue; Trust +12; Tech Cred +6; Exec Access +6; flag split_model
- Lesson: When buy rate came too early on a debit/ACH platform, the honest renewal acknowledges it and limits complexity: rev share on the front book, dual-rail pricing to fix the back book, products on both.
Branch note: all five choices are documented here, but the live UI filters them by the availability rules in the RentFlow tree above. Renewal revenue then applies the listed helper and renewal modifiers.

# 🍕 OrderOS — The Empire

Platform: Restaurant POS + online ordering platform. Starts at Monetize · Buy Rate (Blended) · Trust 40 / Tech Cred 40 / Exec Access 40 / Product Mastery 40. Authored chapters: 5. Authored encounters: 16.

Briefing: OrderOS is a restaurant POS and online ordering platform: 45,000 restaurants plus ghost kitchens and food halls, $950M in annual processing volume, and a blended buy rate that has been live for 18 months. At this scale every basis point is worth millions, and the margin reports are not kind. Twenty percent of merchants are underwater because a flat rate ignores rewards cards, cross-border tourist transactions, and card mix. Engineering says custom pricing logic would take two quarters. The 50 largest restaurant groups, 30% of volume, want interchange passthrough pricing. A risk team of three people is drowning in disputes. The COO asks whether to hire five more people or find a smarter way. Your challenge: fix the margin, serve the enterprise groups, and tame the fraud without adding headcount. At nearly $1B in volume, every decision ripples across the industry.

Flow: The Scouting Report → The Imperial Audit → The Emperor's Council → The Emperor's Burden → The Architecture Deep-Dive → The Front Door → The War Council → The Enterprise Ultimatum → The Pact for the Rollout → The Fraud Dragon → The Omnichannel Frontier → The Champion's Departure → The Scale Crucible → The Imperial Treasury → The Competitor Raid → The Grand Renewal. An asterisk marks a conditional encounter.

## Chapter 1: Discovery: The Imperial Audit

The empire is vast but bleeding gold. Before you prescribe, audit the realm.

### The Scouting Report

Type: discovery. Encounter ID: r_scout.
Setup: Eighteen months on the account — but the empire has changed. Before the quarterly business review, you prepare.
Choices and outcomes:
A. Study IC++ and Card-Mix Economics — Interchange variance, rewards cards, cross-border, statement generation.
- Outcome: You arrive fluent in the payment mix and interchange economics. Every pricing conversation ahead starts from facts.
  - Effects: Tech Cred +12; Product Mastery +10; flag disc_economics
- Lesson: Preparation turns a pitch into a diagnosis. Discovery flag uncovered: Payments Economics (+2 on dependent rolls).
B. Map the Imperial Court — COO, CFO, CRO, and Head of Risk: the pressures each brings to the QBR.
- Outcome: You know who decides, who influences, and what each executive is measured on.
  - Effects: Exec Access +12; Trust +6; flag disc_exec
- Lesson: Stakeholder mapping is discovery too. Discovery flag uncovered: Exec Priorities (+2 on dependent rolls).
C. Scout the Rival Banners — Who is courting OrderOS's largest restaurant groups.
- Outcome: You know which rivals are circling and what they're offering.
  - Effects: Product Mastery +8; Tech Cred +4; flag disc_competition
- Lesson: Know the rival before the rival knows you. Discovery flag uncovered: Competitive Landscape (+2 when the competitor appears).

### The Imperial Audit

Type: discovery. Encounter ID: r_audit.
Setup: You have one day on site at OrderOS HQ. Where do you spend it?
Signals:
- GREEN: Leadership open to an honest audit
- YELLOW: Everyone assumes you already know the account
Choices and outcomes:
A. Audit margin reports and card-mix economics — Find where rewards cards, cross-border traffic, and flat pricing create losses.
- Outcome: Tourist-area restaurants run far more rewards and cross-border cards than suburban locations. The flat rate hides the loss concentration.
  - Effects: Tech Cred +8; Product Mastery +6; flag disc_economics
- Lesson: Audit the real cost drivers before changing price. The council can then measure attach without repeating this work. Discovery flag uncovered: Payments Economics.
B. Compare the decision criteria for the next QBR — Surface the margin, attach, risk-capacity, and merchant-operating tensions the room must resolve without pre-assigning owners.
- Outcome: The QBR criteria are clear: sustainable margin, in-store attach growth, fraud-team capacity, and merchant cash flow all need decisions. You have the agenda, but the executives still need to state what they will carry in the council.
  - Effects: Exec Access +9; Trust +4; flag disc_exec
- Lesson: Decision-criteria prep identifies the tensions without leaking the later owner-match answer. Discovery flag uncovered: Exec Priorities.
C. Review competitor activity in the top 50 restaurant groups — Find which groups are being courted and what rivals are promising.
- Outcome: Adyen is courting twelve of the top fifty groups with IC++ and a one-year rate lock. The threat is specific now.
  - Effects: Product Mastery +6; Exec Access +4; flag disc_competition
- Lesson: Know which competitor is in which room before the renewal becomes a surprise. Discovery flag uncovered: Competitive Landscape.
D. Skip the audit — you've been on this account 18 months — You know this empire.
- Outcome: You skip the audit. The QBR goes fine — and you miss what changed in the last six months.
  - Effects: Exec Access +2; Trust -5; mistake logged: Assumed account knowledge replaces discovery
- Lesson: Account tenure is not discovery. Empires change.

### The Emperor's Council

Type: discovery. Encounter ID: r_council.
Setup: The COO grants you the executive staff meeting. Thirty minutes. Make it count.
Choices and outcomes:
A. Facilitate an executive discovery session with your SA — Mini-game: three questions plus matching each concern to its owning executive, then an executive-rapport roll. Uncover only the topics you earn.
- Dice: d20 + Exec Access bonus vs 12.
- Purpose shown before roll: Executive rapport: whether the COO commits the executive staff to the owners you identified.
- Discovery dependency: Exec Priorities (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2.
- Mini-game: The Emperor's Council. Thirty minutes with the COO's executive staff. Each leader names the pressure they are carrying. Ask three diagnostic questions, then use those statements to match each concern to the accountable executive. The final rapport roll tests whether the COO will commit the staff to act.
- Opening statements heard before round one:
  - Head of Risk: “Fraud losses and a three-person team are my constraint; capacity is breaking.”
  - CRO: “I am accountable for growing in-store attach, not just online ordering.”
  - COO: “Merchant cash flow and supplier spend cut across the operating strategy I lead.”
  - CFO: “I need the blended buy rate and card mix to deliver sustainable margin.”
- Round 1: The Head of Risk, exhausted: "Three of us, 45,000 merchants, and fraud is up 40%."
  - Correct: "Can I shadow your team for a day — what do the three of you actually do between alerts?" — Manual reviews, spreadsheets, and a Radar Standard setup nobody has tuned. The risk gap has a shape now.
  - Alternative: "Have you considered Managed Risk?" — A fair product. The wrong moment: you don't yet know what they handle manually.
  - Alternative: "Fraud is a cost of doing business at scale." — The Head of Risk stops talking to you.
- Round 2: The CRO: "Our restaurants love online ordering. In-store? They use whatever the last rep sold them."
  - Correct: "Let's measure it: what share of counter volume runs through OrderOS today vs. a legacy acquirer?" — About 40%. Sixty percent of in-person volume walks past the platform every day.
  - Alternative: "Hardware is a distraction from software margins." — For an in-person platform, you just dismissed the biggest attach pool.
  - Alternative: Suggest a Terminal demo next week — Demos before measurement. You still don't know the size of the prize.
- Round 3: The COO: "What do restaurant owners complain about to us, besides fees?"
  - Alternative: "Honestly, mostly fees." — You accepted the framing. The real pain — cash flow and supplier spend — goes unspoken.
  - Correct: "Can I interview a few owners about cash flow and how they pay suppliers?" — Waiting on deposits, paying suppliers on personal cards, no working capital. Embedded financial services, mapped.
  - Alternative: Present the OrderOS product roadmap — They're busy. Showing answers before questions wastes the thirty minutes.
- Round 4: Based on what each executive said, match each concern to the person accountable for it.
  - Match Fraud losses and risk-team capacity → Head of Risk. The Head of Risk owns fraud operations and staffing reality.
  - Match In-store payments attach and revenue growth → CRO. The CRO owns how much counter volume OrderOS captures.
  - Match Merchant cash flow and supplier-spend strategy → COO. The COO owns the cross-functional retention and operating strategy.
  - Match Margin and pricing-model performance → CFO. The CFO owns the economics of the blended buy rate.
  - Matching rule: every concern must be assigned to its correct executive. Risk capacity belongs to the Head of Risk, attach growth to the CRO, merchant operating strategy to the COO, and pricing performance to the CFO.
- Final roll: Executive rapport: whether the COO commits the executive staff to the owners you identified. Each correct read adds +2; each misread subtracts 2. Skill fixes the outcome tier; the roll shades the result.
- Success: Your read of the room lands on 4 of 4 meeting decisions. You earn these discovery topics: Risk Posture, Payments Attach, Merchant Needs, Exec Priorities. The rapport roll succeeds: the COO volunteers one more — Competitive Landscape — and your SA earns the room's trust (SA Rapport).
  - Effects: Trust +12; Tech Cred +8; Exec Access +4; boon: SA Rapport; flag disc_risk; flag disc_attach; flag disc_obj4; flag disc_exec; flag disc_competition
- Failure: Your read of the room lands on 0 of 4 meeting decisions. No discovery topic is earned from the questions. The rapport roll falls flat: polite answers, no extra confidences. The executives leave early.
  - Effects: Trust -3; Exec Access -3; mistake logged: Ran a discovery workshop and asked the wrong questions
- Lesson: Discovery is skill first, luck second: the right questions and the right priorities (skill) uncover topics no matter how the room feels; how far they open up (luck) only adds to it. Every topic uncovered is +2 on the rolls that depend on it; every topic missed is -2.
B. Ask the COO: "What happens if you don't solve this in 12 months?" — One question that reveals the stakes.
- Outcome: "We hit network monitoring thresholds and lose our biggest groups." The stakes are clear.
  - Effects: Exec Access +5; Trust +3; flag disc_risk
- Lesson: Stakes questions reveal priority. Discovery flag uncovered: Risk Profile.
C. Present your roadmap instead — They're busy. Show them the answer.
- Outcome: Your roadmap is polished. The COO checks their phone.
  - Effects: Product Mastery +3; Exec Access -5; mistake logged: Presented a roadmap instead of running discovery
- Lesson: Listening first earns the right to present.

## Chapter 2: Monetize: Optimize the Empire

From blended buy rate to surgical pricing — and the front door to the counter. Risk is a margin problem too.

### The Emperor's Burden

Type: stage_transition. Encounter ID: r_burden.
Setup: Margin Reports are in. At $950M volume, 20% of merchants underwater means millions in losses — and engineering says custom pricing logic would take two quarters.
Signals:
- GREEN: $950M volume — every basis point of improvement is worth millions
- GREEN: Head of Payments has Margin Reports and wants to act
- GREEN: Platform Pricing Tool: no-code pricing schemes and pricing groups by tier, payment method, and geography
- YELLOW: Head of Payments recommends a blanket rate increase as the fastest path to margin repair
- RED: 20% of merchants underwater on high-interchange cards in tourist areas
- GREEN: 🔍 Your prep: tourist-area locations run ~60% rewards cards vs. 25% in suburbs Hidden until Payments Economics is discovered.
Choices and outcomes:
A. Card-mix analysis → segment with the Platform Pricing Tool — No-code pricing schemes and connected-account pricing groups. Live in weeks, not quarters.
- Dice: d20 + Tech Cred bonus vs 10.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +2, Technical Account Manager +2.
- Boon bonuses when earned: Margin Lens +3.
- Success: Card-mix analysis feeds straight into the Platform Pricing Tool: pricing schemes by tier, payment method, and geography, with connected accounts assigned to pricing groups. Live in three weeks. Margin stabilized.
  - Effects: +$150,000 revenue; Tech Cred +10; Trust +8; pricing → Segmented Pricing; boon: Pricing Forge; flag pricing_tool
- Failure: Pricing Tool schemes live for the top tiers; data gaps slow the long tail. Margin partially recovered.
  - Effects: +$70,000 revenue; Tech Cred +6; Product Mastery +5; pricing → Segmented Pricing; boon: Pricing Forge; flag pricing_tool
- Lesson: The Platform Pricing Tool is a no-code editor for application-fee logic: default and conditional schemes, pricing groups for connected accounts, payments and Instant Payouts. It saves platforms months of engineering. Pricing Forge: +2 on pricing decisions.
B. Investigate Card Mix First — Understand the actual cost drivers before acting. Data before decisions.
- Outcome: Card mix analysis complete. Tourist-area merchants have 60% rewards cards vs. 25% in suburban locations.
  - Effects: +$20,000 revenue; Tech Cred +12; Product Mastery +8; boon: Margin Lens
- Lesson: Investigation before action. At $950M, understanding the data prevents million-dollar mistakes.
C. Accept HoP Recommendation: Raise All Rates 20 bps — Your trusted contact says this is the fastest fix. $1.9M in immediate margin recovery.
- Outcome: 20 bps rate increase across all 45,000 merchants. $1.9M immediate margin recovery. But your top 50 restaurant groups started shopping alternatives.
  - Effects: +$40,000 revenue; Trust -12; Exec Access -8; mistake logged: Blanket rate increase at $950M scale accelerated enterprise churn
- Lesson: Blanket rate increases generate fast revenue but push away your most sophisticated merchants first.
D. Have engineering hand-build segmented application fees — Custom application_fee_amount logic. Full control — two quarters of engineering.
- Outcome: Engineering ships custom application-fee logic two quarters later. Margin bled the entire time.
  - Effects: +$40,000 revenue; Tech Cred +2; Trust -3; pricing → Segmented Pricing; mistake logged: Hand-built pricing logic instead of using the Platform Pricing Tool
- Lesson: The Platform Pricing Tool exists so platforms don't spend months hard-coding application_fee_amount logic.

### The Architecture Deep-Dive

Type: technical. Encounter ID: r_technical.
Setup: The Head of Payments wants to understand IC++ statement generation and reconciliation at $950M scale.
Signals:
- GREEN: Head of Payments is sophisticated — asking the right hard questions
- YELLOW: IC++ architecture is genuinely complex — wrong answers lose the deal
- RED: This conversation will shape a multi-million dollar pricing decision
Choices and outcomes:
A. Brief the SA with merchant segmentation data, co-present — Share the Margin Reports, the enterprise segmentation, and IC++ implications.
- Outcome: You shared the Margin Reports, the enterprise vs SMB breakdown, and the IC++ implications at $950M.
  - Effects: +$15,000 revenue; Trust +12; Tech Cred +12; Product Mastery +5; boon: SA Rapport
- Lesson: At this complexity level, your SA's deep expertise is your secret weapon. Use it.
B. CC the SA on the email thread — They can read the context.
- Outcome: The SA read the thread and gave a competent IC++ overview. But missed the scale-specific nuances.
  - Effects: Trust -5; Tech Cred +3; Exec Access -3
- Lesson: CC'ing an SA on a thread is not deploying them. Brief with context.
C. Handle it yourself — you know this stuff — You have been on this account for 18 months.
- Outcome: Eighteen months on this account and you know them cold. But at $950M, the IC++ nuances are beyond general knowledge.
  - Effects: −$10,000 revenue; Product Mastery +8; Trust -10; Exec Access -12; mistake logged: Solo technical deep-dive, missed enterprise escalations
- Lesson: Account tenure gives context, but fresh technical eyes catch things you have normalized.

### The Front Door

Type: opportunity. Encounter ID: r_frontdoor.
Setup: OrderOS sells online ordering — but restaurants live at the counter. For an in-person-heavy platform, Terminal sold with Connect can be the front door, not an add-on.
Signals:
- GREEN: Restaurant groups want one provider for counter, kiosk, and online
- YELLOW: Hardware rollouts need installation partners
- GREEN: 🔍 Your audit: ~60% of in-store volume leaks to a legacy acquirer Hidden until Payments Attach is discovered.
Choices and outcomes:
A. Lead with Terminal + Connect for the counter — Make in-person payments the front door: Terminal readers, Tap to Pay, and one Connect account per restaurant.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Attach (+2 each found, −2 each missing).
- Ally bonuses when recruited: Implementation Partner (SI / ISV) +2, Professional Services +1.
- Success: Terminal becomes the lead product: readers and Tap to Pay sold with every Connect account. The partner guild installs 3,000 counters in two quarters and in-store volume through OrderOS triples.
  - Effects: +$120,000 revenue; Trust +12; Product Mastery +10; Tech Cred +4; journey → Grow; ally joins: Implementation Partner (SI / ISV); flag terminal_frontdoor; flag terminal_attach
- Failure: Terminal pilots in 200 restaurants. Reader supply and installation scheduling slow the rollout; the COO wants a partner before scaling.
  - Effects: +$35,000 revenue; Trust +4; Product Mastery +5; flag terminal_frontdoor
- Lesson: For in-person-dominant platforms, Terminal sold with Connect is the front door. Lead with where the merchant actually sells.
B. Online ordering first, in-store later — Fix pricing on the volume you already have.
- Outcome: Pricing work continues online. The counter stays with the legacy acquirer for now.
  - Effects: +$15,000 revenue; Tech Cred +3
- Lesson: Reasonable sequencing — but the biggest attach pool waits.
C. Leave in-store to the legacy acquirer — Hardware is a distraction.
- Outcome: "Hardware is a distraction" becomes the strategy. A POS rival bundles Terminal-style readers and wins 400 restaurant groups' counters.
  - Effects: Trust -6; Exec Access -4; mistake logged: Ignored in-person payments on an in-person platform
- Lesson: On an in-person platform, ignoring the counter hands the front door to a rival.

### The War Council

Type: companion. Encounter ID: r_tam_recruit.
Setup: At $950M, the transformation ahead requires allies. Who do you bring in first?
Choices and outcomes:
A. Recruit the TAM (Paid Support) — Crisis response, margin monitoring, and technical escalation at scale.
- Outcome: The TAM joins the cause. Monitoring, escalation paths, and crisis response are in place.
  - Effects: Trust +8; Tech Cred +6; ally joins: Technical Account Manager
- Lesson: A TAM is a relationship-building investment: proactive monitoring and faster crisis response.
B. Engage ProServ for the IC++ and billing build — Stripe Professional Services: master builders for complex migrations.
- Outcome: ProServ joins to build IC++ statement generation and reconciliation.
  - Effects: Tech Cred +10; Product Mastery +4; ally joins: Professional Services
- Lesson: ProServ de-risks complex pricing moves and migrations. +3 on big pricing rolls.
C. Bring in an Implementation Partner (SI) — A partner guild with restaurant-POS expertise and capacity.
- Outcome: The Guildmaster joins: an SI with restaurant-POS expertise and spare capacity.
  - Effects: Tech Cred +6; Trust +5; ally joins: Implementation Partner (SI / ISV)
- Lesson: Implementation partners add capacity and bring partner-sourced opportunities. +2 on integration and defend rolls.
D. Go it alone — sharpen your instincts — You have 18 months of account knowledge.
- Outcome: You go it alone. Your instincts sharpen — and so does your calendar.
  - Effects: Product Mastery +6; Tech Cred +3; mistake logged: Went it alone on a $950M transformation
- Lesson: At $950M, allies aren't a luxury. Know when to bring in the TAM, ProServ, partners, or SPE.

### The Enterprise Ultimatum

Type: stage_transition. Encounter ID: r_enterprise.
Setup: The 50 largest restaurant groups ($285M, 30% of volume) are threatening to leave.
Signals:
- GREEN: Enterprise merchants specifically requesting IC++ — they know what they want
- GREEN: Head of Payments has interchange expertise — can handle the complexity
- YELLOW: IC++ requires sophisticated statement generation and reconciliation ops
- YELLOW: Not all merchants want or understand IC++ pricing — segment carefully
- YELLOW: Holding the line protects simpler merchants from complexity they did not ask for
Choices and outcomes:
A. Transition Enterprise Tier to IC++ — Passthrough pricing for the top 50. Operationally complex.
- Dice: d20 + Tech Cred bonus vs 12.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Payments Economics (+2 each found, −2 each missing).
- Ally bonuses when recruited: Solutions Architect +3, Technical Account Manager +2, Professional Services +2.
- Boon bonuses when earned: SA Rapport +2.
- Success: IC++ launched for the top 50 restaurant groups. $285M in volume retained with transparent pricing.
  - Effects: +$55,000 revenue; Trust +12; Tech Cred +10; pricing → IC++; flag on_icpp
- Failure: IC++ hit complexity issues. Statement generation at $285M volume harder than expected.
  - Effects: +$10,000 revenue; Trust +3; Tech Cred +5
- Lesson: Hybrid model: IC++ for enterprise who demand transparency, blended for the rest.
B. Offer Volume-Based Tiered Pricing — Keep blended but add tiers. Simpler for everyone.
- Outcome: Tiered pricing deployed. Simpler than IC++ but effective for merchant retention across all segments.
  - Effects: +$35,000 revenue; Trust +8; Tech Cred +5; pricing → Segmented Pricing
- Lesson: Volume-based tiering is the pragmatic middle ground.
C. Hold the Line on Pricing Consistency — Uniform pricing protects the 44,950 smaller merchants. Some enterprise churn is acceptable.
- Outcome: Held the line on uniform pricing. 8 enterprise restaurant groups left. $95M volume loss.
  - Effects: −$35,000 revenue; Trust -15; Exec Access -10; mistake logged: Lost enterprise merchants by refusing to evolve pricing
- Lesson: Pricing consistency has value, but at $950M you cannot ignore enterprise demands.

### The Pact for the Rollout

Type: opportunity. Encounter ID: r_msap.
Setup: Pricing is changing for 45,000 restaurants and the top 50 groups. The Head of Payments needs one plan everyone signs.
Choices and outcomes:
A. Co-build an MSAP with the Head of Payments + ProServ — Mutual Success & Activation Plan: owners, milestones, and dates on both sides.
- Outcome: The customer co-owns every milestone. ProServ joins to de-risk the build. Go-live dates are real now.
  - Effects: +$20,000 revenue; Trust +8; Tech Cred +6; ally joins: Professional Services; boon: Pact of Mutual Success
- Lesson: An MSAP (Mutual Success & Activation Plan) aligns both sides on owners, milestones, and dates. Co-building it creates customer ownership; ProServ de-risks complex launches. Pact of Mutual Success: +2 on activation, defend, and renewal rolls.
B. Draft the MSAP yourself and share it — Faster. Less buy-in.
- Outcome: Your MSAP is thorough. The customer skims it and says "looks great."
  - Effects: +$10,000 revenue; Trust +4; Product Mastery +3; boon: Pact of Mutual Success
- Lesson: A plan the customer didn't help write is a plan they don't own — but it's far better than none.
C. Skip the plan — the team is sophisticated — They've done migrations before.
- Outcome: Three months later, activation is a fraction of plan. The revenue you forecast is still "pending go-live."
  - Effects: −$15,000 revenue; Trust -6; Exec Access -3; mistake logged: No activation plan after signature
- Lesson: Signed is not live. Without an activation plan, revenue slips and trust erodes.

### The Fraud Dragon

Type: crisis. Encounter ID: r_fraud.
Setup: Dispute rates spiking across 45,000 restaurants. The risk team of 3 is drowning and network monitoring thresholds are approaching. Which Radar plan — or Managed Risk?
Signals:
- GREEN: New Radar plans: Standard (included) → Plus → Pro, or Stripe Managed Risk
- YELLOW: Head of Payments wants to keep control in-house
- RED: Monitoring-program threshold approaching — fines and program risk
- YELLOW: 🔍 Your audit: 400 manual dispute reviews a week, and the COO wants scale without headcount Hidden until Risk Profile is discovered.
Choices and outcomes:
A. Radar Plus: custom rules and dynamic thresholds — Control and tuning — the risk team owns the rules.
- Dice: d20 + Tech Cred bonus vs 11.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +2.
- Success: Radar Plus rules, tuned with your TAM and SA, cut disputes 30%. The risk team breathes — a little.
  - Effects: +$90,000 revenue; Tech Cred +8; Trust +5; journey → Grow; boon: Radar Ward; flag fraud_plus
- Failure: Rules help, but 3 people can't tune them for 45,000 merchants. Disputes plateau.
  - Effects: +$30,000 revenue; Tech Cred +3; journey → Grow; boon: Radar Ward; flag fraud_plus
- Lesson: Radar Plus fits platforms that want control and can staff the rules. At 45,000 merchants, watch whether the team can keep up.
B. Radar Pro: Plus + account and customer abuse prevention — Adds protection against fake accounts and promo abuse across online ordering and ghost kitchens.
- Dice: d20 + Tech Cred bonus vs 10.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +1.
- Success: Radar Pro catches the fake-account rings exploiting online-ordering promos and ghost-kitchen signups. Disputes down 35%.
  - Effects: +$110,000 revenue; Tech Cred +10; Product Mastery +5; journey → Grow; boon: Radar Ward; flag radar_pro
- Failure: Radar Pro is live, but the team hasn't configured the account-abuse features. Partial impact.
  - Effects: +$40,000 revenue; Tech Cred +4; journey → Grow; boon: Radar Ward; flag radar_pro
- Lesson: Radar Pro adds account- and customer-abuse prevention on top of Plus — strong for platforms with signup and promo abuse.
C. Stripe Managed Risk (SMR) — Stripe takes on decisioning and liability for connected accounts. Higher fee, risk team freed.
- Outcome: Stripe Managed Risk live. Stripe owns decisioning and liability for OrderOS's connected accounts. The risk team shifts to merchant success.
  - Effects: +$130,000 revenue; Trust +10; Exec Access +6; journey → Grow; boon: Aegis of Managed Risk; flag managed_risk
- Lesson: SMR is a strategic choice, not a maturity reward: Stripe takes decisioning and liability for a higher fee. When the platform doesn't want to scale a risk operation, it's the right answer.
D. Support the internal team with better tooling — Honor the Head of Payments' preference for control.
- Outcome: New tooling arrives. The 3-person team is still drowning — now with more dashboards.
  - Effects: −$50,000 revenue; Trust +3; Tech Cred -5; flag fraud_internal; mistake logged: Asked a 3-person team to absorb risk for 45,000 merchants
- Lesson: The in-house path now has an explicit scaling debt: it needs owners, service levels, automation, and real headcount.

## Chapter 3: Grow: The Omnichannel Frontier

Dragons, departures, and new frontiers. The empire must scale without breaking.

### The Omnichannel Frontier

Type: opportunity. Encounter ID: r_omni.
Setup: The counter is where the empire's volume lives. Finish the omnichannel story: in-store, kiosk, and online on one platform, with faster payouts for every restaurant.
Signals:
- GREEN: Restaurant groups want unified online + in-store data
- YELLOW: Hardware rollouts need installation partners
- GREEN: 🔍 Your audit: ~60% of in-store volume leaks to a legacy acquirer Hidden until Payments Attach is discovered.
Choices and outcomes:
A. Terminal consolidation + Instant Payouts — Bring in-store volume onto OrderOS with Stripe Terminal, and monetize faster payouts.
- Dice: d20 + Product Mastery bonus vs 12.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Payments Attach (+2 each found, −2 each missing).
- Ally bonuses when recruited: Implementation Partner (SI / ISV) +2, Professional Services +2.
- Success: Terminal rolls out with the partner's installers. In-store attach jumps from 40% to 75%, and Instant Payouts monetize faster cash.
  - Effects: +$140,000 revenue; Product Mastery +8; Tech Cred +6; Trust +5; journey → Grow; boon: Speed Talisman; flag terminal_attach
- Failure: Hardware logistics slow the rollout. In-store attach reaches 52%.
  - Effects: +$50,000 revenue; Product Mastery +4; journey → Grow; boon: Speed Talisman
- Lesson: For IRL-heavy platforms, Terminal is a front-door Grow product: unified online + in-store data, plus volume that used to leak.
B. Instant Payouts only — Fast revenue, no hardware.
- Outcome: Instant Payouts at 1% — restaurants love same-day cash.
  - Effects: +$50,000 revenue; Trust +5; journey → Grow; boon: Speed Talisman
- Lesson: Payout monetization is a fast Grow lever.
C. Leave in-store to the legacy acquirer — Online ordering is the core business.
- Outcome: In-store volume stays with the legacy acquirer. Restaurant groups keep asking for unified reporting.
  - Effects: Product Mastery -3; mistake logged: Left in-store volume with a legacy acquirer
- Lesson: Leaving channel volume off-platform caps growth.

### The Champion's Departure

Type: crisis. Encounter ID: r_champion.
Setup: Head of Payments resigned. New VP was previously at an Adyen shop.
Choices and outcomes:
A. Call in Executive Sponsor — Stripe leadership meeting within the week. High-stakes but high-ceiling.
- Dice: d20 + Exec Access bonus vs 12.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Exec Priorities (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +1, Solutions Architect +1.
- Success: Executive sponsor meeting within the week. New VP impressed by Stripe leadership engagement.
  - Effects: +$10,000 revenue; Trust +12; Exec Access +10
- Failure: Meeting helped but new VP still evaluating. Their Adyen background makes them skeptical.
  - Effects: Trust +3; Exec Access +5
- Lesson: When champions leave, exec engagement within 30 days is critical. Especially when the new VP knows competitors.
B. Send Comprehensive Account Brief — Data-driven brief that educates the new VP on current architecture and roadmap.
- Outcome: Account brief educated the new VP on the architecture, the scale, and the roadmap. Slower but steady.
  - Effects: +$5,000 revenue; Trust +5; Exec Access +3
- Lesson: Data-driven briefs are lower ceiling but reliable.
C. Wait and See — Give the new VP time to settle in. Relationships are at the company level.
- Outcome: You waited. New VP launched an Adyen POC within 30 days. They know the Adyen playbook by heart.
  - Effects: −$30,000 revenue; Trust -20; Exec Access -12; mistake logged: Failed to engage new stakeholder within 30 days
- Lesson: 30-day window after champion departure. Never wait when the replacement knows your competitors.

### The Scale Crucible

Type: boss. Encounter ID: r_scale.
Branch context: The encounter always appears; one of four path-specific follow-ons is unlocked by the earlier Fraud Dragon choice, plus two common scaling choices.
Setup: The COO returns to the risk path you chose at the Fraud Dragon: "The first decision is made. Now how does that model handle 40% more volume without breaking?"
Signals:
- RED: Current risk capacity cannot absorb 40% more volume
- YELLOW: The COO wants the chosen model scaled, not a replay of the initial product selection
- GREEN: A scaled operating model needs coverage, owners, automation, and an explicit control boundary
Choices and outcomes:
A. Scale the Managed Risk rollout to every eligible merchant — Build from the earlier SMR choice: expand coverage, escalation paths, and reporting without adding platform headcount.
- Availability: hidden until its prerequisite is met; requires flag managed_risk.
- Dice: d20 + Trust bonus vs 10.
- Purpose shown before roll: whether this Trust approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +3, Professional Services +1.
- Success: Managed Risk expands from the Fraud Dragon decision to every eligible merchant. Escalation paths and reporting are standardized; volume rises 40% with platform risk headcount flat.
  - Effects: +$70,000 revenue; Trust +12; Exec Access +8; boon: Aegis of Managed Risk; flag managed_risk; flag scaled_risk_model
- Failure: The earlier Managed Risk choice expands in phases. Coverage reaches half the platform while the COO validates reporting and escalation controls.
  - Effects: +$35,000 revenue; Trust +5; flag managed_risk; flag scaled_risk_model
- Lesson: The Scale Crucible honors the earlier SMR choice. The work now is rollout design and governance, not choosing the product again.
B. Operationalize Radar Pro with automation + a 5-person specialist team — Build from the earlier Radar Pro choice: staff account-abuse controls, automate queues, and govern models.
- Availability: hidden until its prerequisite is met; requires flag radar_pro.
- Dice: d20 + Exec Access bonus vs 10.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +1.
- Success: The earlier Radar Pro choice gets an operating model: automated account-abuse queues, five specialists, and a monthly model-governance review. Volume grows without the old backlog.
  - Effects: +$60,000 revenue; Exec Access +7; Tech Cred +8; boon: Radar Ward; flag radar_pro; flag dedicated_ops_team; flag scaled_risk_model
- Failure: The Radar Pro plan is sound, but hiring reaches only two of five specialists. Automation carries the highest-risk queues; the long tail still waits.
  - Effects: −$10,000 revenue; Tech Cred +3; Exec Access -2; flag radar_pro; flag dedicated_ops_team
- Lesson: Radar Pro scales only when the platform funds the people and governance that operate it.
C. Scale Radar Plus with a rules-governance risk pod — Build from the earlier Radar Plus choice: named rule owners, review cadences, automation, and additional analysts.
- Availability: hidden until its prerequisite is met; requires flag fraud_plus.
- Dice: d20 + Tech Cred bonus vs 11.
- Purpose shown before roll: whether this Tech Cred approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +2.
- Success: The earlier Radar Plus choice grows into a governed risk pod: named rule owners, automated reviews, weekly tuning, and three new analysts. The team keeps control and absorbs the growth.
  - Effects: +$50,000 revenue; Tech Cred +9; Trust +6; boon: Radar Ward; flag fraud_plus; flag dedicated_ops_team; flag scaled_risk_model
- Failure: The Radar Plus pod launches, but automation is late. Rule quality improves while the queue stays stubbornly high.
  - Effects: +$10,000 revenue; Tech Cred +4; flag fraud_plus; flag dedicated_ops_team
- Lesson: Radar Plus can scale when rules have owners, operating cadence, and enough analysts. The product choice was already made; this is the operating model.
D. Turn the internal-tooling path into a staffed risk-operations program — Acknowledge the earlier in-house choice: fund the owners, service levels, automation, and five new operators it actually requires.
- Availability: hidden until its prerequisite is met; requires flag fraud_internal.
- Dice: d20 + Exec Access bonus vs 12.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Professional Services +1.
- Success: OrderOS acknowledges what the earlier internal-tooling choice really costs: five operators, service-level targets, automated queues, and executive ownership. The dashboards finally have a team behind them.
  - Effects: +$35,000 revenue; Exec Access +8; Tech Cred +6; flag fraud_internal; flag dedicated_ops_team; flag scaled_risk_model
- Failure: Leadership approves the program but funds only two roles. The internal tools improve visibility; coverage still trails growth.
  - Effects: −$15,000 revenue; Exec Access -3; Tech Cred +3; flag fraud_internal; flag dedicated_ops_team
- Lesson: Internal control is valid only when the platform funds the operating system around the tools.
E. Create a segmented operating model for the highest-risk merchants — Keep the chosen foundation, but add stricter controls, coverage, and escalation for the riskiest segments.
- Dice: d20 + Product Mastery bonus vs 11.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Risk Profile (+2 each found, −2 each missing).
- Ally bonuses when recruited: Technical Account Manager +2, Solutions Architect +1.
- Success: You keep Managed Risk as the foundation and add stricter coverage, controls, and escalation for the highest-risk restaurant segments. The model scales without pretending every merchant needs the same treatment.
  - Effects: +$55,000 revenue; Product Mastery +8; Trust +5; flag segmented_risk_ops; flag scaled_risk_model
- Failure: The Managed Risk segmentation launches with weak merchant data. The highest-risk cohort improves; some borderline accounts land in the wrong queue.
  - Effects: +$15,000 revenue; Product Mastery +4; Tech Cred +2; flag segmented_risk_ops
- Lesson: Segmentation is a scaling design, not a repeat product decision. Preserve the chosen foundation and spend capacity where risk is concentrated.
F. Cap merchant onboarding until risk capacity catches up — A real scaling tradeoff: protect losses by slowing growth instead of pretending capacity is infinite.
- Outcome: OrderOS caps new high-risk merchant onboarding for a quarter. The dispute queue stabilizes, but growth misses plan.
  - Effects: +$5,000 revenue; Trust +4; Exec Access -5; flag risk_growth_cap; mistake logged: Scaled risk capacity by slowing merchant growth
- Lesson: Slowing growth is an honest capacity control. It protects the system, but it is not a long-term scaling model.
Continuity note: exactly one of the first four path-specific choices is normally visible, determined by Fraud Dragon. The segmented operating model and onboarding cap remain common choices. The path-specific outcome text explicitly names the earlier choice and does not claim a product the player did not select.

## Chapter 4: Retain & Defend: The Imperial Treasury

Embedded financial services riches await — and a rival raids the empire's greatest lords.

### The Imperial Treasury

Type: opportunity. Encounter ID: r_obj4.
Setup: Restaurants live on thin margins: they need cash for slow seasons, cards for supplier purchasing, and a place to hold tips and payroll funds. Embedded financial services: monetize outside of payments.
Signals:
- GREEN: Embedded finance revenue doesn't depend on interchange
- GREEN: 🔍 Your interviews: supplier spend and slow-season cash are top owner pains Hidden until Merchant Needs is discovered.
Choices and outcomes:
A. Capital + Issuing supplier cards + Financial Accounts — Lending, spend, and a place to hold funds — three new revenue lines.
- Dice: d20 + Product Mastery bonus vs 12.
- Purpose shown before roll: whether this Product Mastery approach succeeds.
- Discovery dependency: Merchant Needs (+2 each found, −2 each missing).
- Ally bonuses when recruited: Stripe Partner Ecosystem (SPE) +2, Professional Services +1.
- Boon bonuses when earned: Merchant Loyalty Amulet +2.
- Success: Capital funds slow seasons, Issuing cards run supplier purchasing, and Financial Accounts hold tips and payroll. OrderOS now earns on money that never touches interchange.
  - Effects: +$200,000 revenue; Product Mastery +10; Trust +8; Exec Access +6; journey → Retain; boon: Treasury Keystone; flag obj4_bundle
- Failure: Only Capital launches this year — the bundle pitch didn't connect to a clear merchant pain.
  - Effects: +$80,000 revenue; Product Mastery +4; Trust +3; journey → Retain; boon: Merchant Loyalty Amulet
- Lesson: Embedded financial services — monetize outside of payments. Capital, Treasury/Financial Accounts, and Issuing create new revenue lines and make the platform far stickier. Lead with the merchant pain you discovered.
B. Capital only — The easiest embedded-finance entry point.
- Outcome: Capital launches. Zero credit risk for the platform, revenue from day one.
  - Effects: +$90,000 revenue; Trust +5; Product Mastery +3; journey → Retain; boon: Merchant Loyalty Amulet
- Lesson: Capital is the easiest embedded-finance entry point. Treasury and Issuing are the next step.
C. Not a priority this year — Pricing transformation is enough change.
- Outcome: The board asks again next quarter: "What's our next revenue line?" You don't have an answer.
  - Effects: Product Mastery -3; Exec Access -4; mistake logged: Skipped embedded financial services: no revenue outside payments
- Lesson: Platforms that only monetize payments leave retention and valuation upside on the table. Embedded financial services are a core part of the journey.

### The Competitor Raid

Type: defend. Encounter ID: r_raid.
Setup: Adyen goes directly after OrderOS's top 50 restaurant groups — and the new VP of Payments came from an Adyen shop.
Signals:
- RED: Top 50 groups = 30% of volume
- YELLOW: New VP has no history with Stripe
- GREEN: 🔍 Your scouting: Adyen is offering the top 50 IC++ with a one-year rate lock Hidden until Competitive Landscape is discovered.
Choices and outcomes:
A. Defend with total value: pricing + risk + embedded-finance lock-in — IC++/segmentation, Managed Risk or Radar, embedded finance, and the activation plan.
- Dice: d20 + Exec Access bonus vs 13.
- Purpose shown before roll: whether this Exec Access approach succeeds.
- Discovery dependency: Competitive Landscape, Exec Priorities (+2 each found, −2 each missing).
- Ally bonuses when recruited: Implementation Partner (SI / ISV) +2, Professional Services +1, Technical Account Manager +1.
- Boon bonuses when earned: Pact of Mutual Success +2, Treasury Keystone +2, Aegis of Managed Risk +2, Pricing Forge +1.
- Success: You meet the new VP with the receipts: segmentation and IC++, risk handled, embedded finance live, and an MSAP of milestones hit. Adyen's rate lock looks thin next to it. The top 50 stay.
  - Effects: +$150,000 revenue; Trust +12; Exec Access +10; flag defended
- Failure: The new VP isn't convinced. Eight of the top 50 groups move to Adyen.
  - Effects: −$100,000 revenue; Trust -5; Exec Access -5; flag dual_process
- Lesson: Defend with total value, built from discovery. Switching cost lives in pricing tools, risk coverage, and embedded financial services — not in the rate.
B. Co-sell with SPE + Partner: roadmap and switching cost — Bring the Stripe Partner Ecosystem and the SI to the table.
- Outcome: The Envoy brings SPE co-sell resources and the partner shows the migration cost. Adyen's pitch stalls.
  - Effects: +$60,000 revenue; Trust +6; Exec Access +5; ally joins: Stripe Partner Ecosystem (SPE); flag defended_partial
- Lesson: SPE co-sell and partner switching-cost analysis are strong defensive plays.
C. Offer the top 50 a blanket rate cut — Neutralize the price.
- Outcome: A blanket cut keeps the top 50 — and costs $2.8M a year in margin.
  - Effects: −$90,000 revenue; Exec Access -5; mistake logged: Panic rate cut to defend against a competitor
- Lesson: Never lead a defense with price.

## Chapter 5: The Grand Renewal

The renewal defines the next era.

### The Grand Renewal

Type: finale. Encounter ID: r_renewal.
Setup: Contract renewal on a $950M platform. The entire industry is watching.
Choices and outcomes:
A. Full Suite: IC++ + Managed Risk + Embedded Financial Services — Passthrough pricing, Stripe-owned risk, and embedded finance.
- Availability: requires flag on_icpp.
- Outcome: IC++ for the top tier, Managed Risk platform-wide, and embedded finance signed. The ultimate partnership at $950M.
  - Effects: +$160,000 revenue; Trust +15; Tech Cred +10; Exec Access +10
- Lesson: Passthrough pricing, Stripe-owned risk, and embedded-finance depth: the gold standard for large platforms.
B. Segmented Buy Rate + Radar Pro + Embedded Financial Services — Platform Pricing Tool segmentation with in-house risk on the most advanced Radar plan.
- Outcome: Pricing Tool segmentation, Radar Pro, and embedded financial services signed. Pragmatic excellence at scale.
  - Effects: +$130,000 revenue; Trust +12; Tech Cred +8; Product Mastery +8
- Lesson: Segmentation + the right Radar plan + embedded finance is a strong, controllable package.
C. Imperial Alliance: IC++ + SMR + Embedded Finance + SPE co-sell — The deepest partnership: every lever, plus joint go-to-market.
- Availability: hidden until its prerequisite is met; requires flag defended; requires at least 3 allies.
- Outcome: LEGENDARY! The Imperial Alliance: IC++, Managed Risk, embedded finance, and SPE co-sell. OrderOS and Stripe go to market together. Renewal modifiers: competitor defeated +10%.
  - Effects: +$220,000 revenue; Trust +18; Exec Access +15; Product Mastery +10
- Lesson: The deepest platform partnerships combine pricing, risk, embedded finance, and joint go-to-market.
D. Buy Rate Optimization Only — Incremental improvement. Minimal disruption, minimal upside.
- Outcome: Buy rate optimization signed. Incremental, forgettable.
  - Effects: +$40,000 revenue; Trust +3; mistake logged: Optimization-only renewal
- Lesson: At $950M, an optimization-only renewal leaves the biggest levers unused.

## Validation and release note

The final source-fix record reports 16/16 regression checks passed, 2,100 seeded simulations passed, and the strict offline core/data TypeScript check passed. For this overview refresh, the source extractor and overview validator were rerun. A full installed-project `tsc` check, production Vite build, and browser/responsive QA were blocked by the available environment and were not run; this document does not imply those release checks passed.

## Source-derived coverage summary

This document covers 52 authored encounters and 176 authored choices across all three platforms. It includes 5 mini-games, 3 concern-to-executive matching rounds, 2 readiness ranking rounds, and all 12 opening statements from the three discovery mini-games.

The overview intentionally does not claim a single universal “best path” total or exhaustive state-space coverage. Outcomes can vary with dice, discovery, boons, companions, prior flags, stage, journey, and mini-game performance. Each encounter section shows representative source-resolved behavior from the documented 65-stat, SA-only baseline plus the choice prerequisites. The RentFlow buy-rate tree, FitStack white-label retreat, readiness variants, renewal availability, and OrderOS Fraud Dragon continuity are expanded where the differences are material.
