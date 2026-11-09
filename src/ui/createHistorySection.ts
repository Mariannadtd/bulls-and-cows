import type { GuessHistoryEntry } from '../core/types.js';

type HistorySection = {
  element: HTMLElement;
  render: (entries: readonly GuessHistoryEntry[]) => void;
};

export const createHistorySection = (): HistorySection => {
  const section = document.createElement('section');
  const attemptsText = document.createElement('p');
  const title = document.createElement('h3');
  const list = document.createElement('ol');

  section.className = 'history';
  attemptsText.className = 'attempts-text';
  title.className = 'history-title';
  list.className = 'history-list';

  attemptsText.textContent = 'Attempts: 0';
  title.textContent = 'Guess history';

  const render = (entries: readonly GuessHistoryEntry[]): void => {
    attemptsText.textContent = `Attempts: ${entries.length}`;

    const historyItems = entries.map(({ guess, bulls, cows }) => {
      const item = document.createElement('li');

      item.className = 'history-item';
      item.textContent = `${guess} — Bulls: ${bulls}, Cows: ${cows}`;

      return item;
    });

    list.replaceChildren(...historyItems);
  };

  section.append(attemptsText, title, list);

  return {
    element: section,
    render,
  };
};
