## V12.2.0 — Matching, explicit results, and branch continuity (Nov 25, 2026)

- Discovery workshops now end with a real concern-to-owning-executive matching interaction on FitStack, RentFlow, and OrderOS. Answers remain hidden until the full slate is submitted. Buy-rate readiness mini-games still end with rank-the-fixes rounds.
- Mini-game Roads Not Taken panels show a generic four-tier ladder (Clear / Strong / Partial / No read), highlight the achieved tier, and compare better/worse outcomes. They never display unchosen encounter choices, questions, answers, or unearned discovery topics.
- Dice screens explain what the roll decides before the player rolls, including executive-rapport objectives. The d20 and meeting result each require an explicit Continue click; result advancement has no timer and is guarded against double submission.
- OrderOS Scale Crucible now continues the actual Fraud Dragon path (Radar Plus, Radar Pro, Managed Risk, or internal tooling) and asks how to scale its operating model instead of replaying the original product choice.
- Discovery setup was de-duplicated on all platforms so the workshop keeps its attach/mix questions while the preceding encounter covers a different angle.
- FitStack dispute discovery is one focused ownership question with plausible alternatives.
- RentFlow copy consistently uses the 180 bps investor benchmark, opens with competitors circling and “so they are asking, why not RentFlow?”, and closes the competitive comparison with “No minimums” does not mean no obligations.
- Increased global text/status contrast and made end-screen numeric values (including 100) non-wrapping at narrow widths.
- Added `sim/regression-v12.2.ts`, match-aware simulations, and deterministic coverage for all four OrderOS scale paths and RentFlow renewal branches.

### Final independent-review fixes

- Annotated all five authored mini-game constants as `Minigame`, restoring strict core/data TypeScript validation.
- Grounded all owner matches in four customer opening statements shown before the rounds. FitStack now separates the CFO's debit-mix economics from the CTO's architecture capacity, and OrderOS pre-work surfaces criteria without disclosing the later answer key. Private rapport outcomes remain private until the roll.
- Corrected helper prose to three pick questions plus a fourth owner-match or prioritization round; all four decisions are required for a perfect verdict.
- Prevented White-Label Dawn from being immediately re-offered after retreating from the onboarding collapse.
- Raised gameplay/body text to 14–15px and supporting labels to at least 12px, widened numeric score slots, added narrow-header/score wrapping, and moved journey/stage/grade text to source-defined contrast-safe colors. Browser visual validation remains required when a browser is available.

## V12 — Playthrough feedback round (Nov 25, 2026)

- **Neutral starting stats.** All three platforms start at Trust 40 / Tech Cred 40 / Exec Access 40 / Product Mastery 40. Behaviors move the stats; the platforms no longer start at different baselines.
- **Score is plain addition.** Score = four stats + revenue tier bonus + 5 per discovery topic + journey bonus (25 for Grow, 50 for Retain), minus 10 per misstep. The end screen shows every line of the sum.
- **Normalized revenue bonus.** Each platform has a revenue benchmark (FitStack $650K, RentFlow $600K, OrderOS $1.2M). Reaching 25/50/75/100/125% of it earns +25/50/75/100/125, so platforms compare fairly.
- **Five-tier ladder.** Foot Soldier (0) → Squire (220) → Knight (320) → Champion (420) → Legendary Strategist (510). The full ladder is shown on the end screen with your tier highlighted. Calibrated with the simulator: strong play lands Champion/Legendary, skipping discovery lands Champion, random play lands Squire/Knight.
- **Archetype** stays as flavor under the rank; two new pairings added (The Trusted Engineer: Trust + Tech Cred; The Executive Seller: Exec Access + Product Mastery) so every top-two combination has a name.
- **No more literal escape codes.** Title screen, platform cards, briefing footer, discovery panel, and chronicle no longer show raw `\u2014` / `\u00B7` text. A new sweep check in `sim/sweep.ts` fails if any escape code appears as literal JSX text.
- **Dice readout** shows only the roll, modifiers, total, and target. Quality labels (Mediocre, Solid, Critical, Nat 20) removed.
- **Mission intros rewritten** for all three platforms: four beats (who they are, where they are today, the tension, your challenge), no shouting, no dash fragments.
- **First Harvest** buy-rate option reframed as "Push to buy rate as the gateway to Instant Payouts and Capital", and its outcome explains why buy rate is not a gateway to Grow products.
- Package renamed **ppq-v12** (version 12.0.0).

# Changelog

## v11.2.0 — Mini-games, readiness, and honest recovery (draft for review)

- **Mini-games (skill over luck, no new chapters).** New `minigame` choice type with two round types: *pick* (best of three questions) and *rank* (drag items into priority order; arrow buttons for touch). Each mini-game is three pick rounds + one rank round. Correct reads are +2 on the roll, misreads -2 — but skill decides the outcome tier: a perfect read locks the best tier even on a failed roll; the roll only shades revenue/stats. New `MinigameCard` UI, `minigame` game phase, and shared scoring in `src/game/minigame.ts`.
  - *Discovery workshop* (Ch1, all three platforms): the right question in each round uncovers a discovery topic; a successful rapport roll adds one more topic plus SA Rapport. Asking all the wrong questions and failing the roll logs a mistake.
  - *Readiness assessment* (FitStack Ch3 / RentFlow Ch2 Crucible): team & P&L owner, cost model on the real mix, risk & ops ownership. All-correct + roll success + real readiness (FitStack: Rev Share 2.0 experience, Conversion Forge win, Tech Cred 40; RentFlow: readiness roadmap, Tech Cred 40) approves buy rate. Otherwise the gaps are named — the old unreachable `product_attach_right` check is gone.
- **Journey no longer reaches Retain early.** Billing now grants the new Grow boon **Recurring Ledger** (+1 on Trust rolls) instead of Merchant Loyalty; RentFlow Monetize choices no longer award the Treasury Key. Merchant Loyalty Amulet copy clarified (earned through embedded financial services). Both Trust-boons now actually apply +1 on Trust rolls.
- **RentFlow Monetize placement.** Foreign Shores: A) Local payment methods + Tax + Identity per market (dice, Economics), B) Tax + Identity only, C) Cards only (penalized). Cost of Power B is now "Optimize the Rev Share 2.0 split + price ACH separately" (works on rev share or buy rate; `ach_priced` gives +5% at renewal).
- **Premature buy rate has honest, costly exits.** Reverting now costs real trust/exec access/revenue (it is slow and public). New *split model* choice in both margin crises and both renewals: front book on Rev Share 2.0, back book stays on buy rate — acknowledged, cheaper than a retreat, but -10% renewal complexity. Splitting a *healthy* (readiness-proven) buy rate is a mistake. A premature buy rate that is never fixed costs -20% at renewal; a readiness-proven one earns +10%.
- **The Interchange Wyrm (FitStack Ch4, conditional).** Fires when buy rate was switched on prematurely (late Harvest push or failed Crucible) and is still live and unsegmented. Choices: Margin Lens (segment + P&L owner), split model, full retreat (expensive), or feed the wyrm (blanket increase, mistake).
- **Rival's Offer.** "Counter with a Rev Share 2.0 optimization" only appears when FitStack is not on buy rate; the hold-the-buy-rate option covers the other state.
- **Merchant Uprising** cut to three choices: churn playbook (dice), business review only (diagnosis, no fix — mistake), merchant credits (band-aid).
- **The Rent Roll** now depends on Payments Attach as well as Payments Economics discovery, making The Ledger Study's attach reward meaningful.
- Simulator: `sim/paths.ts` covers mini-game success/failure, both readiness verdicts, every wyrm exit, split-model renewals, and the new RentFlow choices.

## v11.1.0 — Journey alignment

**Terminology**
- "Objective 4" is gone from all player-facing text, chapter titles, lessons and docs. It is now "embedded financial services" everywhere (internal flag IDs `disc_obj4` / `obj4_bundle` unchanged).

**Engine**
- `requires.notFlag` on choices (hide/lock a choice when a flag IS set) and `removeFlag` on outcomes.
- Reverting from buy rate now clears `on_buyrate` (FitStack and RentFlow margin crises).
- Patches can override an encounter's `conditional`.

**Buy rate progression (no more repeated offers)**
- Every "move to buy rate" choice is hidden once the platform is already on buy rate; where it makes sense an "optimize buy rate" / "hold the buy rate" choice appears instead (First Harvest, The Rival's Offer).
- Renewal buy-rate packages key off the actual `on_buyrate` state; the outcome text differs depending on whether readiness was proven.
- Staying on the partner gateway in *From Gateway to Gold* no longer strands the platform at Facilitate: the CFO forces rev share a quarter later (with a penalty).

**FitStack (7 chapters)**
- Ch2 *The Board's Decree* is now Rev Share vs. White-Label Connect (vs. partner gateway). White-labeling from day one is a very hard roll (Tech Cred 17) with red-flag signals that FitStack is not ready; failure leads to the new *The Onboarding Collapse* (retreat to Standard Connect / rebuild with SA + ProServ / push through). No buy rate in Ch2.
- New Ch3 Monetize encounter *The Conversion Forge*: Checkout + Link + payment methods for gym sign-ups.
- *First Harvest* (Grow) is now Billing for memberships / Instant Payouts / Terminal for the front desk. Capital moved to Retain.
- *White-Label Dawn* only appears below Rev Share 2.0 and never after a premature buy rate.

**RentFlow (6 chapters)**
- *Cost of Power* (dual-rail pricing) and *Foreign Shores* (conversion in new markets) moved into Ch2 Monetize.
- Ch3 is now the Grow churn playbook: MSAP, *Merchant Uprising* with a new "run the churn playbook" choice (business review → Grow products → MSAP milestones with the TAM), and the new *The Rent Roll* (Billing for recurring rent + Instant Payouts for owners).
- Ch4 Retain is *Vault of Deposits* (embedded financial services) only.

**OrderOS (5 chapters)**
- New Ch2 encounter *The Front Door*: Terminal + Connect as the front-door product for an in-person-heavy platform.
- *Fraud Dragon* moved into Ch2 Monetize (risk is a margin decision). Ch3 Grow opens with *Omnichannel Frontier* (now the Terminal rollout, with a stronger outcome if Terminal was the front door), then *Champion's Departure* and *Scale Crucible*.

## v11.0.0

**Journey**
- Replaced the SaaS 1.0/2.0/3.0 ladder with the Stripe journey: Launch → Facilitate → Monetize → Grow → Retain.
- Pricing models are now Monetize levers, shown separately from journey phase (top bar, sidebar, debrief).
- Chapter count follows maturity: FitStack 7, RentFlow 6, OrderOS 5. Earlier phases for mature platforms live in the briefing.

**Discovery**
- Training Grounds removed; each platform opens with a 3-encounter Discovery chapter.
- 6 discovery topics. Dependent dice rolls get +2 per topic uncovered, -2 per topic missed ("Guessing").
- Hidden 🔍 signals appear only once the matching topic is discovered; some finale choices need discovery.
- Journal tracks discovery; chronicle shows discovery impact per roll.

**Allies & artifacts**
- Head of Payments is no longer recruitable (still a customer-side character). New allies: ProServ, Implementation Partner, SPE.
- New boons: MSAP (Pact of Mutual Success), SMR Aegis, Pricing Forge (Platform Pricing Tool).

**Risk**
- Stripe Managed Payments removed throughout.
- New risk decisions: Radar Plus vs Pro vs Stripe Managed Risk, with no stage gates.

**New/redesigned encounters**
- FitStack: Attach Question, War Room, Partner Gateway (Facilitate), From Gateway to Gold, MSAP, Attach Campaign, Chargeback Goblins, Beyond the Gateway (embedded finance), Renewal War Map.
- RentFlow: Ledger of Rails, Council of Stewards, MSAP, Vault of Deposits (embedded finance), The Adyen Gambit.
- OrderOS: Imperial Audit, Emperor's Council, Emperor's Burden w/ Platform Pricing Tool, War Council (TAM/ProServ/Partner), MSAP, Fraud Dragon (Radar plans vs SMR), Scale Crucible (SMR vs Radar Pro + FTEs), Omnichannel Frontier (Terminal), Imperial Treasury (embedded finance), Competitor Raid.
- Renewals reward value case, MSAP, attach win, embedded financial services and successful defense (and penalize lost volume).

**Engine**
- Encounter ordering is index-stable: conditional encounters can't cause skips or repeats.
- Signed dice modifiers display correctly (negative values).
- Scoring: discovery and journey bonuses; rank/grade thresholds scaled for OrderOS volume.
