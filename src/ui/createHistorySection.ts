export const createHistorySection = () => {
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

  section.append(attemptsText, title, list);

  return {
    element: section,
    attemptsText,
    list,
  };
};
