const express = require('express');
const router = express.Router();
const {
    obtenerLotes,
    obtenerLotePorId,
    crearLote,
    actualizarLote,
    eliminarLote
} = require('../controllers/loteController');

// Rutas para Lotes
router.get('/', obtenerLotes);  // Obtener todos los lotes
router.get('/:id', obtenerLotePorId);  // Obtener un lote por ID
router.post('/', crearLote);  // Crear un nuevo lote
router.put('/:id', actualizarLote);  // Actualizar un lote
router.delete('/:id', eliminarLote);  // Eliminar un lote

module.exports = router;
