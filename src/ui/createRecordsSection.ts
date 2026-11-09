import type { GameRecord, NumeralBase } from '../core/types.js';

import { formatDuration } from './formatDuration.js';

type RecordsSection = {
  element: HTMLElement;
  render: (records: readonly GameRecord[]) => void;
};

const baseLabels: Record<NumeralBase, string> = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hex',
};

export const createRecordsSection = (): RecordsSection => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const list = document.createElement('ol');

  section.className = 'records';
  title.className = 'records-title';
  description.className = 'records-description';
  list.className = 'records-list';

  title.textContent = 'Best results';
  description.textContent = 'Fewer attempts wins; time breaks a tie.';

  const render = (records: readonly GameRecord[]): void => {
    const items = records.map((record) => {
      const item = document.createElement('li');
      const date = new Date(record.completedAt).toLocaleDateString();
      const attemptWord = record.attempts === 1 ? 'attempt' : 'attempts';

      item.className = 'record-item';
      item.textContent = `${baseLabels[record.base]}, ${record.length} digits — ${record.attempts} ${attemptWord}, ${formatDuration(record.timeMs)} — ${date}`;

      return item;
    });

    list.replaceChildren(...items);
  };

  section.append(title, description, list);

  return { element: section, render };
};
