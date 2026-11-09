import type { NumeralBase } from './types.js';

const DIGITS = '0123456789abcdef';

type RandomSource = () => number;

type GenerationState = {
  secret: string;
  availableDigits: string[];
};

export const generateSecret = (
  length: number,
  base: NumeralBase,
  random: RandomSource = Math.random,
): string => {
  const initialState: GenerationState = {
    secret: '',
    availableDigits: [...DIGITS.slice(0, base)],
  };

  const generationSteps = Array.from({ length });

  const finalState = generationSteps.reduce<GenerationState>((state) => {
    const randomIndex = Math.floor(random() * state.availableDigits.length);
    const selectedDigit = state.availableDigits[randomIndex] ?? '';

    return {
      secret: `${state.secret}${selectedDigit}`,
      availableDigits: state.availableDigits.filter((_, index) => index !== randomIndex),
    };
  }, initialState);

  return finalState.secret;
};
