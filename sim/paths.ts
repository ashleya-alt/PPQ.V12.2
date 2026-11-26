import { initGame, applyOutcome, isChoiceAvailable } from '../src/game/gameLogic';
import { getActiveEncounters, resolveChoice, nextActiveIdx } from '../src/game/resolveChoice';
import { GameState } from '../src/types';
import { fallbackPick, roundCorrect } from '../src/game/minigame';
// script: map encounterId -> [choiceIdx, forceSuccess?]
function run(pid: string, script: Record<string, [number, boolean?]>, label: string) {
  let gs: GameState = { ...initGame(pid), phase: 'encounter', currentEncIdx: 0 } as any;
  const seen: string[] = [];
  while (true) {
    const encs = getActiveEncounters(pid, gs); const enc = encs[gs.currentEncIdx];
    const [idx, okFlag] = script[enc.id] || [enc.choices.findIndex(c => isChoiceAvailable(gs, c)), true];
    const ch = enc.choices[idx];
    if (ch.minigame) {
      const picks = ch.minigame.rounds.map(round => fallbackPick(round, okFlag !== false));
      gs = { ...gs, minigame: { picks, correct: picks.filter((answer, roundIdx) => roundCorrect(ch.minigame!.rounds[roundIdx], answer)).length } };
    }
    if (!isChoiceAvailable(gs, ch)) throw new Error(label + ': choice not available ' + enc.id + '#' + idx + ' ' + ch.label + '\n  path: ' + seen.join(' > ') + '\n  flags=' + gs.flags.join(','));
    const vis = enc.choices.map((c, i) => (isChoiceAvailable(gs, c) ? i : (c.hidden ? '_' : 'L'))).join('');
    let res;
    if (ch.useDice) { const total = okFlag === false ? -50 : 50; res = resolveChoice(gs, idx, total); gs = applyOutcome({ ...gs, diceResult: 10, diceTotal: total }, res, idx, 10, total); }
    else { res = resolveChoice(gs, idx); gs = applyOutcome(gs, res, idx); }
    seen.push(enc.id + '#' + idx + '[' + vis + ']' + ' st' + gs.stage);
    const nx = nextActiveIdx(pid, gs, gs.currentEncIdx);
    if (nx < 0) break;
    gs = { ...gs, currentEncIdx: nx };
  }
  console.log('\n' + label + '\n  ' + seen.join(' > ') + '\n  flags=' + gs.flags.join(',') + ' stage=' + gs.stage + ' mistakes=' + gs.mistakes.length);
}
run('fitness', { f_decree: [1, false], f_collapse: [0] }, 'WL-early fail -> retreat');
run('fitness', { f_decree: [1, false], f_collapse: [1, true] }, 'WL-early fail -> rebuild ok');
run('fitness', { f_decree: [1, true] }, 'WL-early success');
run('fitness', { f_decree: [2], f_convert: [1] }, 'gateway -> stay');
run('fitness', { f_decree: [2], f_convert: [2], f_margin_crisis: [1] }, 'gateway -> buyrate -> revert');
run('fitness', { f_whitelabel: [2], f_harvest: [4], f_rival: [3, true], f_renewal: [1] }, 'WL skip to buyrate -> optimize -> hold -> renewal BR');
run('fitness', { f_crucible: [0, true], f_harvest: [4], f_renewal: [1] }, 'crucible greenlight ready -> renewal BR');
run('fitness', { f_crucible: [2], f_harvest: [3], f_rival: [0, true] }, 'hold at crucible -> harvest push buyrate -> rival (expect [01_3])');
run('fitness', { f_crucible: [2], f_rival: [2] }, 'hold -> rival competitive buyrate');
run('property', { p_crossroads: [2], p_margin_crisis: [1], p_crucible: [1, true], p_renewal: [1] }, 'RF premature -> revert -> crucible');
run('property', { p_crossroads: [2], p_margin_crisis: [0], p_renewal: [0] }, 'RF premature -> segmented -> renewal BR (not ready)');
run('property', { p_uprising: [0, true], p_rentroll: [0, true] }, 'RF churn playbook');
run('property', { p_uprising: [1], p_expansion: [0, true], p_cost: [1] }, 'RF review-only, foreign shores LPM, optimize split');
run('property', { p_crossroads: [2], p_margin_crisis: [3], p_renewal: [4] }, 'RF premature -> split model -> renewal split');
run('property', { p_crucible: [1, true], p_renewal: [1] }, 'RF readiness minigame (no roadmap) -> not ready');
run('property', { p_crossroads: [1], p_technical: [0], p_crucible: [1, true], p_renewal: [4] }, 'RF readiness minigame ready? -> renewal split on healthy');
run('fitness', { f_crucible: [1, true], f_renewal: [1] }, 'FS readiness minigame ready -> BR renewal');
run('fitness', { f_conversion: [0, false], f_crucible: [1, true], f_renewal: [0] }, 'FS readiness minigame not ready (no conversion win) -> RS2 renewal');
run('fitness', { f_crucible: [1, false] }, 'FS readiness minigame fail');
run('fitness', { f_crucible: [0, false], f_reckoning: [0, true], f_renewal: [1] }, 'FS crucible fail -> wyrm margin lens -> renewal BR');
run('fitness', { f_crucible: [0, false], f_reckoning: [1], f_renewal: [4] }, 'FS crucible fail -> wyrm split -> renewal split');
run('fitness', { f_crucible: [0, false], f_reckoning: [2], f_renewal: [0] }, 'FS crucible fail -> wyrm full retreat -> RS2 renewal');
run('fitness', { f_crucible: [2], f_harvest: [3], f_reckoning: [3], f_renewal: [4] }, 'FS late push -> feed wyrm -> renewal split');
run('fitness', { f_council: [0, false] }, 'FS discovery minigame fail');
run('restaurant', { r_frontdoor: [0, true], r_omni: [0, true] }, 'OS front door');
run('restaurant', { r_fraud: [0, true], r_scale: [2, true] }, 'OS Radar Plus -> governed risk pod scale');
run('restaurant', { r_fraud: [1, true], r_scale: [1, true] }, 'OS Radar Pro -> specialist team scale');
run('restaurant', { r_fraud: [2], r_scale: [0, true] }, 'OS Managed Risk -> platform rollout scale');
run('restaurant', { r_fraud: [3], r_scale: [3, true] }, 'OS internal tooling -> funded risk ops scale');
