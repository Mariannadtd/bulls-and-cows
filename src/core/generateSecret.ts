import type { NumeralBase } from './types.js';

type RandomSource = () => number;

export const generateSecret = (
  length: number,
  base: NumeralBase,
  random: RandomSource = Math.random,
): string => {
  void length;
  void base;
  void random;

  return '';
};
