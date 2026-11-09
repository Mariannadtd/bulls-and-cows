import type { GuessHistoryEntry } from '../core/types.js';

import { createHistorySection } from './createHistorySection.js';

type DigitValidator = (char: string) => boolean;
type GuessHandler = (guess: string) => void;

type GameScreen = {
  element: HTMLElement;
  setLength: (length: number) => void;
  setDigitValidator: (validator: DigitValidator) => void;
  setGuessHandler: (handler: GuessHandler) => void;
  renderHistory: (entries: readonly GuessHistoryEntry[]) => void;
  showMessage: (message: string) => void;
  clearInput: () => void;
  setFinished: (finished: boolean) => void;
};

export const createGameScreen = (): GameScreen => {
  const gameSection = document.createElement('section');
  const title = document.createElement('h2');
  const guessForm = document.createElement('form');
  const guessLabel = document.createElement('label');
  const guessInput = document.createElement('input');
  const checkButton = document.createElement('button');
  const message = document.createElement('p');
  const history = createHistorySection();

  let isValidDigit: DigitValidator = () => true;
  let handleGuess: GuessHandler = () => undefined;

  title.textContent = 'Enter your guess';
  gameSection.className = 'game-screen';
  title.className = 'game-title';
  guessForm.className = 'guess-form';

  guessLabel.className = 'field-label';
  guessInput.className = 'field-control';
  checkButton.className = 'check-button';
  message.className = 'game-message';

  guessLabel.textContent = 'Your guess';
  guessLabel.htmlFor = 'guess';

  guessInput.id = 'guess';
  guessInput.type = 'text';
  guessInput.autocomplete = 'off';
  guessInput.spellcheck = false;

  checkButton.type = 'submit';
  checkButton.textContent = 'Check';

  guessInput.addEventListener('input', () => {
    guessInput.value = [...guessInput.value].filter((char) => isValidDigit(char)).join('');
  });

  guessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const guess = guessInput.value.trim();

    if (guess.length === 0) {
      message.textContent = 'Enter your guess.';
      return;
    }

    handleGuess(guess);
  });

  const setLength = (length: number): void => {
    guessInput.placeholder = `Enter ${length} unique digits`;
    guessInput.maxLength = length;
  };

  const setDigitValidator = (validator: DigitValidator): void => {
    isValidDigit = validator;
  };

  const setGuessHandler = (handler: GuessHandler): void => {
    handleGuess = handler;
  };

  const showMessage = (text: string): void => {
    message.textContent = text;
  };

  const clearInput = (): void => {
    guessInput.value = '';
    guessInput.focus();
  };

  const setFinished = (finished: boolean): void => {
    guessInput.disabled = finished;
    checkButton.disabled = finished;
  };

  guessForm.append(guessLabel, guessInput, checkButton);
  gameSection.append(title, guessForm, message, history.element);

  return {
    element: gameSection,
    setLength,
    setDigitValidator,
    setGuessHandler,
    renderHistory: history.render,
    showMessage,
    clearInput,
    setFinished,
  };
};
