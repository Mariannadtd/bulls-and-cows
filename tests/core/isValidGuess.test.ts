import { describe, expect, it } from 'vitest';

import { isValidGuess } from '../../src/core/isValidGuess.js';

describe('isValidGuess', () => {
  it.each([
    { guess: '01', length: 2, base: 2 },
    { guess: '0714', length: 4, base: 8 },
    { guess: '7345', length: 4, base: 10 },
    { guess: 'A04f', length: 4, base: 16 },
  ] as const)('accepts $guess for base $base and length $length', ({ guess, length, base }) => {
    expect(isValidGuess(guess, length, base)).toBe(true);
  });

  it.each([
    { guess: '734', length: 4, base: 10 },
    { guess: '73456', length: 4, base: 10 },
  ] as const)('rejects $guess when required length is $length', ({ guess, length, base }) => {
    expect(isValidGuess(guess, length, base)).toBe(false);
  });

  it.each([
    { guess: '02', length: 2, base: 2 },
    { guess: '018', length: 3, base: 8 },
    { guess: '73a5', length: 4, base: 10 },
    { guess: '12g4', length: 4, base: 16 },
  ] as const)('rejects invalid symbols in $guess for base $base', ({ guess, length, base }) => {
    expect(isValidGuess(guess, length, base)).toBe(false);
  });

  it.each([
    { guess: '7335', length: 4, base: 10 },
    { guess: 'aA12', length: 4, base: 16 },
  ] as const)('rejects repeated symbols in $guess', ({ guess, length, base }) => {
    expect(isValidGuess(guess, length, base)).toBe(false);
  });
});
