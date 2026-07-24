# Especificación Técnica: Dashboard de Tareas y Planificador IA

## 1. Visión General

Este documento detalla la estructura y componentes del dashboard principal de tareas. Especialmente, documenta la funcionalidad de "IA: Planificación del Día" y el seguimiento de productividad. Todo el diseño y especificación se mapea al sistema visual definido en `constants/DESIGN.md`.

## 2. Estructura de la Interfaz

La vista principal es un dashboard vertical (optimizado para móvil) compuesto por las siguientes secciones:

### 2.1. Header Global

- **Logotipo**: "Chronos" alineado a la izquierda.
- **Acciones**: Iconos de búsqueda, notificaciones (campana) y un botón de IA Planner.
- **Contador Global**: Etiqueta superior roja destacando "HOY: 8 TAREAS" seguida del texto "2 COMPLETADAS".

### 2.2. Lista de Tareas (Agrupadas por Tiempo)

- **HOY**:
  - **Tarjeta 1**: "Rediseño Landing Page".
    - Etiqueta: "ALTA PRIORIDAD" (rojo/naranja).
    - Subtítulo: "Ajustar grid y jerarquía tipográfica".
    - Metadatos: Icono de reloj + "14:00" y porcentaje "65%".
    - Visualización de progreso: Barra de progreso lineal roja.
    - Acción: Checkbox circular vacío.
  - **Tarjeta 2**: "Reunión con Inversores".
    - Etiqueta: "PAUSA" (gris/neutro).
    - Subtítulo: "Presentación de prototipo v2".
    - Metadatos: Icono de reloj + "15:30" y porcentaje "0%".
    - Acción: Checkbox circular vacío.
- **MAÑANA**:
  - **Tarjeta**: "Auditoría de Accesibilidad".
    - Subtítulo: "Checklist WCAG 2.1".
    - Acción: Checkbox circular vacío.

### 2.3. Módulo "IA: Planificación del Día"

Este módulo es la funcionalidad clave a implementar. Esta funcionalidad es activada con el botón de IA Planner en el Header Global, la cual abre una pantalla dedicada a la planificación del día.

- **Encabezado**: Título con un icono de IA a la izquierda.
- **Bloque de Insight (Priority Insight)**:
  - Mensaje: "Detecto 3 tareas de alta carga cognitiva. Recomiendo empezar con 'Rediseño' antes de las 11:00."
- **Asignación de Tiempo**:
  - Lista de bloques sugeridos.
  - "Tarea A (Enfoque)": 45 min.
  - "Tarea B (Gestión)": 1.5 horas.
  - "Descanso (Caminata)": 15 min.
- **CTA Principal**: Botón ancho completo "Revisar tareas". Este botón revisa las tareas que faltan completar para mostrar una asignación de tiempo.

### 2.4. Elementos Globales y Navegación

- **Botón Flotante (FAB)**: Botón circular fijo con icono "+" para creación rápida.

---

## 3. Mapeo al Sistema de Diseño (`DESIGN.md`)

Dado que el diseño base de la imagen es oscuro y el sistema `DESIGN.md` de Replicate tiene tanto una temática clara (Cream Canvas) como elementos oscuros (Code Wells), adaptaremos la interfaz empleando los tokens del sistema para mantener la estética. Asumimos un entorno oscuro (`surface-deep`) o una adaptación estricta de la marca.

### 3.1. Colores y Superficies

- **Fondo Base (App Background)**: `{colors.surface-deep}` (`#000000`) o alternativamente `{colors.surface-dark}` (`#202020`).
- **Color de Acento (Rojo/Naranja)**: `{colors.primary}` (`#ea2804`). Utilizado en el botón "Aplicar Plan de IA", el botón flotante (+), etiquetas de alta prioridad, barra de progreso, barras del gráfico de enfoque y la pestaña activa del menú.
- **Tarjetas y Contenedores**: `{colors.surface-dark}` (`#202020`) para separar los elementos (tareas, insight de IA) del fondo. Los bordes separadores emplearán `{colors.divider-dark}` o `{colors.hairline-strong}`.
- **Textos Principales**: `{colors.on-dark}` (`#fcfcfc`) para títulos y descripciones principales.
- **Textos Secundarios**: `{colors.on-dark-mute}` para metadatos (horas, porcentajes, subtítulos).
- **Tags/Pills**: `{colors.badge-success}` para estados positivos y colores neutros como `{colors.surface-card}` para etiquetas en pausa.

### 3.2. Tipografía (Según jerarquía del sistema)

- **Títulos Mayores ("Tasks")**: `{typography.display-lg}` o `{typography.display-md}` (`rb-freigeist-neue`).
- **Títulos de Sección (HOY, MAÑANA)**: `{typography.caption-tight}` (`basier-square`, 14px, 600) con `letter-spacing` negativo, en mayúsculas.
- **Nombres de Tareas / Título de IA**: `{typography.heading-md}` (`basier-square`, 24px) o `{typography.heading-sm}`.
- **Texto de Insight ("Detecto 3 tareas...")**: `{typography.body-md}` (`basier-square`, 16px).
- **Metadatos y Subtítulos**: `{typography.body-sm}` (`basier-square`, 14px).
- **Etiquetas de Tareas (Priority Insight)**: `{typography.code-sm}` (`jetbrains-mono`) si buscamos el aspecto más técnico de lab de IA, o `{typography.caption}`.

### 3.3. Componentes Específicos

- **Botón "Aplicar Plan de IA" / FAB (+)**: Basado en `{component.button-primary}`.
  - `backgroundColor: {colors.primary}`
  - `textColor: {colors.on-primary}`
  - `rounded: {rounded.full}` (Extremos redondeados 9999px).
- **Botón Superior de Detalles (IA)**: Basado en `{component.button-ghost}` o `{component.button-icon}` con color de texto `{colors.on-dark-mute}` para no competir jerárquicamente con el CTA principal.
- **Botón "Añadir Tarea"**: Basado en `{component.button-outline}` o `{component.button-dark}` con `rounded: {rounded.full}` y fondo blanco (`surface-card`).
- **Tarjetas de Tareas**: Similares al contenedor de `{component.model-card}` pero en variante oscura. `rounded: {rounded.md}` (10px) o `{rounded.lg}` (16px).
- **Formas y Botones Redondeados**: Replicando la regla general de que todos los elementos interactivos deben llevar `{rounded.full}`.

## 4. Lógica y Comportamientos a Implementar

- **IA Planner**:
  - Generar una función que lea el estado actual de la lista de tareas ("HOY") y devuelva recomendaciones dinámicas y asignaciones de bloques de tiempo.
  - El CTA "Aplicar Plan" actualizará el estado global, ordenando visualmente las tareas según la prioridad establecida por el motor de IA.
  - **Navegación a Detalles**: El botón superior debe transicionar a la vista "Pantalla de Detalle de IA" donde el usuario visualizará el historial y ajustará las preferencias del modelo.
- **Estado de Enfoque**:
  - El componente de gráfico se nutrirá de datos semanales comparados con la sesión actual, determinando el nivel de la barra activa (en naranja/rojo).
- **Gestión del Checkbox circular**:
  - Acción para marcar `isCompleted = true`, transicionando el progreso al 100% y eliminando la tarea de la vista pendiente o tachando su texto.
