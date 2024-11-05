const express = require('express')
const {
    obtenerCategoriaPorId,
    obtenerCategorias,
    registarCategoria
} = require('../controllers/categoryController')

const router = express.Router();

router.post('/', registarCategoria)
router.get('/', obtenerCategorias)
router.get('/:id', obtenerCategoriaPorId)

module.exports = router;