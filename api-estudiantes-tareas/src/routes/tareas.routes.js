const express = require('express');
const router = express.Router();
let tareas = require('../data/tareas.json');

/**
 * @route   GET /api/tareas
 * @desc    Consultar todas las tareas (o filtrar con query param ?estado=pendiente|completada)
 */
router.get('/', (req, res) => {
  const { estado } = req.query;

  if (estado) {
    const estadoNormalizado = estado.toLowerCase().trim();
    if (estadoNormalizado !== 'pendiente' && estadoNormalizado !== 'completada') {
      return res.status(400).json({
        error: 'Bad Request',
        mensaje: "El parámetro 'estado' solo acepta los valores: 'pendiente' o 'completada'.",
        codigo: 400
      });
    }

    const tareasFiltradas = tareas.filter(t => t.estado.toLowerCase() === estadoNormalizado);
    return res.status(200).json(tareasFiltradas);
  }

  return res.status(200).json(tareas);
});

/**
 * @route   GET /api/tareas/:id
 * @desc    Consultar una tarea específica por ID
 */
router.get('/:id', (req, res) => {
  const idParam = parseInt(req.params.id, 10);

  if (isNaN(idParam)) {
    return res.status(400).json({
      error: 'Bad Request',
      mensaje: 'El ID de la tarea debe ser un valor numérico válido.',
      codigo: 400
    });
  }

  const tarea = tareas.find(t => t.id === idParam);

  if (!tarea) {
    return res.status(404).json({
      error: 'Not Found',
      mensaje: `La tarea con ID ${idParam} no fue encontrada.`,
      codigo: 404
    });
  }

  return res.status(200).json(tarea);
});

/**
 * @route   PATCH /api/tareas/:id/completar
 * @desc    Marcar una tarea como completada
 */
router.patch('/:id/completar', (req, res) => {
  const idParam = parseInt(req.params.id, 10);

  if (isNaN(idParam)) {
    return res.status(400).json({
      error: 'Bad Request',
      mensaje: 'El ID de la tarea debe ser un valor numérico válido.',
      codigo: 400
    });
  }

  const index = tareas.findIndex(t => t.id === idParam);

  if (index === -1) {
    return res.status(404).json({
      error: 'Not Found',
      mensaje: `No se puede completar: la tarea con ID ${idParam} no existe.`,
      codigo: 404
    });
  }

  tareas[index].estado = 'completada';

  return res.status(200).json({
    mensaje: 'Tarea marcada como completada exitosamente.',
    tarea: tareas[index]
  });
});

module.exports = router;
