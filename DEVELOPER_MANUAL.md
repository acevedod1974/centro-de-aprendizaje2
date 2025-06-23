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
│   │   ├── Header.tsx         # Top navigation
│   │   ├── Footer.tsx         # Footer
│   │   ├── Home.tsx           # Landing page (modern, visual, responsive)
│   │   ├── ProcessSection.tsx # Dynamic process explorer
│   │   ├── ToolsSection.tsx   # Tool/simulator/calculator hub
│   │   ├── ResourcesSection.tsx # Dynamic resources
│   │   ├── EvaluationSection.tsx # Dynamic quizzes
│   │   ├── ProgressTracker.tsx   # User progress dashboard
│   │   ├── StudyPlanner.tsx      # Study/task planner
│   │   ├── QuizCard.tsx         # Quiz card UI
│   │   └── tools/               # All calculators/simulators/quizzes
│   └── contexts/               # Context providers (state management)
├── public/                     # Static assets (if any)
├── package.json                # Dependencies, scripts
├── vite.config.ts              # Vite config
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint config
├── README.md                   # Project intro (user-facing)
├── PLANNING.md                 # Planning/roadmap
├── TODO.md                     # Task list
└── ...
```

---

## 3. Functionality & Data Flow

- **Dynamic Content:**

  - All processes, resources, categories, tools, quizzes, and material properties are fetched from Supabase.
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

## 4. Supabase Integration & Data Model

- **Todos los datos clave** (materiales, procesos, recursos, aplicaciones de engranajes, herramientas, quizzes) se gestionan en Supabase.
- El frontend obtiene los datos dinámicamente y los mapea con validación de tipo y manejo de errores.
- **IMPORTANTE:**

  - El campo de factor de servicio en la tabla `gear_applications` debe llamarse `service_factor` (no `servicefactor`).
  - Si migraste desde una versión anterior, ejecuta:

    ```sql
    ALTER TABLE gear_applications RENAME COLUMN servicefactor TO service_factor;
    ALTER TABLE gear_applications ALTER COLUMN service_factor TYPE float8 USING service_factor::float8;
    ```

- El código es compatible temporalmente con ambos nombres, pero se recomienda unificar a `service_factor`.

---

## 5. Current State of Development

- **Completed:**

  - Todos los datos de procesos, recursos, materiales, herramientas, aplicaciones de engranajes y quizzes migrados a Supabase.
  - Frontend obtiene y renderiza todos los datos dinámicamente desde Supabase.
  - Calculadoras y simuladores refactorizados para consumir datos dinámicos, con manejo robusto de errores/loading y tipado estricto.
  - Eliminados todos los arrays hardcodeados.
  - TypeScript estricto en todo el código (sin `any`).
  - ESLint y estilos de código aplicados.
  - Contextos refactorizados y modularizados.
  - Fallbacks para quizzes aseguran UI siempre funcional.
  - Home y páginas principales modernizadas y responsivas.
  - Documentación y SQL de migración actualizados.

- **Pending:**
  - Persistencia de datos de usuario en StudyPlanner/ProgressTracker (localStorage o backend).
  - Mejoras de accesibilidad (a11y) y pulido UI.
  - Pruebas unitarias, integración y E2E.
  - Internacionalización (i18n).
  - Backend para progreso/autenticación (opcional).
  - Expansión de contenido y documentación de usuario/API.

---

## 6. Roadmap & Planning

### Short-Term

- [x] Migrar y consumir todos los datos dinámicamente desde Supabase.
- [x] Refactor de calculadoras/simuladores para datos dinámicos y robusto manejo de errores/loading.
- [x] Modernización visual y responsiva de la Home y secciones principales.
- [ ] Persistencia de datos de usuario (StudyPlanner/ProgressTracker).
- [ ] Mejoras de accesibilidad y pulido UI.
- [ ] Pruebas unitarias/integración/E2E.

### Medium-Term

- [ ] Backend para progreso/autenticación (opcional).
- [ ] Internacionalización (i18n).
- [ ] Expansión de contenido y documentación.

---

## 7. TODO & Task List

Ver `TODO.md` y `PLANNING.md` para tareas detalladas. Principales pendientes:

- Persistencia de datos de usuario.
- Mejoras de accesibilidad y UI.
- Pruebas y documentación de usuario/API.

---

## 8. How to Continue Development

1. **Supabase Data Migration:**
   - Identifica cualquier dato hardcodeado restante (ver `src/components/tools/`).
   - Agrega tablas/campos en Supabase según los esquemas de ejemplo.
   - Migra datos y actualiza lógica de fetch en frontend.
2. **Frontend Refactor:**
   - Elimina datos hardcodeados de componentes.
   - Obtén datos desde Supabase usando el cliente en `src/supabaseClient.ts`.
   - Añade manejo robusto de errores/loading y logging.
   - Aplica tipado estricto TypeScript.
3. **Testing & QA:**
   - Ejecuta `npm run lint` para revisar estilos.
   - Añade/amplía pruebas según sea necesario.
4. **Documentación:**
   - Mantén este manual, `README.md`, `TODO.md` y `PLANNING.md` actualizados.
5. **Deployment:**
   - Build con `npm run build`.
   - Despliega archivos estáticos según sea necesario (ver docs de Vite).

---

## 9. Best Practices

- Usa context providers para todo estado global.
- Nunca uses `any` en TypeScript; define siempre interfaces.
- Provee datos fallback para UI crítica (ej: quizzes).
- Usa manejo robusto de errores/loading para todo fetch asíncrono.
- Mantén las credenciales de Supabase seguras (mueve a vars de entorno para producción).
- Mantén la documentación y planificación actualizadas.

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

### Materials Data

- All material properties for calculators and simulators are now fetched dynamically from the Supabase `materials` table.
- To add or update materials, log in to Supabase, go to the `materials` table, and insert or edit records.
- The frontend automatically reflects any changes made in Supabase.

#### Example: Adding a Material

1. Open Supabase dashboard.
2. Go to the `materials` table.
3. Click "Insert Row" and fill in the fields (id, name, category, density, etc.).
4. Save. The new material will appear in the MaterialesCalculator UI.

---

#### Roadmap & Current State (update)

- [x] Materials migrated to Supabase and loaded dynamically.
- [ ] Migrate other hardcoded data (tools, achievements, etc.) as needed.

---

**Keep this manual updated as the project evolves!**
