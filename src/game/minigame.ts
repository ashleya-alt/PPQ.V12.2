import { MinigameRound, MinigameRankRound, MinigameMatchRound, MinigameOutcomeTier } from '../types';

export function isRank(r: MinigameRound): r is MinigameRankRound { return r.type === 'rank'; }
export function isMatch(r: MinigameRound): r is MinigameMatchRound { return r.type === 'match'; }

/** A ranking counts as correct when the top priority is right and no item is more than one slot out of place. */
export function rankIsCorrect(round: MinigameRankRound, order: number[]): boolean {
  if (order.length !== round.correctOrder.length || order[0] !== round.correctOrder[0]) return false;
  return order.every((item, pos) => Math.abs(round.correctOrder.indexOf(item) - pos) <= 1);
}

/** A match is correct only when every concern is assigned to its owning executive. */
export function matchIsCorrect(round: MinigameMatchRound, matches: number[]): boolean {
  return matches.length === round.correctMatches.length && matches.every((executive, concern) => executive === round.correctMatches[concern]);
}

/** Was round r answered correctly, given the stored pick value? Complex rounds store 1/0 after their UI validates the submitted arrangement. */
export function roundCorrect(round: MinigameRound, pick: number | undefined): boolean {
  if (pick === undefined) return false;
  if (isRank(round) || isMatch(round)) return pick === 1;
  return !!round.options[pick]?.correct;
}

/** Discovery flag revealed by a correctly answered round, if any. */
export function roundReveal(round: MinigameRound, pick: number | undefined): string | undefined {
  if (!roundCorrect(round, pick)) return undefined;
  if (isRank(round) || isMatch(round)) return round.reveal;
  return round.options[pick!]?.reveal;
}

/** Simulator fallback: the pick value for an all-correct (ok) or all-wrong run. */
export function fallbackPick(round: MinigameRound, ok: boolean): number {
  if (isRank(round) || isMatch(round)) return ok ? 1 : 0;
  return ok ? round.options.findIndex(o => o.correct) : round.options.findIndex(o => !o.correct);
}

export const MINIGAME_OUTCOME_TIERS: readonly MinigameOutcomeTier[] = [
  { id: 'clear', label: 'Clear read', summary: 'All four decisions land; skill secures the strongest meeting outcome.' },
  { id: 'strong', label: 'Strong read', summary: 'Three decisions land; the meeting produces a useful, bounded outcome.' },
  { id: 'partial', label: 'Partial read', summary: 'Some decisions land; the outcome remains limited and guarded.' },
  { id: 'none', label: 'No read', summary: 'No decision lands; the meeting produces no usable read.' },
];

export function minigameOutcomeTier(correct: number, total: number, diceSuccess: boolean): MinigameOutcomeTier {
  if (correct === total) return {
    id: 'clear',
    label: 'Clear read',
    summary: diceSuccess ? 'Every decision landed, and the rapport roll strengthened the result.' : 'Every decision landed. Skill secured the top tier even though the rapport roll did not add anything.',
  };
  if (correct === total - 1) return {
    id: 'strong',
    label: 'Strong read',
    summary: diceSuccess ? 'One decision missed, but the successful roll helped the meeting recover.' : 'One decision missed. The meeting still produced a useful, bounded result.',
  };
  if (correct > 0) return {
    id: 'partial',
    label: 'Partial read',
    summary: diceSuccess ? 'Some decisions landed, and rapport improved the limited result.' : 'Some decisions landed, but the meeting stayed guarded.',
  };
  return {
    id: 'none',
    label: 'No read',
    summary: diceSuccess ? 'The decisions missed, so rapport could not turn the meeting into a usable read.' : 'The decisions missed and the room stayed guarded. No discovery topic was earned.',
  };
}
