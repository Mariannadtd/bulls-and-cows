import type { GameRecord } from './types.js';

const MAX_RECORDS = 10;

export const addRecord = (records: readonly GameRecord[], newRecord: GameRecord): GameRecord[] =>
  [...records, newRecord]
    .sort((first, second) => first.attempts - second.attempts || first.timeMs - second.timeMs)
    .slice(0, MAX_RECORDS);
