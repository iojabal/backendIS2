const express = require('express')
const {
    obtenerOrdenes,
    obtenerOrdenesPorFecha,
    crearOrden,
    actualizarOrden
} = require('../controllers/OrderController')

const router = express.Router()

router.get('/', obtenerOrdenes)
router.get('/:fecha', obtenerOrdenesPorFecha)
router.post('/', crearOrden)
router.put('/:id' ,actualizarOrden)


module.exports = router