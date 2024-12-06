const express = require('express')

const {
    registrarProducto,
    obtenerProductos,
    obtenerProductosPorId,
     actuzalizarProducto
} = require('../controllers/productsController')

const router = express.Router()

router.post('/', registrarProducto)
router.get('/', obtenerProductos)
router.get('/:id', obtenerProductosPorId)
router.put('/:id_product', actuzalizarProducto)

module.exports = router