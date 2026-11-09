import type { GameRecord, NumeralBase } from './types.js';

const STORAGE_KEY = 'bulls-and-cows-records';

const isNumeralBase = (value: unknown): value is NumeralBase =>
  value === 2 || value === 8 || value === 10 || value === 16;

const isGameRecord = (value: unknown): value is GameRecord => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Partial<GameRecord>;

  return (
    isNumeralBase(record.base) &&
    typeof record.length === 'number' &&
    typeof record.attempts === 'number' &&
    typeof record.timeMs === 'number' &&
    typeof record.completedAt === 'string'
  );
};

export const loadRecords = (): GameRecord[] => {
  try {
    const savedRecords = localStorage.getItem(STORAGE_KEY);

    if (savedRecords === null) {
      return [];
    }

    const parsedRecords: unknown = JSON.parse(savedRecords);

    return Array.isArray(parsedRecords) ? parsedRecords.filter(isGameRecord) : [];
  } catch {
    return [];
  }
};

export const saveRecords = (records: readonly GameRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
