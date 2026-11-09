import { describe, expect, it } from 'vitest';

import { evaluateGuess } from '../../src/core/evaluateGuess.js';

describe('evaluateGuess', () => {
  it('counts all digits as bulls for an exact guess', () => {
    expect(evaluateGuess('3109', '3109')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('returns zero bulls and cows when no digits match', () => {
    expect(evaluateGuess('3109', '8246')).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it('counts bulls and cows in a mixed guess', () => {
    expect(evaluateGuess('3109', '0719')).toEqual({
      bulls: 1,
      cows: 2,
    });
  });

  it('counts digits in wrong positions as cows', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it('compares hexadecimal digits without case sensitivity', () => {
    expect(evaluateGuess('a04f', 'A04F')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });
});
