export type NumeralBase = 2 | 8 | 10 | 16;
export type GuessResult = {
  bulls: number;
  cows: number;
};
export type GuessHistoryEntry = GuessResult & {
  guess: string;
};

export type GameRecord = {
  base: NumeralBase;
  length: number;
  attempts: number;
  timeMs: number;
  completedAt: string;
};
