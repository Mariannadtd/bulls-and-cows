import type { GuessResult } from './types.js';

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  void secret;
  void guess;

  return {
    bulls: 0,
    cows: 0,
  };
};
