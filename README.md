# Debug Duel – Front‑end

**Debug Duel** is a cyber‑punk themed debugging‑contest platform.  
Participants log in with a team, pick a round and fix buggy code to pass test cases.  
Administrators manage rounds, questions, teams and review submissions via a Tailwind‑powered
admin panel.

> This repository contains the **React + Vite** front‑end only; the backend API and database
> (Prisma) are assumed to run separately.

---

## 🚀 Features

### Participant interface

- Landing page with animated smoke/scanline aesthetic.
- Login screen styled as a “battle terminal”.
- List of battle rounds with real‑time countdown and unlock logic.
- Questions overview showing solved badges.
- Question detail with monaco code editor, custom theme, test‑case runner and
  submission button.
- WebSocket updates via `src/services/socket.js`.

### Admin interface

- Protected layout with sidebar (Dashboard, Teams, Rounds…).
- Round control panel – manage questions, view leaderboard and submissions.
- Question modal forms with test‑case & buggy‑code managers.
- Teams management (list, create/edit/delete, CSV upload/download, PDF export).
- Submission viewer modal.

### Developer utilities

- `seed.ts` script to populate Prisma database with sample rounds, questions,
  test cases and buggy code snippets.
- Husky pre‑commit hooks run `lint-staged` (Prettier/ESLint).
- Tailwind CSS with `tailwindcss‑animate`; plain CSS used on participant pages.
- Aliased imports via `@` (see `vite.config.js`).

---
## 📁 Project Structure

```text
.env
.gitignore
README.md
CONTRIBUTING.md
package.json
vite.config.js
tailwind.config.js
seed.ts
src/
├─ assets/        # images, videos
├─ components/    # reusable UI (CodeExecutor, teams, rounds, ui/, common/)
├─ context/       # React contexts (Auth, Toast)
├─ hooks/         # custom hooks
├─ layouts/       # AdminLayout, ParticipantLayout
├─ pages/         # route components
├─ services/      # API client, socket helper
├─ styles/        # theme.css, HomePage.css, etc.
├─ utils/         # helpers (cn, formatDate, formatDuration)
├─ questions/     # problem statements, buggy code examples
└─ public/        # static assets
```

---

## ⚙️ Getting Started

### 1️⃣ Clone & Install

```bash
git clone <repo-url>
cd DebugDuelFrontend
npm install
```

---

### 2️⃣ Environment Setup

Create a `.env` file (see existing `.env` for examples):

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

### 3️⃣ Run the Development Server

```bash
npm run dev
```

The app runs at:

```
http://localhost:3000
```

---

### 4️⃣ Build for Production

```bash
npm run build
```

---

### 5️⃣ Lint & Format

```bash
npm run lint       # ESLint
npm run format     # Prettier
npm run lint:fix   # ESLint autofix
```

---

### 6️⃣ Seed Database (Optional)

With your backend/database configured (Prisma):

```bash
node seed.ts
```

---

## 🛠 Development Notes

* Routes live under `src/pages/`

  * Add exports to `src/pages/index.js`
* Components go in `src/components/`

  * Export via `src/components/index.js` if needed
* Participant routes are wrapped by `ParticipantLayout.jsx` (plain CSS)
* Admin routes use `AdminLayout.jsx` with Tailwind
* API requests use the API client (`src/services/api.js`)
* Auth state lives in `src/context/useAuth.js`
* WebSocket helper: `src/services/socket.js`
* Code runner/editor:

  * `src/components/CodeExecutor.jsx`
  * Defines a custom **vibrant-dark Monaco theme**
* Teams logic:

  * `src/components/teams/*`
  * Hooks, tables, modals, CSV/PDF helpers

---

## 📐 Coding Conventions

See **CONTRIBUTING.md** for:

* Project structure and naming rules
* Styling guidelines (Tailwind vs plain CSS)
* Pre-commit hooks (Husky + lint-staged)
* How to add new pages and components

---

## 🧭 Useful Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Create production bundle |
| `npm run preview`  | Preview production build |
| `npm run lint`     | Run ESLint               |
| `npm run lint:fix` | ESLint with autofix      |
| `npm run format`   | Run Prettier             |

---

## 📄 License & Acknowledgements

This project is based on the **React + Vite** starter template.
Refer to the original template README for license information.

---

👾 **Have fun fixing reality!**


