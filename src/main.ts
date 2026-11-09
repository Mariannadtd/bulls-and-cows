import { createGameScreen } from './ui/createGameScreen.js';

const baseOptions = [
  { value: 2, label: 'Binary: 0-1' },
  { value: 8, label: 'Octal: 0-7' },
  { value: 10, label: 'Decimal: 0-9' },
  { value: 16, label: 'Hex: 0–9, A–F' },
];

const lengths = [2, 3, 4, 5, 6];

const app = document.createElement('main');
const title = document.createElement('h1');
const form = document.createElement('form');
const baseLabel = document.createElement('label');
const baseSelect = document.createElement('select');
const lengthLabel = document.createElement('label');
const lengthSelect = document.createElement('select');
const startButton = document.createElement('button');
const selectedSettings = document.createElement('p');
const gameScreen = createGameScreen();
gameScreen.element.hidden = true;

title.textContent = 'BULLS & COWS';
baseLabel.textContent = 'Number system';
baseLabel.htmlFor = 'base';
baseSelect.id = 'base';

const baseOptionElements = baseOptions.map(({ value, label }) => {
  const option = document.createElement('option');
  option.value = String(value);
  option.textContent = label;
  return option;
});

baseSelect.append(...baseOptionElements);
baseSelect.value = '10';
lengthLabel.textContent = 'Secret length';
lengthLabel.htmlFor = 'length';
lengthSelect.id = 'length';
lengthSelect.className = 'field-control';
lengthLabel.className = 'field-label';

const lengthOptionElements = lengths.map((length) => {
  const option = document.createElement('option');

  option.value = String(length);
  option.textContent = String(length);

  return option;
});
lengthSelect.append(...lengthOptionElements);
lengthSelect.value = '4';

startButton.type = 'submit';
startButton.textContent = 'Start game';
startButton.className = 'start-button';

app.className = 'app';
title.className = 'app-title';
baseLabel.className = 'field-label';
baseSelect.className = 'field-control';
form.className = 'settings-form';

selectedSettings.className = 'selected-settings';

const updateAvailableLengths = (): void => {
  const selectedBase = Number(baseSelect.value);

  for (const option of lengthSelect.options) {
    option.disabled = Number(option.value) > selectedBase;
  }

  if (Number(lengthSelect.value) > selectedBase) {
    lengthSelect.value = '2';
  }
};
baseSelect.addEventListener('change', updateAvailableLengths);
updateAvailableLengths();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  baseSelect.disabled = true;
  lengthSelect.disabled = true;
  startButton.disabled = true;
  gameScreen.setLength(Number(lengthSelect.value));
  gameScreen.element.hidden = false;

  const selectedBaseLabel = baseSelect.selectedOptions.item(0)?.textContent ?? '';
  selectedSettings.textContent = `Selected: ${selectedBaseLabel}, length ${lengthSelect.value}`;
});

form.append(baseLabel, baseSelect, lengthLabel, lengthSelect, startButton);
app.append(title, form, selectedSettings, gameScreen.element);

document.body.replaceChildren(app);
