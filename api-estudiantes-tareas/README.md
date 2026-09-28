# API de Tareas Estudiantiles - Serie III

API REST desarrollada en Node.js y Express para la gestión y consulta de tareas de estudiantes en el portal académico.

---

Estructura de Datos (Modelo de Tarea)

Cada tarea cuenta con los siguientes campos:
* `id` (integer): Identificador único de la tarea.
* `titulo` (string): Nombre descriptivo de la actividad.
* `curso` (string): Materia académica a la que pertenece.
* `fechaEntrega` (string ISO 8601): Fecha y hora límite de entrega.
* `estado` (string): Posibles estados: `"pendiente"` | `"completada"`.

---

Contrato de API

| Acción | Método HTTP | Endpoint | Código Éxito |
| :--- | :---: | :--- | :---: |
| **Consultar todas las tareas** | `GET` | `/api/tareas` | `200 OK` |
| **Consultar una tarea específica** | `GET` | `/api/tareas/:id` | `200 OK` |
| **Filtrar tareas por estado** | `GET` | `/api/tareas?estado=pendiente` | `200 OK` |
| **Marcar tarea como completada** | `PATCH` | `/api/tareas/:id/completar` | `200 OK` |

---

Instalación y Ejecución Local

1. **Clonar repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd api-estudiantes-tareas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor:**
   ```bash
   # Modo producción
   npm start

   # Modo desarrollo (con recarga automática)
   npm run dev
   ```

El servidor quedará disponible en `http://localhost:3000`.

---

Respuestas y Respuestas de Error

### 1. Consultar una tarea (`GET /api/tareas/1`):
```json
{
  "id": 1,
  "titulo": "Hoja de Trabajo 2 - UI/UX y Wireframes",
  "curso": "Programación Web",
  "fechaEntrega": "2026-09-26T23:59:00Z",
  "estado": "pendiente"
}
```

### 2. Tarea no encontrada (`GET /api/tareas/999`):
* **Status:** `404 Not Found`
```json
{
  "error": "Not Found",
  "mensaje": "La tarea con ID 999 no fue encontrada.",
  "codigo": 404
}
```

### 3. Marcar completada (`PATCH /api/tareas/1/completar`):
* **Status:** `200 OK`
```json
{
  "mensaje": "Tarea marcada como completada exitosamente.",
  "tarea": {
    "id": 1,
    "titulo": "Hoja de Trabajo 2 - UI/UX y Wireframes",
    "curso": "Programación Web",
    "fechaEntrega": "2026-09-26T23:59:00Z",
    "estado": "completada"
  }
}
```

---

Análisis de Breaking Change

Un cambio que rompería retroactivamente este contrato para clientes existentes sería:
* **Renombrar campos:** Cambiar `"fechaEntrega"` por `"deadline"` o `"entrega_at"`.
* **Cambiar tipos de datos:** Cambiar `"id"` de número entero a formato UUID / String.
* **Eliminar propiedades:** Omitir `"curso"` o cambiar `"estado"` de `string` a un objeto o booleano (`isCompleted: true`).
