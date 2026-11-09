# Bulls and Cows

A browser implementation of the classic Bulls and Cows game written in TypeScript with a functional core and a DOM-based interface.

## Features

- binary, octal, decimal, and hexadecimal games;
- secret lengths from 2 to 6 with valid base restrictions;
- unique-digit validation and case-insensitive hexadecimal input;
- bulls/cows history with duplicate-guess protection;
- timer and win detection;
- top-ten records persisted in `localStorage`;
- new game without a page reload;
- recursive, memoized counting of possible secrets;
- Vitest tests and TDD commit history.

## Local setup

```bash
npm install
npm run build
```

Open `index.html` with a local server, for example the VS Code Live Server extension. Run `npm run build` after TypeScript changes and refresh the browser.

## Quality checks

```bash
npm run format:check
npm run lint
npm run build
npm test
```

Implementation decisions and Big O analysis are documented in [DESIGN.md](./DESIGN.md).
