import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CAMPAIGNS } from '../src/data/campaigns';
import { DISCOVERY, JOURNEY, PLATFORMS, RANKS, STAGES } from '../src/data/constants';
import { applyOutcome, calculateFinalScore, getLetterGrade, initGame, isChoiceAvailable } from '../src/game/gameLogic';
import { fallbackPick, isMatch, isRank, matchIsCorrect, minigameOutcomeTier, roundCorrect } from '../src/game/minigame';
import { resolveChoice } from '../src/game/resolveChoice';
import { GameState, MinigameMatchRound } from '../src/types';

let checks = 0;
function check(name: string, fn: () => void) {
  fn(); checks += 1; console.log('✓ ' + name);
}
function encounter(pid: string, id: string) {
  const index = CAMPAIGNS[pid].findIndex(e => e.id === id);
  assert.ok(index >= 0, `missing ${pid}/${id}`);
  return { index, enc: CAMPAIGNS[pid][index] };
}
function stateAt(pid: string, id: string, patch: Partial<GameState> = {}): GameState {
  const { index } = encounter(pid, id);
  return { ...initGame(pid), phase: 'encounter', currentEncIdx: index, ...patch };
}
function resolveAt(pid: string, id: string, choice: number, patch: Partial<GameState> = {}, total?: number) {
  const gs = stateAt(pid, id, { ...patch, choiceIdx: choice });
  return { gs, result: resolveChoice(gs, choice, total) };
}

check('all three discovery workshops end in real matching rounds', () => {
  for (const [pid, id] of [['fitness','f_council'], ['property','p_council'], ['restaurant','r_council']] as const) {
    const round = encounter(pid, id).enc.choices[0].minigame!.rounds[3];
    assert.ok(isMatch(round), `${id} round 4 is not match`);
    assert.equal(round.concerns.length, 4);
    assert.equal(round.executives.length, 4);
    assert.equal(new Set(round.correctMatches).size, 4);
    assert.equal(matchIsCorrect(round, round.correctMatches), true);
    const wrong = [...round.correctMatches]; [wrong[0], wrong[1]] = [wrong[1], wrong[0]];
    assert.equal(matchIsCorrect(round, wrong), false);
    assert.equal(fallbackPick(round, true), 1);
    assert.equal(fallbackPick(round, false), 0);
  }
});

check('readiness assessments remain ranking interactions', () => {
  for (const [pid, id] of [['fitness','f_crucible'], ['property','p_crucible']] as const) {
    const round = encounter(pid, id).enc.choices[1].minigame!.rounds[3];
    assert.ok(isRank(round), `${id} readiness round 4 must stay rank`);
  }
});

check('matching UI withholds answer owners until the submitted slate is locked', () => {
  const ui = fs.readFileSync('src/components/Minigame.tsx', 'utf8');
  assert.match(ui, /function MatchRound/);
  assert.match(ui, /Answers stay hidden until you submit the full slate/);
  assert.match(ui, /disabled=\{locked\}/);
  assert.match(ui, /\{locked && <div/);
  assert.match(ui, /Submit all matches/);
});

check('every owner match is grounded in visible executive statements without an OrderOS pre-work answer key', () => {
  for (const [pid, id] of [['fitness','f_council'], ['property','p_council'], ['restaurant','r_council']] as const) {
    const mg = encounter(pid, id).enc.choices[0].minigame!;
    const match = mg.rounds[3] as MinigameMatchRound;
    assert.equal(mg.openingStatements?.length, 4, `${id} needs four opening statements`);
    assert.deepEqual(new Set(mg.openingStatements!.map(s => s.speaker)), new Set(match.executives));
    for (const statement of mg.openingStatements!) {
      assert.ok(statement.statement.length >= 30, `${statement.speaker} statement is not credible evidence`);
      assert.doesNotMatch(statement.statement, /private success measure|real objective/i);
    }
  }
  const ui = fs.readFileSync('src/components/Minigame.tsx', 'utf8');
  assert.match(ui, /What the executives said/);
  const audit = resolveAt('restaurant','r_audit',1).result.outcome;
  const preMatch = audit.msg + ' ' + audit.learn;
  assert.doesNotMatch(preMatch, /CFO owns margin|CRO owns in-store attach|Head of Risk owns|COO owns/i);
  assert.match(preMatch, /still need to state what they will carry/i);
});

check('partial mini-game records a privacy-safe achieved tier for the generic ladder', () => {
  const { index, enc } = encounter('fitness', 'f_council');
  const mg = enc.choices[0].minigame!;
  const picks = mg.rounds.map(r => fallbackPick(r, true));
  picks[0] = fallbackPick(mg.rounds[0], false);
  picks[1] = fallbackPick(mg.rounds[1], false);
  const correct = picks.filter((p, r) => roundCorrect(mg.rounds[r], p)).length;
  let gs = { ...initGame('fitness'), phase: 'encounter' as const, currentEncIdx: index, choiceIdx: 0, minigame: { picks, correct } };
  const result = resolveChoice(gs, 0, -50);
  gs = applyOutcome(gs, result, 0, 1, -50);
  assert.equal(correct, 2);
  assert.equal(gs.minigameResultTier?.id, 'partial');
  assert.equal(gs.minigameResultTier?.label, 'Partial read');
  const tier = JSON.stringify(gs.minigameResultTier);
  for (const topic of Object.values(DISCOVERY)) assert.equal(tier.includes(topic.label), false, `tier leaked ${topic.label}`);
});

check('zero-success mini-game earns no topic and reveals no hypothetical topic', () => {
  const { index, enc } = encounter('property', 'p_council');
  const mg = enc.choices[0].minigame!;
  const picks = mg.rounds.map(r => fallbackPick(r, false));
  let gs = { ...initGame('property'), phase: 'encounter' as const, currentEncIdx: index, choiceIdx: 0, minigame: { picks, correct: 0 } };
  const result = resolveChoice(gs, 0, -50);
  gs = applyOutcome(gs, result, 0, 1, -50);
  assert.equal(gs.minigameResultTier?.id, 'none');
  assert.equal(gs.minigameResultTier?.label, 'No read');
  assert.match(gs.minigameResultTier!.summary, /No discovery topic was earned/);
  assert.equal(Object.keys(DISCOVERY).some(flag => gs.flags.includes(flag)), false);
});

check('mini-game Roads Not Taken renders all four generic tiers, highlights achieved, and preserves privacy', () => {
  const ui = fs.readFileSync('src/components/index.tsx', 'utf8');
  assert.match(ui, /MINIGAME_OUTCOME_TIERS\.map/);
  assert.match(ui, /data-achieved=\{achieved\?'true':'false'\}/);
  assert.match(ui, /Generic better and worse outcomes are shown/);
  assert.match(ui, /Questions, answers, choices, and unearned topics stay private/);
  assert.match(ui, /expanded&&!minigameTier/);
  const tiers = [
    minigameOutcomeTier(4,4,true), minigameOutcomeTier(3,4,false),
    minigameOutcomeTier(2,4,false), minigameOutcomeTier(0,4,false),
  ];
  assert.deepEqual(tiers.map(t=>t.id), ['clear','strong','partial','none']);
  for (const c of tiers) assert.doesNotMatch(JSON.stringify(c), /Payments Economics|Exec Priorities|Competitive Landscape|Merchant Needs|Risk Profile|Payments Attach|correct answer|choice/i);
});

check('dice purpose is visible before a manual roll and result transition', () => {
  const ui = fs.readFileSync('src/components/index.tsx', 'utf8');
  const app = fs.readFileSync('src/App.tsx', 'utf8');
  assert.match(ui, /What this roll decides/);
  assert.match(ui, /Ready to roll/);
  assert.match(ui, /Roll the d20/);
  assert.match(ui, /Continue to result/);
  assert.match(app, /minigame\?\.rollLabel/);
  assert.match(JSON.stringify(encounter('fitness','f_council').enc.choices[0].minigame), /Executive rapport/);
});

check('results have no advance timer and Continue is guarded to one call', () => {
  const ui = fs.readFileSync('src/components/index.tsx', 'utf8');
  const app = fs.readFileSync('src/App.tsx', 'utf8');
  assert.doesNotMatch(app, /setTimeout/);
  assert.doesNotMatch(ui, /setTimeout\(\(\)=>onResult/);
  assert.match(ui, /const advanceOnce=\(\)=>\{if\(advanced\)return/);
  assert.match(ui, /onClick=\{advanceOnce\}/);
});

check('preceding discovery asks do not duplicate workshop measurements', () => {
  const pairs = [
    ['fitness','f_attach_q','f_council'], ['property','p_ledger','p_council'], ['restaurant','r_audit','r_council'],
  ] as const;
  for (const [pid, beforeId, workshopId] of pairs) {
    const before = encounter(pid, beforeId).enc.choices.map(c => c.label);
    const workshop = encounter(pid, workshopId).enc.choices[0].minigame!;
    const correctQuestions = workshop.rounds.slice(0,3).flatMap(r => isMatch(r) || isRank(r) ? [] : r.options.filter(o => o.correct).map(o => o.label));
    assert.equal(before.some(x => correctQuestions.includes(x)), false, `${pid} has a duplicate question`);
  }
  assert.match(encounter('fitness','f_council').enc.choices[0].minigame!.rounds[0].prompt, /CEO opens/);
  assert.match(encounter('restaurant','r_council').enc.choices[0].minigame!.rounds[1].prompt, /in-store/i);
});

check('FitStack dispute discovery is one focused ask with plausible alternatives', () => {
  const round = encounter('fitness','f_council').enc.choices[0].minigame!.rounds[2];
  assert.ok(!isMatch(round) && !isRank(round));
  assert.equal(round.options.length, 3);
  assert.equal(round.options.filter(o => o.correct).length, 1);
  assert.equal(round.options.every(o => o.label.endsWith('?"')), true);
  assert.equal((round.options.find(o => o.correct)!.label.match(/\?/g) || []).length, 1);
});

check('four-round helper prose, reveal maxima, and FitStack retreat gating stay consistent', () => {
  const resolver = fs.readFileSync('src/game/resolveV11.ts', 'utf8');
  assert.match(resolver, /three pick questions plus a fourth owner-match decision/);
  assert.match(resolver, /three pick questions plus a fourth prioritization round/);
  assert.match(resolver, /All four decisions must land for a perfect verdict/);
  assert.doesNotMatch(resolver, /Three green lights approve buy rate/);
  for (const [pid, id] of [['fitness','f_council'], ['property','p_council'], ['restaurant','r_council']] as const) {
    const { index, enc } = encounter(pid, id);
    const mg = enc.choices[0].minigame!;
    assert.equal(mg.rounds.length, 4);
    const picks = mg.rounds.map(r => fallbackPick(r, true));
    const gs = { ...initGame(pid), phase: 'encounter' as const, currentEncIdx: index, choiceIdx: 0, minigame: { picks, correct: 4 } };
    const earned = (resolveChoice(gs, 0, 50).outcome.addFlag || '').split(',').filter(Boolean);
    assert.equal(earned.length, 5, `${id} perfect workshop should earn four round reveals plus one rapport bonus`);
  }
  for (const [pid, id] of [['fitness','f_crucible'], ['property','p_crucible']] as const) {
    assert.equal(encounter(pid, id).enc.choices[1].minigame!.rounds.length, 4);
  }
  const whiteLabel = encounter('fitness','f_whitelabel').enc;
  assert.equal(whiteLabel.conditional!(stateAt('fitness','f_whitelabel',{stage:1,flags:['retreated_whitelabel']})), false);
  assert.equal(whiteLabel.conditional!(stateAt('fitness','f_whitelabel',{stage:1,flags:[]})), true);
});

check('OrderOS Scale Crucible acknowledges and scales every Fraud Dragon path', () => {
  const routes = [
    { fraud: 0, flag: 'fraud_plus', scale: 2, phrase: 'earlier Radar Plus choice' },
    { fraud: 1, flag: 'radar_pro', scale: 1, phrase: 'earlier Radar Pro choice' },
    { fraud: 2, flag: 'managed_risk', scale: 0, phrase: 'Fraud Dragon decision' },
    { fraud: 3, flag: 'fraud_internal', scale: 3, phrase: 'earlier internal-tooling choice' },
  ];
  for (const route of routes) {
    const fraud = resolveAt('restaurant','r_fraud',route.fraud,{},50).result;
    assert.match(fraud.outcome.addFlag || '', new RegExp(route.flag));
    const scale = encounter('restaurant','r_scale');
    const gs = stateAt('restaurant','r_scale',{ flags:[route.flag] });
    assert.equal(isChoiceAvailable(gs, scale.enc.choices[route.scale]), true);
    const outcome = resolveChoice(gs, route.scale, 50).outcome;
    assert.match(outcome.msg + outcome.learn, new RegExp(route.phrase, 'i'));
  }
  assert.doesNotMatch(encounter('restaurant','r_scale').enc.flavor, /Which Radar plan|or Managed Risk\?/i);
});

check('RentFlow wording and 180 bps benchmark are consistent', () => {
  const rent = PLATFORMS.find(p => p.id === 'property')!;
  assert.match(rent.briefing, /Competitors are circling RentFlow/);
  assert.match(rent.briefing, /so they are asking, why not RentFlow\?/);
  const source = fs.readFileSync('src/data/campaigns.ts','utf8') + fs.readFileSync('src/data/constants.ts','utf8');
  assert.doesNotMatch(source, /60 bps/);
  assert.match(source, /180 bps/);
  const close = resolveAt('property','p_adyen',0,{},50).result.outcome.msg;
  assert.match(close, /"No minimums" does not mean no obligations/);
});

check('RentFlow Grand Renewal buy-rate branches and prerequisites remain factual', () => {
  const renewal = encounter('property','p_renewal').enc;
  const held = stateAt('property','p_renewal',{ flags:[] });
  assert.equal(isChoiceAvailable(held, renewal.choices[0]), false);
  assert.equal(isChoiceAvailable(held, renewal.choices[1]), true);
  assert.match(resolveChoice(held,1).outcome.msg,/Rev Share 2\.0/);

  const premature = stateAt('property','p_renewal',{ flags:['on_buyrate','premature_buyrate'] });
  assert.equal(isChoiceAvailable(premature, renewal.choices[0]), true);
  assert.equal(isChoiceAvailable(premature, renewal.choices[1]), false);
  assert.match(resolveChoice(premature,0).outcome.msg,/never proved it was ready/);

  const ready = stateAt('property','p_renewal',{ flags:['on_buyrate','buy_rate_ready','ach_priced'] });
  assert.match(resolveChoice(ready,0).outcome.msg,/owns its payments business/);

  const split = stateAt('property','p_renewal',{ flags:['on_buyrate','premature_buyrate','split_model'] });
  const splitOutcome = resolveChoice(split,4).outcome;
  assert.match(splitOutcome.msg,/New properties onboard on Rev Share 2\.0/);
  assert.equal(splitOutcome.rev, 72000);

  const healthySplit = stateAt('property','p_renewal',{ flags:['on_buyrate','buy_rate_ready'] });
  assert.match(resolveChoice(healthySplit,4).outcome.mistake || '',/Split a healthy buy rate/);

  const riskExpansion = stateAt('property','p_renewal',{ flags:['disc_risk'] });
  assert.equal(isChoiceAvailable(riskExpansion,renewal.choices[2]),true);
});

check('readable typography, responsive score/header layout, accessible status colors, neutral starts, additive scoring, and five ranks are preserved', () => {
  const theme = fs.readFileSync('src/theme.ts','utf8');
  const ui = fs.readFileSync('src/components/index.tsx','utf8');
  const app = fs.readFileSync('src/App.tsx','utf8');
  const mini = fs.readFileSync('src/components/Minigame.tsx','utf8');
  assert.doesNotMatch(theme, /word-break:break-word/);
  assert.match(theme, /\.score-number\{white-space:nowrap[^}]+min-width:4ch/);
  assert.match(theme, /\.game-header[^\n]+flex-wrap:wrap/);
  assert.match(theme, /\.score-row\{[^}]+flex-wrap:wrap/);
  assert.match(app, /className="game-header"/);
  assert.match(app, /className="score-strip"/);
  assert.match(ui, /className="score-number"/);
  for (const source of [ui, app, mini]) assert.doesNotMatch(source, /fontSize:\s*(?:[0-9]|1[01])\b/, 'meaningful source text must be at least 12px');
  const luminance = (hex:string) => {
    const channels = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(v => v <= 0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4);
    return 0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];
  };
  const contrast = (a:string,b:string) => { const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x); return (hi+0.05)/(lo+0.05); };
  for (const item of [...JOURNEY,...STAGES]) assert.ok(contrast(item.color,'#0a0804') > 4.5, `${item.title} color contrast`);
  for (const value of [0,20,35,50,65,80,100]) assert.ok(contrast(getLetterGrade(value).color,'#1a1510') > 4.5, `grade ${value} color contrast`);
  for (const p of PLATFORMS) assert.deepEqual(p.startStats,{trust:40,techCred:40,execAccess:40,productMastery:40});
  assert.equal(RANKS.length,5);
  const gs = initGame('fitness');
  const score = calculateFinalScore(gs);
  assert.equal(score.total,160);
  assert.equal(score.statTotal,160);
});

console.log(`\nV12.2 regression suite passed: ${checks} checks.`);
