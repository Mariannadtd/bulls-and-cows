import { createHistorySection } from './createHistorySection.js';

type GameScreen = {
  element: HTMLElement;
  setLength: (length: number) => void;
};

export const createGameScreen = (): GameScreen => {
  const gameSection = document.createElement('section');
  const title = document.createElement('h2');
  const guessForm = document.createElement('form');
  const guessLabel = document.createElement('label');
  const guessInput = document.createElement('input');
  const checkButton = document.createElement('button');

  title.textContent = 'Enter your guess';
  gameSection.className = 'game-screen';
  title.className = 'game-title';
  guessForm.className = 'guess-form';

  guessLabel.className = 'field-label';
  guessInput.className = 'field-control';
  checkButton.className = 'check-button';

  guessLabel.textContent = 'Your guess';
  guessLabel.htmlFor = 'guess';

  guessInput.id = 'guess';
  guessInput.type = 'text';
  guessInput.autocomplete = 'off';
  guessInput.spellcheck = false;

  checkButton.type = 'submit';
  checkButton.textContent = 'Check';

  guessForm.append(guessLabel, guessInput, checkButton);

  guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const history = createHistorySection();
  gameSection.append(title, guessForm, history.element);

  const setLength = (length: number): void => {
    guessInput.placeholder = `Enter ${length} unique digits`;
    guessInput.maxLength = length;
  };

  return {
    element: gameSection,
    setLength,
  };
};
