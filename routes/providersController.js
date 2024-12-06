const express = require('express');
const router = express.Router();
const {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
} = require('../controllers/providersControllers');

// Rutas para Providers
router.get('/', obtenerProveedores);  // Obtener todos los proveedores
router.get('/:id', obtenerProveedorPorId);  // Obtener un proveedor por ID
router.post('/', crearProveedor);  // Crear un nuevo proveedor
router.put('/:id', actualizarProveedor);  // Actualizar un proveedor
router.delete('/:id', eliminarProveedor);  // Eliminar un proveedor

module.exports = router;
