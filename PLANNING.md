# Project Planning: Centro de Aprendizaje

## Fase 1: MVP (Producto Mínimo Viable) - (4-6 Semanas)

### Objetivos Fase 1

- SPA funcional con React Router y navegación fluida.
- Al menos una herramienta interactiva funcional (`SoldaduraQuiz` o `VelocidadCorteCalculator`).
- Estructura básica: Home, Header, Footer, Recursos.
- Implementación de ThemeContext (claro/oscuro).
- Configuración inicial del proyecto (Vite, TS, Tailwind, ESLint).

### Tareas Clave Fase 1

- Bocetos UI/UX y wireframes.
- Componentes reutilizables (`Header`, `Footer`).
- Implementar la primera herramienta interactiva.
- Página de inicio (`Home`).
- Pruebas unitarias básicas.
- Documentación inicial.

## Fase 2: Expansión de Funcionalidades y Contenido (6-8 Semanas)

### Objetivos Fase 2

- Herramientas interactivas restantes (`ForjadoSimulator`, calculadoras, quizzes).
- `StudyPlanner` y `ProgressTracker` básicos.
- Recursos con contenido real.
- Mejoras UI/UX y responsividad.

### Tareas Clave Fase 2

- Completar herramientas en `src/components/tools/`.
- Desarrollar secciones: `EvaluationSection`, `ProcessSection`, `ToolsSection`.
- Integrar `StudyPlanner` y `ProgressTracker`.
- Expandir contenido y refinar diseño.
- Pruebas unitarias e integración.
- Documentar componentes.

## Fase 3: Refinamiento, Pruebas y Despliegue (4-6 Semanas)

### Objetivos Fase 3

- Persistencia de datos (`StudyPlanner`, `ProgressTracker`).
- Pruebas exhaustivas (unitarias, integración, E2E).
- Optimización de rendimiento y accesibilidad.
- Preparar despliegue (CI/CD, build optimizada).

### Tareas Clave Fase 3

- Backend opcional para progreso de usuario.
- Lógica de persistencia y refinamiento de flujos.
- Cobertura de pruebas y usabilidad.
- Optimización de assets y code splitting.
- Documentación final y guía de usuario.
- Despliegue en Vercel/Netlify/GitHub Pages.

## Milestones y Release Plan

- [x] MVP SPA: Navegación React Router, Home, una herramienta, theme.
- [x] Herramientas completas: Todas las calculadoras, simuladores y quizzes migrados a Supabase y consumidos dinámicamente.
- [x] Persistencia y pruebas: Refactor de contextos, robusto manejo de errores/loading, tipado estricto, documentación y migración Supabase.
- [ ] QA final, pulido UI, y pruebas E2E.
- [ ] Mejorar documentación de usuario y API.
- [x] Rediseño y modernización de la Home para mayor atractivo visual y coherencia.

## Riesgos & Mitigaciones

- **Complejidad de SPA**: Modularizar componentes y usar hooks/contextos.
- **Accesibilidad**: Revisar a11y en cada release.
- **Performance**: Lazy loading y optimización de assets.

## Post-Lanzamiento

- Recopilar feedback y corregir bugs.
- Añadir contenido y nuevas funcionalidades según demanda.
- Mantener dependencias y documentación al día.

## Roadmap

- [x] Migrate all material data to Supabase and refactor MaterialesCalculator.
- [x] Review and migrate all other hardcoded data (tools, gear applications, quizzes, resources, etc.) to Supabase. Refactor frontend para consumir todo dinámicamente.
- [x] Expand dynamic content and improve error handling (robusto loading/error UI, fallback, validación de tipos, logging Supabase).
- [x] Eliminar uso de `any` y forzar tipado estricto en todo el código.
- [x] Documentar migración y SQL para renombrar columnas en Supabase (`service_factor`).
- [x] Rediseño y modernización de la Home para mayor atractivo visual y coherencia.
- [ ] QA final, pulido UI, y pruebas E2E.
- [ ] Mejorar documentación de usuario y API.
