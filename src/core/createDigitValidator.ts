import type { NumeralBase } from './types.js';

export const createDigitValidator = (base: NumeralBase): ((char: string) => boolean) => {
  void base;
  return () => false;
};
