const express = require('express')
const {
    registrarUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario
} = require('../controllers/userController')


const router = express.Router()

router.post('/', registrarUsuario)
router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuarioPorId)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router