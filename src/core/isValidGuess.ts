import { createDigitValidator } from './createDigitValidator.js';
import type { NumeralBase } from './types.js';

export const isValidGuess = (guess: string, length: number, base: NumeralBase): boolean => {
  const normalizedGuess = guess.toLowerCase();
  const hasValidLength = normalizedGuess.length === length;

  const isValidDigit = createDigitValidator(base);
  const containsOnlyValidDigits = [...normalizedGuess].every(isValidDigit);

  const hasUniqueDigits = new Set(normalizedGuess).size === normalizedGuess.length;

  return hasValidLength && containsOnlyValidDigits && hasUniqueDigits;
};
