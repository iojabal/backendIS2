const express = require('express')
const { registrarVentas, obtenerVentas, obtenerVentaPorId, actualizarVenta, eliminarVenta, obtenerVentasPorFecha } = require("../controllers/SalesController");

const router = express.Router()
router.post('/', registrarVentas)
router.get('/', obtenerVentas)
router.get('/:id', obtenerVentaPorId)
router.put('/:id', actualizarVenta)
router.delete('/:id', eliminarVenta)
// router.get('/:fecha', obtenerVentasPorFecha)


module.exports = router