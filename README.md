# Centro de Aprendizaje

![Project Status](https://img.shields.io/badge/status-active-brightgreen)

Plataforma interactiva para el aprendizaje y desarrollo de habilidades en procesos de manufactura como forjado, soldadura y corte. Incluye simuladores, quizzes, calculadoras técnicas y seguimiento de progreso, todo en una SPA moderna y responsiva.

## 🚀 Características Principales

- **SPA Moderna:** Navegación fluida con React Router y scroll-to-top automático.
- **Simuladores Interactivos:** Herramientas prácticas como `ForjadoSimulator` y `MecanizadoSimulator`.
- **Quizzes y Evaluaciones:** Módulos como `SoldaduraQuiz` para evaluar el conocimiento en soldadura.
- **Calculadoras Técnicas:** Utilidades como `VelocidadCorteCalculator` y `ToleranciaCalculator`.
- **Planificador de Estudio:** Organiza tu ruta de aprendizaje y guarda tu progreso.
- **Seguimiento de Progreso:** Visualización y log de avance en los diferentes módulos y temas.
- **Recursos Multimedia:** Materiales de estudio, guías y enlaces externos.
- **Integración con Supabase:** Recursos y datos clave gestionados desde una base de datos cloud.
- **Tema Claro/Oscuro:** Interfaz adaptable a las preferencias del usuario.
- **Accesibilidad y Responsividad:** UI optimizada para todos los dispositivos y usuarios.

## 🧭 Navegación Principal

- [Inicio](/)
- [Procesos de Fabricación](/procesos)
- [Herramientas Interactivas](/herramientas)
- [Recursos Multimedia](/recursos)
- [Centro de Evaluación](/evaluacion)
- [Progreso](/progreso)

## 🛠️ Stack Tecnológico

- React + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- ESLint, PostCSS
- **Supabase** (backend y base de datos)

## ⚡ Empezando

1. **Clonar el repositorio:**

   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd centro-de-aprendizaje2
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar Supabase:**

   - Crea un proyecto en [Supabase](https://supabase.com/).
   - Crea la tabla `resources` con las columnas del archivo CSV proporcionado o usa el SQL generado.
   - Copia tu URL de proyecto y anon key desde la sección API de Supabase.
   - Crea un archivo `src/supabaseClient.ts`:

     ```ts
     import { createClient } from "@supabase/supabase-js";
     const supabaseUrl = "https://TU_PROYECTO.supabase.co";
     const supabaseKey = "TU_ANON_KEY";
     export const supabase = createClient(supabaseUrl, supabaseKey);
     ```

   - Asegúrate de que tu tabla y columnas coincidan con los datos esperados por la app.

4. **Ejecutar la aplicación en modo desarrollo:**

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📦 Scripts Disponibles

- `npm run dev` — Inicia la aplicación en modo desarrollo.
- `npm run build` — Compila la aplicación para producción en la carpeta `dist/`.
- `npm run lint` — Ejecuta ESLint para analizar el código.
- `npm run preview` — Sirve la build de producción localmente.

## 🗄️ Arquitectura y Notas Técnicas

- **Recursos**: Ahora se obtienen desde Supabase (`resources`), no desde archivos estáticos.
- **Categorías**: Por defecto siguen siendo estáticas, pero pueden migrarse a Supabase si se requiere mayor flexibilidad.
- **Hooks y Contextos**: El estado de progreso, log de actividad y logros está modularizado en hooks/contextos separados.
- **Accesibilidad**: Se están implementando mejoras continuas (focus, roles, ARIA, etc).

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, abre un issue para discutir cambios mayores o envía un Pull Request.

## 🗺️ Roadmap y Próximos Pasos

Consulta [`TODO.md`](./TODO.md) y [`PLANNING.md`](./PLANNING.md) para ver el estado de desarrollo, tareas pendientes y planes futuros.

## 📄 Licencia

MIT
