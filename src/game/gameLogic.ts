import { GameState, Stats, StatKey, ChoiceOutcome, CounterfactualSet, LogEntry, EncChoice } from '../types';
import { REVENUE_BENCHMARK, RANKS, PLATFORMS, STAT_META, COMPANIONS, BOONS, DISCOVERY } from '../data/constants';
import { getActiveEncounters } from './resolveChoice';
import { minigameOutcomeTier } from './minigame';

export function initGame(pid: string): GameState {
  const p = PLATFORMS.find(x => x.id === pid)!;
  return {
    phase: 'briefing',
    platformId: pid,
    currentEncIdx: 0,
    stats: { ...p.startStats },
    companions: ['sa'],
    boons: [],
    companionAbilitiesUsed: [],
    stage: p.startStage,
    journey: p.startJourney,
    revenue: 0,
    flags: [],
    choiceIdx: -1,
    diceResult: 0,
    diceModifiers: [],
    diceTotal: 0,
    resultMsg: '',
    resultLearn: '',
    resultRev: 0,
    resultStatChanges: {},
    counterfactuals: {},
    minigameResultTier: undefined,
    log: [],
    mistakes: [],
    sidebarOpen: false,
    currentChapter: 1,
    pendingChapterIntro: 0,
  };
}

export function calculateDiceModifiers(gs: GameState, choice: EncChoice): { label: string; value: number }[] {
  const mods: { label: string; value: number }[] = [];
  if (choice.diceStat) {
    const b = Math.floor(gs.stats[choice.diceStat] / 25);
    if (b > 0) mods.push({ label: STAT_META[choice.diceStat].label + ' (' + gs.stats[choice.diceStat] + ')', value: b });
  }
  if (choice.companionBonus) {
    for (const [cid, bonus] of Object.entries(choice.companionBonus)) {
      if (gs.companions.includes(cid)) {
        const c = COMPANIONS.find(x => x.id === cid);
        if (c) mods.push({ label: c.name, value: bonus });
      }
    }
  }
  if (choice.boonBonus) {
    for (const [bid, bonus] of Object.entries(choice.boonBonus)) {
      if (gs.boons.includes(bid)) {
        const b = BOONS.find(x => x.id === bid);
        if (b) mods.push({ label: b.name, value: bonus });
      }
    }
  }
  // Grow / Retain boons: +1 on Trust rolls.
  if (choice.diceStat === 'trust') {
    if (gs.boons.includes('recurring_ledger')) mods.push({ label: 'Recurring Ledger', value: 1 });
    if (gs.boons.includes('merchant_loyalty')) mods.push({ label: 'Merchant Loyalty Amulet', value: 1 });
  }
  // Mini-game: each correct read is +2, each misread -2.
  if (choice.minigame && gs.minigame) {
    const wrong = choice.minigame.rounds.length - gs.minigame.correct;
    if (gs.minigame.correct > 0) mods.push({ label: '\u2705 Correct reads (' + gs.minigame.correct + ')', value: 2 * gs.minigame.correct });
    if (wrong > 0) mods.push({ label: '\u274C Misreads (' + wrong + ')', value: -2 * wrong });
  }
  // v11: discovery is the main dice modifier. Uncovered = +2 each, missing = -2 each.
  if (choice.discovery) {
    for (const flag of choice.discovery) {
      const d = DISCOVERY[flag];
      const name = d ? d.label : flag;
      if (gs.flags.includes(flag)) mods.push({ label: '\u{1F50D} Discovery: ' + name, value: 2 });
      else mods.push({ label: '\u2753 Guessing: ' + name, value: -2 });
    }
  }
  return mods;
}

/** v11: journey phase can never trail what the platform has actually done. */
export function journeyFloor(stage: number, flags: string[], boons: string[]): number {
  let j = 0;
  if (flags.includes('facilitate_only')) j = 1;
  if (stage >= 1) j = 2;
  if (boons.includes('speed_talisman') || flags.includes('attach_win') || flags.includes('terminal_attach')) j = Math.max(j, 3);
  if (boons.includes('treasury_key') || boons.includes('merchant_loyalty') || flags.includes('obj4_bundle')) j = Math.max(j, 4);
  return j;
}

export function applyOutcome(
  gs: GameState,
  result: { outcome: ChoiceOutcome; counterfactuals: CounterfactualSet },
  choiceIdx: number,
  diceRoll?: number,
  diceTotal?: number
): GameState {
  const outcome = result.outcome;
  const encs = getActiveEncounters(gs.platformId, gs);
  const enc = encs[gs.currentEncIdx];
  const choice = enc.choices[choiceIdx];

  const newStats = { ...gs.stats };
  for (const [k, v] of Object.entries(outcome.stats)) {
    newStats[k as StatKey] = Math.max(0, Math.min(100, newStats[k as StatKey] + (v as number)));
  }

  let newC = [...gs.companions];
  if (outcome.unlockCompanion && !newC.includes(outcome.unlockCompanion)) newC.push(outcome.unlockCompanion);

  let newB = [...gs.boons];
  if (outcome.unlockBoon && !newB.includes(outcome.unlockBoon)) newB.push(outcome.unlockBoon);

  let newF = [...gs.flags];
  if (outcome.addFlag) outcome.addFlag.split(',').forEach(f => { if (!newF.includes(f.trim())) newF.push(f.trim()); });
  if (outcome.removeFlag) { const rm = outcome.removeFlag.split(',').map(f => f.trim()); newF = newF.filter(f => !rm.includes(f)); }

  let newStage = outcome.advanceStage !== undefined ? Math.max(gs.stage, outcome.advanceStage) : gs.stage;
  if (outcome.revertStage !== undefined) newStage = outcome.revertStage;

  const newJ = Math.max(gs.journey || 0, outcome.advanceJourney || 0, journeyFloor(newStage, newF, newB));

  const newM = outcome.mistake ? [...gs.mistakes, outcome.mistake] : gs.mistakes;
  let discoveryNote: string | undefined;
  if (diceRoll !== undefined && gs.diceModifiers.length) {
    const d = gs.diceModifiers.filter(m => m.label.includes('Discovery:') || m.label.includes('Guessing:'));
    if (d.length) discoveryNote = d.map(m => (m.value > 0 ? '+' : '') + m.value + ' ' + m.label.replace(/^\S+ /, '')).join(' \u00B7 ');
  }
  const logEntry: LogEntry = { nodeId: enc.id, title: enc.title, choiceLabel: choice.label, msg: outcome.msg, rev: outcome.rev, diceRoll, diceTotal, journey: newJ, discoveryNote };
  const minigameResultTier = choice.minigame && gs.minigame
    ? minigameOutcomeTier(gs.minigame.correct, choice.minigame.rounds.length, (diceTotal ?? 0) >= (choice.diceThreshold || 12))
    : undefined;

  return {
    ...gs,
    minigame: undefined,
    phase: 'result',
    stats: newStats,
    companions: newC,
    boons: newB,
    flags: newF,
    stage: newStage,
    journey: newJ,
    revenue: gs.revenue + outcome.rev,
    resultMsg: outcome.msg,
    resultLearn: outcome.learn,
    resultRev: outcome.rev,
    resultStatChanges: outcome.stats,
    counterfactuals: result.counterfactuals,
    minigameResultTier,
    log: [...gs.log, logEntry],
    mistakes: newM,
  };
}

export function isChoiceAvailable(gs: GameState, choice: EncChoice): boolean {
  if (!choice.requires) return true;
  const r = choice.requires;
  if (r.companion && !gs.companions.includes(r.companion)) return false;
  if (r.boon && !gs.boons.includes(r.boon)) return false;
  if (r.stat && gs.stats[r.stat[0]] < r.stat[1]) return false;
  if (r.flag && !gs.flags.includes(r.flag)) return false;
  if (r.notFlag && gs.flags.includes(r.notFlag)) return false;
  if (r.stage !== undefined && gs.stage < r.stage) return false;
  if (r.companionCount !== undefined && gs.companions.length < r.companionCount) return false;
  return true;
}

export function getLetterGrade(val: number): { letter: string; color: string } {
  if (val >= 80) return { letter: 'A', color: '#f4d96b' };
  if (val >= 65) return { letter: 'B+', color: '#6fd58a' };
  if (val >= 50) return { letter: 'B', color: '#8eddb0' };
  if (val >= 35) return { letter: 'C+', color: '#ffb75d' };
  if (val >= 20) return { letter: 'C', color: '#ff8f8f' };
  return { letter: 'D', color: '#ff7777' };
}

export function getArchetype(stats: Stats): { name: string; desc: string } {
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  const top2 = sorted.slice(0, 2).map(s => s[0]);
  if (top2.includes('trust') && top2.includes('execAccess')) return { name: 'The Diplomat', desc: 'Builds relationships at every level.' };
  if (top2.includes('trust') && top2.includes('productMastery')) return { name: 'The Strategist', desc: 'Long-term value player.' };
  if (top2.includes('techCred') && top2.includes('productMastery')) return { name: 'The Architect', desc: 'Technically deep. Designs solutions that last.' };
  if (top2.includes('execAccess') && top2.includes('techCred')) return { name: 'The Closer', desc: 'Gets things done at the top with technical backing.' };
  if (top2.includes('trust') && top2.includes('techCred')) return { name: 'The Trusted Engineer', desc: 'Earns belief by being right about how things work.' };
  if (top2.includes('execAccess') && top2.includes('productMastery')) return { name: 'The Executive Seller', desc: 'Brings the right product to the right room.' };
  const min = Math.min(...Object.values(stats));
  if (min >= 40) return { name: 'The Complete AE', desc: 'Balanced across all dimensions.' };
  return { name: 'The Specialist', desc: 'Deep expertise in key areas, with room to grow.' };
}

export function revenueTier(gs: GameState): { pct: number; bonus: number } {
  const bench = REVENUE_BENCHMARK[gs.platformId] || 600000;
  const pct = gs.revenue / bench;
  const bonus = pct >= 1.25 ? 125 : pct >= 1 ? 100 : pct >= 0.75 ? 75 : pct >= 0.5 ? 50 : pct >= 0.25 ? 25 : 0;
  return { pct, bonus };
}

export function rankFor(total: number) {
  let r = RANKS[0];
  for (const x of RANKS) if (total >= x.min) r = x;
  return r;
}

/** v12 score: plain addition. Four stats + revenue tier bonus + 5 per discovery topic + journey bonus, minus 10 per misstep. */
export function calculateFinalScore(gs: GameState) {
  const statTotal = gs.stats.trust + gs.stats.techCred + gs.stats.execAccess + gs.stats.productMastery;
  const rt = revenueTier(gs);
  const discovered = Object.keys(DISCOVERY).filter(k => gs.flags.includes(k)).length;
  const discoveryBonus = discovered * 5;
  const journeyBonus = (gs.journey || 0) >= 4 ? 50 : (gs.journey || 0) >= 3 ? 25 : 0;
  const mistakePenalty = gs.mistakes.length * 10;
  const total = Math.max(0, statTotal + rt.bonus + discoveryBonus + journeyBonus - mistakePenalty);
  const bench = REVENUE_BENCHMARK[gs.platformId] || 600000;
  const revGrade = rt.pct >= 1 ? { letter: 'A', color: '#f4d96b' } : rt.pct >= 0.75 ? { letter: 'B+', color: '#6fd58a' } : rt.pct >= 0.5 ? { letter: 'B', color: '#8eddb0' } : rt.pct >= 0.25 ? { letter: 'C+', color: '#ffb75d' } : { letter: 'C', color: '#ff8f8f' };
  return { total, statTotal, revBonus: rt.bonus, revPct: rt.pct, bench, revGrade, mistakePenalty, discovered, discoveryBonus, journeyBonus, rank: rankFor(total), archetype: getArchetype(gs.stats) };
}
