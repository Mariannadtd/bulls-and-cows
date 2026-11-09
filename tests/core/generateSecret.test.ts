import { describe, expect, it } from 'vitest';

import { generateSecret } from '../../src/core/generateSecret.js';

describe('generateSecret', () => {
  it('generates a predictable secret with injected random', () => {
    const alwaysFirst = (): number => 0;

    expect(generateSecret(4, 10, alwaysFirst)).toBe('0123');
  });

  it('generates a secret with the requested length', () => {
    const secret = generateSecret(6, 10, () => 0);

    expect(secret).toHaveLength(6);
  });

  it('generates a secret without repeated digits', () => {
    const length = 6;
    const secret = generateSecret(length, 10, () => 0);
    const uniqueDigits = new Set(secret);

    expect(uniqueDigits.size).toBe(length);
  });

  it.each([
    { length: 2, base: 2, allowedDigits: /^[01]+$/ },
    { length: 4, base: 8, allowedDigits: /^[0-7]+$/ },
    { length: 4, base: 10, allowedDigits: /^[0-9]+$/ },
    { length: 6, base: 16, allowedDigits: /^[0-9a-f]+$/ },
  ] as const)('uses only allowed digits for base $base', ({ length, base, allowedDigits }) => {
    const secret = generateSecret(length, base, () => 0);

    expect(secret).toMatch(allowedDigits);
  });
});
