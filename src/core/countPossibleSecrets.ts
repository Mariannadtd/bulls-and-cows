import type { NumeralBase } from './types.js';

const resultCache = new Map<string, number>();

const countRecursively = (length: number, base: number): number => {
  const cacheKey = `${length}:${base}`;
  const cachedResult = resultCache.get(cacheKey);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  let result: number;

  if (length === 0) {
    result = 1;
  } else if (length > base) {
    result = 0;
  } else {
    result = base * countRecursively(length - 1, base - 1);
  }

  resultCache.set(cacheKey, result);

  return result;
};

export const countPossibleSecrets = (length: number, base: NumeralBase): number =>
  countRecursively(length, base);
