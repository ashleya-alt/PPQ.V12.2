# Platform Payments Quest RPG — V12.2

An interactive RPG-style training tool for Stripe AEs learning platform payments monetization. Package version: **12.2.0**.

## Quick Deploy to Vercel

### Option A: Via GitHub (Recommended)

1. **Create a new GitHub repo:**
   ```bash
   # In this project folder:
   git init
   git add .
   git commit -m "Platform Payments Quest RPG V12.2"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/platform-payments-quest.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Framework preset: **Vite**
   - Click **Deploy**
   - Done! You'll get a URL like `platform-payments-quest.vercel.app`

### Option B: Via Vercel CLI

```bash
npm install -g vercel
cd platform-payments-quest
npm install
vercel
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── App.tsx                      # Main game controller (journey + pricing badges, chapter flow)
├── main.tsx                     # React entry point
├── types.ts                     # All TypeScript interfaces
├── theme.ts                     # Colors, styles, CSS
├── components/
│   ├── index.tsx                # Main UI components (journey, manual dice/result Continue, debrief)
│   └── Minigame.tsx             # Pick, true concern-to-executive match, and readiness-rank interactions
├── data/
│   ├── constants.ts             # Journey, pricing models, discovery topics, allies, boons, platforms, chapters
│   ├── campaigns.ts             # V12.2 campaign order, mini-games, and patched legacy encounters
│   ├── encounters-fitness.ts    # Base v10 FitStack encounters (patched in campaigns.ts)
│   ├── encounters-property.ts   # Base v10 RentFlow encounters
│   └── encounters-restaurant.ts # Base v10 OrderOS encounters
└── game/
    ├── gameLogic.ts             # Init, dice + discovery modifiers, journey, scoring
    ├── resolveChoice.ts         # Encounter ordering + v10 outcomes for unchanged encounters
    └── resolveV11.ts            # Outcomes for all new / redesigned v11 encounters
sim/
├── regression-v12.2.ts          # Deterministic V12.2 behavior/content regression suite
├── simulate.ts                  # Headless playthrough simulator (good / no-discovery / random)
├── paths.ts                     # Deterministic branch/path simulations
└── sweep.ts                     # Legacy-term and visible-escape sweep
```

## Validation

After `npm install`:

```bash
npm run test
npm run typecheck
npm run build
npm run sim
npm run paths
npm run sweep
```

V12.2 discovery workshops use a real concern-to-executive matching interaction on all three platforms. Four short executive statements appear before the interaction so ownership is grounded in what the customer said, while answers remain hidden until submit; readiness assessments retain their rank-the-fixes interaction. Dice purpose is shown before rolling, dice outcomes and meeting results wait for explicit Continue clicks, and mini-game Roads Not Taken panels compare all four generic outcome tiers with the achieved tier highlighted. The ladder never exposes unearned topics, questions, answers, or choices.

## The Stripe Journey

**Launch → Facilitate → Monetize → Grow → Retain.** Pricing models (Subscription, Rev Share, Rev Share 2.0,
Buy Rate, Segmented, IC++) are levers *inside* Monetize and are shown separately from the journey phase.

| Platform | Starts at | Chapters | Story |
|---|---|---|---|
| 🏋️ FitStack | Launch | 7 | The Attach Win: discovery → rev share (not white-label!) → Conversion Forge → Buy Rate Crucible → Billing / Instant Payouts / Terminal → embedded financial services → Adyen → renewal |
| 🏠 RentFlow | Monetize (Rev Share 2.0) | 6 | The Crossroads: debit/ACH economics → dual-rail pricing & Foreign Shores → churn playbook (MSAP, Merchant Uprising, The Rent Roll) → Vault of Deposits (embedded finance) → The Adyen Gambit |
| 🍕 OrderOS | Monetize (blended buy rate) | 5 | The Empire: Platform Pricing Tool → Terminal as the front door → allies → Radar Plus/Pro vs SMR → omnichannel rollout → embedded finance → raid |

## Features

- **Discovery drives the dice:** 6 discovery topics (attach, economics, risk, merchant needs/embedded financial services, competition,
  exec priorities). Each uncovered topic a roll depends on gives **+2**; each missing one is a **−2 Guessing** penalty.
  Discovery also reveals hidden signals 🔍 and unlocks hidden choices.
- **Allies:** SA (always), TAM, ProServ, Implementation Partner, Stripe Partner Ecosystem (SPE). Earn the **MSAP**
  (Mutual Success & Activation Plan) boon to protect activation, defense, and renewal.
- **Risk:** Radar Standard → Plus → Pro, or Stripe Managed Risk (SMR). The right answer depends on discovery, not maturity.
- **embedded financial services:** monetize outside payments with Capital, Financial Accounts/Treasury, and Issuing.
- **Competitive defense:** Adyen appears on every platform; total-value narratives backed by discovery win.
- Signal Panel (🟢/🟡/🚩), d20 dice, Roads Not Taken counterfactuals, archetypes, letter grades.
- Score uses plain addition: four stats + normalized revenue tier bonus + 5 per discovery topic + journey bonus
  (Grow +25, Retain +50), minus 10 per misstep.

See `CHANGELOG.md` for the V12.2 release details and prior changes.
