export interface Stats {
  trust: number;
  techCred: number;
  execAccess: number;
  productMastery: number;
}

export type StatKey = keyof Stats;

export interface CompanionDef {
  id: string;
  name: string;
  emoji: string;
  title: string;
  desc: string;
  passive: string;
}

export interface BoonDef {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  effect: string;
}

export interface Platform {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  volume: number;
  startStage: number;
  startJourney: number;
  startStats: Stats;
  briefing: string;
  journeyLabel: string;
}

export interface ChapterDef {
  title: string;
  emoji: string;
  flavor: string;
}

export interface MinigameOption { label: string; correct?: boolean; feedback: string; reveal?: string }
/** Pick round: choose the best of 3 options. */
export interface MinigamePickRound { type?: 'pick'; prompt: string; options: MinigameOption[] }
/** Rank round: drag items into priority order. Reserved for readiness sequencing. */
export interface MinigameRankRound { type: 'rank'; prompt: string; items: { label: string; why: string }[]; correctOrder: number[]; feedback: string; reveal?: string }
/** Match round: assign each concern to the executive who owns it. correctMatches maps concern index to executive index. */
export interface MinigameMatchRound {
  type: 'match';
  prompt: string;
  concerns: { label: string; why: string }[];
  executives: string[];
  correctMatches: number[];
  feedback: string;
  reveal?: string;
}
export type MinigameRound = MinigamePickRound | MinigameRankRound | MinigameMatchRound;
/** A short skill + luck mini-game: answer each round, then roll. Correct reads add +2 to the roll, misreads -2. Skill decides the outcome tier; luck shades it. */
export interface Minigame {
  title: string;
  intro: string;
  /** Customer statements shown before any matching interaction; these ground ownership in the conversation rather than title trivia. */
  openingStatements?: { speaker: string; statement: string }[];
  rounds: MinigameRound[];
  rollLabel: string;
}

export type MinigameOutcomeTierId = 'clear' | 'strong' | 'partial' | 'none';
export interface MinigameOutcomeTier { id: MinigameOutcomeTierId; label: string; summary: string }

export interface EncChoice {
  label: string;
  desc: string;
  hidden?: boolean;
  requires?: {
    companion?: string;
    boon?: string;
    stat?: [StatKey, number];
    flag?: string;
    /** Choice only available if this flag is NOT set */
    notFlag?: string;
    stage?: number;
    companionCount?: number;
  };
  useDice?: boolean;
  /** Discovery flags this dice roll depends on: +2 each if uncovered, -2 each if not */
  discovery?: string[];
  diceStat?: StatKey;
  diceThreshold?: number;
  companionBonus?: Record<string, number>;
  boonBonus?: Record<string, number>;
  /** If set, choosing this runs a mini-game before the dice roll */
  minigame?: Minigame;
  /** Plain-language purpose shown on the dice screen before the roll resolves. */
  dicePurpose?: string;
}

export type SignalType = 'green' | 'yellow' | 'red';

export interface Signal {
  type: SignalType;
  text: string;
  /** Hidden signal: only shown if this discovery flag was uncovered */
  reveal?: string;
}

export interface Encounter {
  id: string;
  title: string;
  emoji: string;
  type: 'stage_transition' | 'crisis' | 'opportunity' | 'companion' | 'boss' | 'finale' | 'training' | 'technical' | 'consequence' | 'discovery' | 'defend';
  flavor: string;
  chapter: number;
  signals?: Signal[];
  choices: EncChoice[];
  conditional?: (gs: GameState) => boolean;
}

export interface ChoiceOutcome {
  msg: string;
  learn: string;
  rev: number;
  stats: Partial<Stats>;
  unlockCompanion?: string;
  unlockBoon?: string;
  addFlag?: string;
  removeFlag?: string;
  advanceStage?: number;
  revertStage?: number;
  advanceJourney?: number;
  mistake?: string;
}

export interface CounterfactualSet {
  [choiceIdx: number]: string;
}

export interface LogEntry {
  nodeId: string;
  title: string;
  choiceLabel: string;
  msg: string;
  rev: number;
  diceRoll?: number;
  diceTotal?: number;
  journey?: number;
  discoveryNote?: string;
}

export interface GameState {
  phase: 'briefing' | 'chapterIntro' | 'encounter' | 'minigame' | 'dice' | 'result' | 'ended';
  /** Mini-game progress for the current choice (cleared after the outcome applies) */
  /** picks[r] = option index for pick rounds, or 1/0 (correct/incorrect) for rank rounds */
  minigame?: { picks: number[]; correct: number };
  platformId: string;
  currentEncIdx: number;
  stats: Stats;
  companions: string[];
  boons: string[];
  companionAbilitiesUsed: string[];
  stage: number;
  journey: number;
  revenue: number;
  flags: string[];
  choiceIdx: number;
  diceResult: number;
  diceModifiers: { label: string; value: number }[];
  diceTotal: number;
  resultMsg: string;
  resultLearn: string;
  resultRev: number;
  resultStatChanges: Partial<Stats>;
  counterfactuals: CounterfactualSet;
  /** Privacy-safe achieved tier. The result screen compares it with the four generic tiers without exposing unearned content. */
  minigameResultTier?: MinigameOutcomeTier;
  log: LogEntry[];
  mistakes: string[];
  sidebarOpen: boolean;
  currentChapter: number;
  pendingChapterIntro: number;
}
