import type { NumeralBase } from './types.js';
const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: NumeralBase): ((char: string) => boolean) => {
  const allowedDigits = DIGITS.slice(0, base);
  return (char: string): boolean => char.length === 1 && allowedDigits.includes(char.toLowerCase());
};
