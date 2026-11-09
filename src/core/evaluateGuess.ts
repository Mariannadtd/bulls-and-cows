import type { GuessResult } from './types.js';

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const normalizedSecret = secret.toLowerCase();
  const normalizedGuess = [...guess.toLowerCase()];
  const secretDigits = new Set(normalizedSecret);

  return normalizedGuess.reduce<GuessResult>(
    (result, digit, index) => {
      const secretDigit = normalizedSecret[index];

      if (digit === secretDigit) {
        return {
          ...result,
          bulls: result.bulls + 1,
        };
      }

      if (secretDigits.has(digit)) {
        return {
          ...result,
          cows: result.cows + 1,
        };
      }

      return result;
    },
    {
      bulls: 0,
      cows: 0,
    },
  );
};
