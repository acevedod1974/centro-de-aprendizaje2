# TODO List

## 🔥 Prioridad Alta

- [x] **Migración Completa a SPA:** ✅ Navegación React Router, scroll-to-top automático, enlaces internos actualizados.
- [ ] **Persistencia de Datos del Planificador:** Guardar y cargar planes de estudio (localStorage o backend).
- [ ] **Accesibilidad (a11y):** Mejorar la accesibilidad de todos los componentes. [En progreso: badges, ARIA, focus, roles, tooltips, etc.]
- [x] **Diseño Responsivo:** Todos los componentes principales y páginas son responsivos y han sido revisados. (Pulido menor pendiente)
- [ ] **Autenticación de Usuarios (opcional):** Implementar sistema de registro e inicio de sesión si se requiere.
- [x] **Migración total de datos a Supabase:** Todos los datos de procesos, recursos, materiales, aplicaciones de engranajes, herramientas y quizzes migrados y consumidos dinámicamente desde Supabase. Eliminados arrays hardcodeados.
- [x] **Refactor de calculadoras y simuladores:** Materiales, aplicaciones y parámetros ahora se obtienen de Supabase. Manejo robusto de errores y loading.
- [x] **Eliminación de any:** Todo el código usa tipado estricto TypeScript.
- [x] **Logging y diagnóstico Supabase:** Se agregó logging para diagnosticar conectividad y datos recibidos.
- [x] **Compatibilidad de campos Supabase:** El código acepta temporalmente `service_factor` y `servicefactor` en gear_applications. Se recomienda renombrar la columna a `service_factor` (ver README y Developer Manual).
- [x] **Modernización Home:** Rediseño visual y mejora de la página de inicio para coherencia y atractivo visual.
- [x] **Comparar Materiales en VelocidadCorteCalculator:** Selección múltiple y análisis comparativo en el gráfico.
- [x] **Exportar PDF y Copiar Resultados:** Botones para exportar análisis y copiar resultados en calculadoras.

## 🛠️ Funcionalidades y Mejoras

- [ ] **Desarrollo Backend:** Configurar un backend básico para guardar progreso de usuarios (si aplica).
- [ ] **Contenido Detallado para Módulos:**
  - [ ] Añadir más preguntas y escenarios a `SoldaduraQuiz`.
  - [ ] Expandir parámetros y materiales en `ForjadoSimulator`.
  - [ ] Añadir más tipos de materiales y herramientas a `VelocidadCorteCalculator`.
- [ ] **Internacionalización (i18n):** Preparar la aplicación para múltiples idiomas.
- [x] **Animaciones y Transiciones:** Añadir feedback visual sutil (ya implementado en calculadoras y charts).
- [ ] **Mejorar la interfaz del `ProgressTracker`:** Hacerlo más intuitivo.
- [ ] **Personalización del Tema:** Permitir más opciones de temas además de claro/oscuro.
- [ ] **Historial de Cálculos:** Mostrar y exportar historial de cálculos recientes en calculadoras.
- [ ] **Notas de Usuario:** Permitir guardar notas por cálculo (localStorage).
- [ ] **Modo Experto:** Campos avanzados y fórmulas personalizables.
- [ ] **Compartir Resultados:** Generar link compartible con parámetros del cálculo.

## 🧪 Pruebas

- [ ] **Pruebas Unitarias:** Incrementar la cobertura de pruebas para los componentes.
- [ ] **Pruebas de Integración:** Probar el flujo entre diferentes secciones.
- [ ] **Pruebas E2E:** Configurar pruebas end-to-end.

## 📝 Documentación

- [x] **Actualizar documentación tras migración Supabase:** README y Developer Manual actualizados con instrucciones y SQL para migrar/renombrar columnas.
- [x] **Documentar nuevas features avanzadas:** Comparar materiales, exportar PDF, copiar resultados, mejoras de accesibilidad.
- [ ] **Comentarios en Código:** Mejorar la documentación interna del código.
- [ ] **Guía de Usuario:** Crear una guía básica para los usuarios finales.
- [ ] **Documentación de API (si aplica):** Documentar los endpoints del backend.

## 🚀 Despliegue y Optimización

- [ ] **Configurar CI/CD:** Automatizar el proceso de build y despliegue.
- [ ] **Optimización de Performance:** Analizar y mejorar tiempos de carga.

## ✅ Completado Reciente

- [x] Migración a React Router y SPA.
- [x] Unificación de contexto de progreso y log de actividad.
- [x] Modularización de tarjetas de quiz.
- [x] Scroll-to-top automático en navegación y apertura de simuladores.
- [x] Refactorización de navegación y enlaces internos.
- [x] Migrate materials data to Supabase and refactor MaterialesCalculator to use dynamic fetch.
- [x] Test MaterialesCalculator with new materials and edge cases.
- [x] Review other calculators for hardcoded data.
- [x] Update documentación tras migraciones Supabase.
- [x] Rediseño y modernización de la Home para mayor atractivo visual y coherencia.
- [x] Comparar materiales y exportar análisis en PDF/copia en calculadoras.
