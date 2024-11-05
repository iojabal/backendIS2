const express = require('express')
const {
    crearRelacionProductoCategoria,
    obtenerRelacionesProductoCategoria,
    eliminarRelacionProductoCategoria
} = require('../controllers/productsCategoryController')

const router = express.Router();

router.post('/', crearRelacionProductoCategoria)
router.get('/', obtenerRelacionesProductoCategoria)
router.delete('/:productId/:categoryId', eliminarRelacionProductoCategoria)

module.exports = router;