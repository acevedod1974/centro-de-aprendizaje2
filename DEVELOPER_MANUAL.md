# Centro de Aprendizaje – Developer Manual

> ⚠️ **WARNING:** This manual is DEV-branch only. Do NOT edit or merge into `main`. See `.gitattributes` for details.

## 1. Project Overview

Centro de Aprendizaje is a modern, interactive educational platform for manufacturing processes (forjado, soldadura, mecanizado, etc.), built as a SPA using React, Vite, and TypeScript. It features dynamic content (processes, resources, quizzes, calculators, simulators) managed via Supabase, robust context-driven state management, and a scalable, maintainable codebase.

---

## 2. Codebase Structure

```text
root/
│
├── src/
│   ├── App.tsx                # Main app shell (routing, layout)
│   ├── main.tsx               # Entry point, context providers
│   ├── index.css              # Tailwind + custom styles
│   ├── supabaseClient.ts      # Supabase client config
│   ├── vite-env.d.ts          # Vite/TS types
│   ├── components/            # Main UI components
│   │   ├── App.tsx            # (Legacy, can be removed)
│   │   ├── Header.tsx         # Top navigation
│   │   ├── Footer.tsx         # Footer
│   │   ├── Home.tsx           # Landing page
│   │   ├── ProcessSection.tsx # Dynamic process explorer
│   │   ├── ToolsSection.tsx   # Tool/simulator/calculator hub
│   │   ├── ResourcesSection.tsx # Dynamic resources
│   │   ├── EvaluationSection.tsx # Dynamic quizzes
│   │   ├── ProgressTracker.tsx   # User progress dashboard
│   │   ├── StudyPlanner.tsx      # Study/task planner
│   │   ├── QuizCard.tsx         # Quiz card UI
│   │   ├── fallbackQuizzes.ts   # Fallback quiz data
│   │   └── tools/               # All calculators/simulators/quizzes
│   │       ├── MaterialesCalculator.tsx
│   │       ├── MecanizadoSimulator.tsx
│   │       ├── ForjadoSimulator.tsx
│   │       ├── EngranajCalculator.tsx
│   │       ├── VelocidadCorteCalculator.tsx
│   │       ├── SoldaduraQuiz.tsx
│   │       ├── ToleranciaCalculator.tsx
│   │       └── CalidadInspector.tsx
│   └── contexts/               # Context providers (state management)
│       ├── QuizProgressContext.tsx
│       ├── TasksContext.tsx
│       ├── AchievementsContext.tsx
│       ├── ActivityLogContext.tsx
│       ├── ThemeContext.tsx
│       ├── ToastContext.tsx
│       ├── useQuizProgress.ts
│       ├── useTasks.ts
│       ├── useAchievements.ts
│       └── useToast.ts
├── public/                     # Static assets (if any)
├── package.json                # Dependencies, scripts
├── vite.config.ts              # Vite config
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint config
├── README.md                   # Project intro (user-facing)
├── PLANNING.md                 # Planning/roadmap (partial)
├── TODO.md                     # Task list (partial)
└── ...
```

---

## 3. Functionality & Data Flow

- **Dynamic Content:**

  - All processes, resources, categories, tools, quizzes, and (soon) material properties are fetched from Supabase.
  - Fallbacks (e.g., quizzes) are provided for offline/empty states.
  - TypeScript interfaces strictly define all data shapes.

- **Context Providers:**

  - `QuizProgressContext`, `TasksContext`, `AchievementsContext`, `ActivityLogContext`, `ThemeContext`, `ToastContext` manage all global state (progress, tasks, achievements, logs, theme, toasts).
  - Context hooks (`useQuizProgress`, etc.) are used in components for state access.

- **UI/UX:**

  - Modern, responsive UI with Tailwind CSS.
  - Animations via Framer Motion.
  - Robust loading/error handling for all async data.
  - Accessibility and dark mode support.

- **Supabase Integration:**
  - All dynamic data is stored in Supabase tables (see below for schemas).
  - All fetches include error/logging for connectivity.
  - Credentials/config in `src/supabaseClient.ts`.

---

## 4. Current State of Development

- **Completed:**

  - All process, resource, category, and quiz data migrated to Supabase.
  - Frontend fetches and renders all above data dynamically.
  - Robust error/loading UI and logging for all Supabase fetches.
  - All hardcoded data for processes/resources/quizzes removed.
  - TypeScript enforced everywhere (no `any`).
  - ESLint and code style enforced.
  - Contexts fully refactored and modularized.
  - Fallbacks for quizzes ensure UI always works.

- **Pending:**
  - Migrate all hardcoded material/tool data from calculators/simulators to Supabase (see `src/components/tools/`).
  - Refactor calculators/simulators to fetch and use dynamic material/tool data.
  - (Optional) Migrate other hardcoded data (tool/material options, achievements, study tasks) to Supabase.
  - Add more tests, documentation, and polish.
  - Address any remaining Supabase query errors.
  - Finalize and maintain this Developer Manual.

---

### Example: Materials Table

```sql
CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  density FLOAT,
  young_modulus FLOAT,
  yield_strength FLOAT,
  ultimate_strength FLOAT,
  elongation FLOAT,
  hardness FLOAT,
  thermal_conductivity FLOAT,
  specific_heat FLOAT,
  melting_point FLOAT,
  cost FLOAT,
  applications TEXT[],
  advantages TEXT[],
  disadvantages TEXT[]
);
```

**Other tables:**

- `processes`, `resources`, `resource_categories`, `tools`, `quizzes`, `quiz_questions` (see previous migration scripts).

---

## 6. Roadmap & Planning

### Short-Term

- [ ] Migrate all hardcoded material/tool data in calculators/simulators to Supabase.
- [ ] Refactor all relevant components to fetch and use this data dynamically.
- [ ] Add robust error/loading UI to all calculators/simulators.
- [ ] Ensure all TypeScript types are enforced and no `any` remains.
- [ ] Polish UI/UX, accessibility, and responsiveness.

### Medium-Term

- [ ] Migrate additional hardcoded data (tool/material options, achievements, study tasks) to Supabase as needed.
- [ ] Add more quizzes, questions, and resources.
- [ ] Implement user authentication (if required).
- [ ] Add internationalization (i18n) support.
- [ ] Add more tests (unit/integration).

### Long-Term

- [ ] Expand to more manufacturing processes and tools.
- [ ] Add analytics, reporting, and advanced progress tracking.
- [ ] Enable user-generated content (if desired).

---

## 7. TODO & Task List

See `TODO.md` and `PLANNING.md` for detailed tasks. Key items:

- Complete migration of all hardcoded data to Supabase.
- Refactor calculators/simulators for dynamic data.
- Improve accessibility and UI polish.
- Add more content (quizzes, resources, tools).
- Expand documentation and testing.

---

## 8. How to Continue Development

1. **Supabase Data Migration:**

   - Identify any remaining hardcoded data (see `src/components/tools/`).
   - Add corresponding tables/fields in Supabase (see example schemas).
   - Migrate data and update frontend fetch logic.

2. **Frontend Refactor:**

   - Remove hardcoded data from components.
   - Fetch data from Supabase using the client in `src/supabaseClient.ts`.
   - Add robust error/loading UI and logging.
   - Enforce strict TypeScript types.

3. **Testing & QA:**

   - Run `npm run lint` to check code style.
   - Add/expand tests as needed.

4. **Documentation:**

   - Update this manual as the project evolves.
   - Keep `README.md`, `TODO.md`, and `PLANNING.md` up to date.

5. **Deployment:**
   - Build with `npm run build`.
   - Deploy static files as needed (see Vite docs).

---

## 9. Best Practices

- Use context providers for all global state.
- Never use `any` in TypeScript; always define interfaces.
- Always provide fallback data for critical UI (e.g., quizzes).
- Use robust error/loading UI for all async fetches.
- Keep Supabase credentials secure (move to env vars for production).
- Keep documentation and planning up to date.

---

## 10. Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 11. Contact & Maintainers

- Main developer: (add your name/contact here)
- For questions, open an issue or consult this manual.

---

**Keep this manual updated as the project evolves!**
