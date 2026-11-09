import { describe, expect, it } from 'vitest';

import { countPossibleSecrets } from '../../src/core/countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it.each([
    { length: 2, base: 2, expected: 2 },
    { length: 2, base: 8, expected: 56 },
    { length: 4, base: 10, expected: 5040 },
    { length: 6, base: 16, expected: 5_765_760 },
  ] as const)(
    'returns $expected for length $length and base $base',
    ({ length, base, expected }) => {
      expect(countPossibleSecrets(length, base)).toBe(expected);
    },
  );

  it('returns 1 for a secret with zero length', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns 0 when length is greater than base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });
});
