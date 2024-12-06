const express = require('express')
const { registrarVentas, obtenerVentas, obtenerVentaPorId, actualizarVenta, eliminarVenta } = require("../controllers/SalesController");

const router = express.Router()
router.post('/', registrarVentas)
router.get('/', obtenerVentas)
router.get('/', obtenerVentaPorId)
router.put('/', actualizarVenta)
router.delete('/', eliminarVenta)


module.exports = router