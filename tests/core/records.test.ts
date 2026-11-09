import { describe, expect, it } from 'vitest';

import { addRecord } from '../../src/core/records.js';
import type { GameRecord } from '../../src/core/types.js';

const createRecord = (attempts: number, timeMs: number): GameRecord => ({
  base: 10,
  length: 4,
  attempts,
  timeMs,
  completedAt: '2026-11-10T00:00:00.000Z',
});

describe('addRecord', () => {
  it('sorts records by attempts and then by time', () => {
    const records = [createRecord(4, 20_000), createRecord(3, 30_000)];
    const result = addRecord(records, createRecord(3, 15_000));

    expect(result.map(({ attempts, timeMs }) => ({ attempts, timeMs }))).toEqual([
      { attempts: 3, timeMs: 15_000 },
      { attempts: 3, timeMs: 30_000 },
      { attempts: 4, timeMs: 20_000 },
    ]);
  });

  it('keeps only ten best records', () => {
    const records = Array.from({ length: 10 }, (_, index) => createRecord(index + 2, 10_000));
    const result = addRecord(records, createRecord(1, 10_000));

    expect(result).toHaveLength(10);
    expect(result[0]?.attempts).toBe(1);
  });

  it('does not mutate the original array', () => {
    const records = [createRecord(4, 20_000)];

    addRecord(records, createRecord(3, 10_000));

    expect(records).toHaveLength(1);
  });
});
