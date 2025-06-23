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

### Configuración de Supabase y Variables de Entorno

Para desarrollo local, crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_SUPABASE_URL="https://jpozkwbusowbpyebqfaw.supabase.co"
VITE_SUPABASE_ANON_KEY="<tu-clave-anon-aqui>"
```

Asegúrate de que `.env` esté en `.gitignore` para evitar exponer credenciales.

La aplicación usará estas variables automáticamente gracias a Vite (`import.meta.env`).

Si la clave fue expuesta, rota la clave en el panel de Supabase después de desplegar el cambio.

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

### Materials Data

- MaterialesCalculator now loads all material properties dynamically from Supabase.
- To add or edit materials, use the Supabase dashboard and update the `materials` table.

## 🛠️ Cambios recientes y migración a Supabase

- Todos los datos de procesos, recursos, materiales, aplicaciones de engranajes, herramientas y quizzes han sido migrados a Supabase.
- El frontend ahora obtiene dinámicamente estos datos desde Supabase, eliminando arrays hardcodeados.
- Se implementó manejo robusto de errores y loading, y se eliminó el uso de `any` en todo el código.
- Se agregó logging para diagnosticar la conectividad y los datos recibidos de Supabase.
- Se corrigió el mapeo de campos para aceptar tanto `service_factor` como `servicefactor` en la tabla `gear_applications`.
- Se recomienda renombrar la columna en Supabase a `service_factor` (ver instrucciones en el Developer Manual).

## 📝 Instrucciones para migrar/ajustar Supabase

1. Renombra la columna `servicefactor` a `service_factor`:

   ```sql
   ALTER TABLE gear_applications RENAME COLUMN servicefactor TO service_factor;
   ```

2. Asegúrate de que el tipo de dato sea numérico:

   ```sql
   ALTER TABLE gear_applications ALTER COLUMN service_factor TYPE float8 USING service_factor::float8;
   ```

3. Verifica los datos:

   ```sql
   SELECT id, name, service_factor FROM gear_applications;
   ```

4. Si tienes dudas, consulta el `DEVELOPER_MANUAL.md`.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, abre un issue para discutir cambios mayores o envía un Pull Request.

## 🗺️ Roadmap y Próximos Pasos

Consulta [`TODO.md`](./TODO.md) y [`PLANNING.md`](./PLANNING.md) para ver el estado de desarrollo, tareas pendientes y planes futuros.

## 📄 Licencia

MIT
