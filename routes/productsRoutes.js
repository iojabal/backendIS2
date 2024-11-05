const express = require('express')

const {
    registrarProducto,
    obtenerProductos,
    obtenerProductosPorId
} = require('../controllers/productsController')

const router = express.Router()

router.post('/', registrarProducto)
router.get('/', obtenerProductos)
router.get('/:id', obtenerProductosPorId)

module.exports = router