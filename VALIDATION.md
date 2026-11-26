# PPQ V12.2 — Release and validation report

Prepared November 25, 2026 for Ashley Afranie Sakyi.

## Deliverables

- `ppq-v12.2.zip`: source project, package version 12.2.0, reproducible game-logic tests, release documentation, and full overview.
- [Regenerated full overview](https://docs.google.com/document/d/1AxKbMz7TkSd5uVqygLfnlRhNM6r4ZyVuolfZYk1hJao): 18 chapters, 52 encounters, 176 choices, five mini-games, and a dedicated RentFlow buy-rate decision tree.
- Destination: [requested Drive folder](https://drive.google.com/drive/folders/15lXZapiA0eNwx3FnpMgjAK1OtQbzABvv).

## Implemented requirements

| Requirement | Implementation / evidence |
| --- | --- |
| Roads Not Taken after mini-games shows outcome tiers only | Four generic tiers with achieved tier highlighted; no hypothetical topics, answer keys, or unchosen encounter choices. `src/game/minigame.ts`, `src/components/index.tsx`. |
| Discovery uses exec-owner matching | Actual matching UI on all three platforms; four public executive statements ground the matching; answers/explanations stay hidden until submission. Readiness still uses rank-the-fixes. `src/components/Minigame.tsx`, `src/data/campaigns.ts`. |
| OrderOS Scale Crucible acknowledges Fraud Dragon | Four follow-ons for Radar Plus, Radar Pro, Managed Risk, or internal tooling; scaling choices rather than repeated product selection. `src/game/resolveV11.ts`, `src/data/campaigns.ts`. |
| Continue rather than result timer | Player starts roll, clicks Continue to result, then manually continues quest. Only die animation is timed. `src/components/index.tsx`, `src/App.tsx`. |
| Roll purpose before roll | Discovery rapport, readiness candor, and standard approach purposes appear before rolling. |
| Contrast and end-screen numbers | Inherited light foreground; brighter theme and accessible status colors; larger typography; no-wrap tabular score values, 4ch minimum width; responsive header/score rules. Source/assertion coverage only, not browser visual certification. |
| FitStack disputes single ask | Focused dispute-response ownership question with plausible alternate diagnostic questions. |
| RentFlow copy and benchmark | Competitors circling in intro; requested “so they are asking, why not RentFlow?” wording; balanced “no minimums” quotation; 180 bps consistently used. |
| De-duplicate discovery | Pre-work questions and workshop measurements differ across FitStack, RentFlow, and OrderOS; narrative outcomes updated with them. |
| RentFlow buy-rate overview | Full tree documents Crossroads, premature recovery/reversion/split, Crucible predicates, Cost of Power gates, Adyen defense and Grand Renewal options/modifiers. |
| Preserve earlier V12 feedback | Equal starting stats of 40; additive score and normalized revenue bonuses; five explained ranks; escaped-text and legacy-label sweep; First Harvest false-gateway teaching choice preserved. |

Independent review found and prompted fixes to mini-game discriminant types, the initial achieved-only tier implementation, executive-context gaps, stale three-round prose, and FitStack immediately re-offering white-label after retreat. These source issues are fixed in this archive.

## Validation that passed

- **16/16 regression checks**, run with `npm run test`.
- **2,100 seeded playthroughs**, across good, no-discovery, and random approaches on all three platforms.
- Deterministic campaign paths, including all four OrderOS risk-to-scale paths and RentFlow buy-rate recovery/renewal cases.
- Independent resolver sweep: **426 combinations**, no missing default outcome.
- Legacy/visible escape sweep.
- Strict offline TypeScript check of the **core/data graph** with Deno/TypeScript 5.8.3.
- Full source graph syntax/module bundling using esbuild with React externals.
- Overview validator: **357 assertions**, including every encounter and choice, 12/12 executive statements, and RentFlow tree mechanics.

The overview is a facilitator/reviewer artifact and intentionally includes answer keys and branch information. It is not the player's spoiler-free Roads Not Taken panel. Economics and product statements are fictional game content, not new commercial-policy verification.

## Blocked validation — must remain visible

**This is a source release, not a verified production build.** The sandbox has no project React/Vite/TypeScript dependencies, cannot reach npm, and has no browser runtime. Therefore:

- Installed-project `npm run typecheck` and **Vite production build are not verified**.
- **Browser interaction/visual QA is not performed**, including narrow viewport and 200% zoom.
- Supplemental React graph checking with local permissive stubs does not substitute for real React types.
- No live site was deployed or changed.

## Finish release validation in a dependency-enabled environment

From the unzipped `ppq-v12.2` folder:

```bash
npm install
npm run typecheck
npm run build
npm run test
npm run paths
npm run sim
npm run sweep
npm run dev
```

Browser acceptance pass:

1. All three discovery workshops: submit incorrect and correct executive slates; confirm answers reveal only after submission.
2. Both readiness assessments: rank controls work; platform readiness prerequisites still govern approval.
3. Hold completed dice and result screens beyond the previous timeout; confirm neither advances without a click.
4. Expand mini-game Roads Not Taken after zero, partial, three, and four correct rounds; all four generic tiers appear, only the achieved tier is highlighted, no unearned-topic text appears.
5. Check all OrderOS Fraud Dragon paths into Scale Crucible.
6. Inspect end-screen 100 values, signed bonuses, grades, and chronology at 320/375/480px and desktop, plus 200% zoom.

## Source lineage

- [Supplied V12 source archive](https://drive.google.com/file/d/1UXRW2hP843mBvTWKqtVXS7YceHfZQVCN/view)
- [V.12 playthrough notes](https://docs.google.com/document/d/1cGpwGQkMRmOnIDd32l7iYKWctwDX70pw44Hnxt2gwL8/edit?tab=t.lxvph9vyiu6k)
- [Previous V12 full overview](https://docs.google.com/document/d/1yz6THuBtGbe2YNWUn1DGE7T-gkACr_uMHmwexBLXT3M/edit)
- Prior Kai session: `tsk_63VMyH41TVIkCDMEG1K0B9SQ01K0B`.

The original source ZIP and prior overview were preserved. New files are delivered to the requested folder without broadening sharing.
