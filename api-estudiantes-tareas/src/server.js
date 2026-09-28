const express = require('express');
const cors = require('cors');
const tareasRoutes = require('./routes/tareas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoint base / health check
app.get('/', (req, res) => {
  res.json({
    nombre: 'API de Gestión de Tareas - Portal Estudiantil',
    version: '1.0.0',
    documentacion: '/api/tareas',
    endpoints: [
      { metodo: 'GET', ruta: '/api/tareas', descripcion: 'Consultar todas las tareas' },
      { metodo: 'GET', ruta: '/api/tareas?estado=pendiente', descripcion: 'Filtrar tareas por estado' },
      { metodo: 'GET', ruta: '/api/tareas/:id', descripcion: 'Consultar una tarea específica' },
      { metodo: 'PATCH', ruta: '/api/tareas/:id/completar', descripcion: 'Marcar tarea como completada' }
    ]
  });
});

// Rutas de tareas
app.use('/api/tareas', tareasRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    mensaje: `La ruta solicitada '${req.originalUrl}' no existe en este servidor.`,
    codigo: 404
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor API corriendo en http://localhost:${PORT}`);
  console.log(` Endpoint principal de tareas: http://localhost:${PORT}/api/tareas`);
});
