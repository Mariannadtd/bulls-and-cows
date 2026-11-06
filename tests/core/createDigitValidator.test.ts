import { describe, expect, it } from 'vitest';

import { createDigitValidator } from '../../src/core/createDigitValidator.js';

describe('createDigitValidator', () => {
  it.each([
    { base: 2, validDigits: ['0', '1'] },
    { base: 8, validDigits: ['0', '7'] },
    { base: 10, validDigits: ['0', '9'] },
    { base: 16, validDigits: ['0', '9', 'a', 'f'] },
  ] as const)('accepts valid digits for base $base', ({ base, validDigits }) => {
    const isValidDigit = createDigitValidator(base);

    validDigits.forEach((digit) => {
      expect(isValidDigit(digit)).toBe(true);
    });
  });

  it.each([
    { base: 2, invalidDigits: ['2', 'a'] },
    { base: 8, invalidDigits: ['8', 'a'] },
    { base: 10, invalidDigits: ['a', 'f'] },
    { base: 16, invalidDigits: ['g', 'z'] },
  ] as const)('rejects invalid digits for base $base', ({ base, invalidDigits }) => {
    const isValidDigit = createDigitValidator(base);

    invalidDigits.forEach((digit) => {
      expect(isValidDigit(digit)).toBe(false);
    });
  });

  it.each(['A', 'B', 'C', 'D', 'E', 'F'])('accepts uppercase hexadecimal digit %s', (digit) => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit(digit)).toBe(true);
  });

  it.each(['', '10', '-', ' '])('rejects a value that is not one digit: %j', (value) => {
    const isHexDigit = createDigitValidator(16);

    expect(isHexDigit(value)).toBe(false);
  });
});
