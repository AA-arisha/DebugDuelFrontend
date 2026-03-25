# Contributing & Conventions

A few project conventions and guidelines to keep the codebase consistent:

- **Project layout**

  - `src/services/` — API clients and services (e.g., `api.js`).
  - `src/pages/` — route-level pages (e.g., `Home`, `QuestionPage`). Pages are entry points for routes and may compose multiple components.
  - `src/components/` — reusable UI components (e.g., `CodeExecutor`).
  - `src/styles/` — CSS split into `theme.css` (variables, global), `pages.css` (page-specific), and `components.css` (component styles).
  - `src/data/` — fixtures or seed data for local development.
  - `src/images/` or `src/assets/` — static media assets.

- **Naming**

  - Use file names that match the primary exported symbol (e.g., `QuestionPage.jsx` exports `QuestionPage`).
  - Keep route pages in `pages` and UIs in `components`.

- **Styles**

  - Store global variables and fonts in `theme.css`.
  - Pages and components have their own CSS files to avoid duplication.

- **Tooling & scripts**

  - `npm run dev` — start dev server.
  - `npm run build` — build production bundle.
  - `npm run lint` — run ESLint.
  - `npm run lint:fix` — run ESLint autofix.
  - `npm run format` — format with Prettier.

- **Pre-commit hooks**

  - Husky + `lint-staged` are configured to run Prettier and ESLint fixes on staged files. Run `npm install` locally after pulling changes to ensure hooks are activated.

- **Adding new pages/components**
  - Create files in the appropriate folder and add an export to `src/pages/index.js` or `src/components/index.js` if you want index exports.
  - Keep components focused and small; prefer props for configuration and avoid heavy logic in UI components.


