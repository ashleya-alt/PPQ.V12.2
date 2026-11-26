import { initGame, applyOutcome, calculateDiceModifiers, isChoiceAvailable, calculateFinalScore } from '../src/game/gameLogic';
import { getActiveEncounters, resolveChoice, nextActiveIdx } from '../src/game/resolveChoice';
import { GameState } from '../src/types';
import { fallbackPick, isMatch, isRank, roundCorrect } from '../src/game/minigame';

type SkillMode = 'correct' | 'wrong' | 'random';
type Picker = (encId: string, avail: number[], gs: GameState) => number;

function play(pid: string, pick: Picker, rng: () => number, verbose = false, skillMode: SkillMode = 'correct') {
  let gs: GameState = { ...initGame(pid), phase: 'encounter' };
  const trail: string[] = [];
  let guard = 0;
  while (guard++ < 60) {
    const encs = getActiveEncounters(pid, gs);
    const enc = encs[gs.currentEncIdx];
    if (enc.conditional && !enc.conditional(gs)) throw new Error('Landed on inactive encounter ' + enc.id);
    const avail = enc.choices.map((c, i) => i).filter(i => isChoiceAvailable(gs, enc.choices[i]));
    if (!avail.length) throw new Error('No choices available at ' + enc.id);
    const idx = pick(enc.id, avail, gs);
    if (!avail.includes(idx)) throw new Error(`Picked unavailable ${idx} at ${enc.id}`);
    const ch = enc.choices[idx];
    if (ch.minigame) {
      const picks = ch.minigame.rounds.map(round => {
        if (skillMode === 'correct') return fallbackPick(round, true);
        if (skillMode === 'wrong') return fallbackPick(round, false);
        if (isRank(round) || isMatch(round)) return rng() >= 0.5 ? 1 : 0;
        return Math.floor(rng() * round.options.length);
      });
      const correct = picks.filter((answer, roundIdx) => roundCorrect(ch.minigame!.rounds[roundIdx], answer)).length;
      gs = { ...gs, minigame: { picks, correct } };
    }
    let res;
    if (ch.useDice) {
      const mods = calculateDiceModifiers(gs, ch);
      const roll = 1 + Math.floor(rng() * 20);
      const total = roll + mods.reduce((s, m) => s + m.value, 0);
      gs = { ...gs, choiceIdx: idx, diceModifiers: mods };
      res = resolveChoice(gs, idx, total);
      if (!res.outcome.msg || res.outcome.msg === 'The path continues.') throw new Error('Unresolved dice outcome ' + enc.id + '#' + idx);
      gs = applyOutcome({ ...gs, diceResult: roll, diceTotal: total }, res, idx, roll, total);
      trail.push(`${enc.id}#${idx} d${roll}${mods.length ? '[' + mods.map(m => m.value).join(',') + ']' : ''}=${total}/${ch.diceThreshold}`);
    } else {
      gs = { ...gs, choiceIdx: idx, diceModifiers: [] };
      res = resolveChoice(gs, idx);
      if (!res.outcome.msg || res.outcome.msg === 'The path continues.') throw new Error('Unresolved outcome ' + enc.id + '#' + idx);
      gs = applyOutcome(gs, res, idx);
      trail.push(`${enc.id}#${idx}`);
    }
    for (const bad of ['Managed Payments', 'Managed Services', 'SaaS 1.0', 'SaaS 2.0', 'SaaS 3.0', 'Head of Payments joins']) {
      if ((res.outcome.msg + res.outcome.learn + JSON.stringify(res.counterfactuals)).includes(bad)) throw new Error(`Legacy term "${bad}" in ${enc.id}#${idx}`);
    }
    if (res.outcome.unlockCompanion === 'payments_lead') throw new Error('payments_lead unlocked at ' + enc.id);
    const nx = nextActiveIdx(pid, gs, gs.currentEncIdx);
    if (nx < 0) break;
    gs = { ...gs, currentEncIdx: nx, phase: 'encounter' };
  }
  const sc = calculateFinalScore(gs);
  if (verbose) console.log(trail.join(' > '));
  return { gs, sc, n: trail.length, trail };
}

// Seeded RNG
function mulberry(a: number) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const GOOD: Record<string, number> = {
  f_scout: 0, f_attach_q: 0, f_council: 0, f_decree: 0, f_technical: 0, f_whitelabel: 0, f_crucible: 0,
  f_msap: 0, f_attach_campaign: 0, f_harvest: 0, f_risk: 1, f_obj4: 0, f_rival: 0, f_renewal_prep: 0, f_renewal: 0,
  p_scout: 0, p_ledger: 1, p_council: 0, p_crossroads: 0, p_technical: 0, p_crucible: 0, p_msap: 0, p_uprising: 0, p_expansion: 0, p_cost: 0, p_obj4: 0, p_adyen: 0, p_renewal: 1,
  r_scout: 0, r_audit: 0, r_council: 0, r_burden: 0, r_technical: 0, r_tam_recruit: 1, r_enterprise: 0, r_msap: 0, r_fraud: 2, r_champion: 0, r_scale: 0, r_omni: 0, r_obj4: 0, r_raid: 0, r_renewal: 2,
};
const pickGood: Picker = (id, avail) => (GOOD[id] !== undefined && avail.includes(GOOD[id]) ? GOOD[id] : avail[0]);
const pickLazy: Picker = (id, avail) => {           // skips discovery, otherwise plays well
  const lazy: Record<string, number> = { f_scout: 0, f_attach_q: 2, f_council: 2, p_scout: 0, p_ledger: 2, p_council: 2, r_scout: 0, r_audit: 3, r_council: 2 };
  if (lazy[id] !== undefined) return lazy[id];
  return pickGood(id, avail, null as any);
};

for (const pid of ['fitness', 'property', 'restaurant']) {
  console.log('\n=== ' + pid + ' ===');
  for (const [name, pk] of [['GOOD', pickGood], ['NO-DISCOVERY', pickLazy]] as [string, Picker][]) {
    const tots: number[] = []; const revs: number[] = []; let succ = 0, rolls = 0;
    for (let s = 1; s <= 200; s++) {
      const r = play(pid, pk, mulberry(s));
      tots.push(r.sc.total); revs.push(r.gs.revenue);
      r.trail.forEach(t => { const m = t.match(/=(-?\d+)\/(\d+)/); if (m) { rolls++; if (+m[1] >= +m[2]) succ++; } });
      if (s === 1) { console.log(`${name}: ${r.n} encounters, journey=${r.gs.journey}, stage=${r.gs.stage}, companions=${r.gs.companions.join('/')}, boons=${r.gs.boons.join('/')}, mistakes=${r.gs.mistakes.length}`); console.log('  ' + r.trail.join(' > ')); }
    }
    const avg = (a: number[]) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
    tots.sort((a, b) => a - b);
    console.log(`  ${name}: avg score ${avg(tots)} (p10 ${tots[20]} p50 ${tots[100]} p90 ${tots[180]}) | avg revenue ${avg(revs)} | dice success ${Math.round(100 * succ / rolls)}%`);
  }
  // random fuzz
  const tots: number[] = []; const lens = new Set<number>();
  for (let s = 1; s <= 300; s++) {
    const rng = mulberry(1000 + s);
    const r = play(pid, (_id, avail) => avail[Math.floor(rng() * avail.length)], rng, false, 'random');
    tots.push(r.sc.total); lens.add(r.n);
  }
  tots.sort((a, b) => a - b);
  console.log(`  RANDOM x300: min ${tots[0]} p10 ${tots[30]} p50 ${tots[150]} p90 ${tots[270]} max ${tots[299]} | encounter counts ${[...lens].sort().join(',')}`);
}
