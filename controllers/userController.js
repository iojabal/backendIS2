const {User, Rol} = require("../models")
const { encriptarPassword } = require('../utils/encryption');

const obtenerUsuarios = async (req, res) => {
    res.header("Content-type", "application/json")

    try {
        const usuarios = await User.findAll({
            include: [{
                model: Rol,
                as: 'rol'
            }]
        })
        return res.status(200).json(usuarios);
    }catch (error) {
        console.error("error al obtener usuarios: ", error)
        return res.status(500).json({error: "Error al obtener los Usuarios"})
    }
}

const obtenerUsuarioPorId = async (req, res) => {
    res.header("Content-Type", "application/json");

    const { id } = req.params; // Supongamos que el ID viene en los parámetros de la URL

    try {
        const usuario = await User.findOne({
            where: { id },
            include: [{
                model: Rol,
                as: 'rol', // Asegúrate de que coincida con el alias que uses para la relación
            }],
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({ error: "Error al obtener el usuario." });
    }
};

const registrarUsuario = async (req, res) => {
    res.header("Content-Type", "application/json");
    const {ci, name, lastname, username, password, roleId} = req.body;
    
    if (!ci || !name || !lastname || !username || !password || !roleId) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    const hashedPassword = await encriptarPassword(password)

    const user = {
        ci,
        name,
        lastname,
        username,
        password: hashedPassword, // Considera encriptar la contraseña antes de guardarla
        roleId,
    };

    try{
        const result = await User.create(user);
        return res.status(201).json(result);
    }catch(error){
        console.error("error al registrar usuario: ", error)
        return res.status(500).json({error: "Error al registrar el usuario"});
    }
}

const actualizarUsuario = async (req, res) => {
    res.header("Content-Type", "application/json");

    const { id } = req.params;
    const {ci, name, lastname, username, password, roleId} = req.body

    if (!id || !ci) {
        return res.staus(400).json({error: "Id o CI del usuario es requerido"});
    }

    try {
        const user = await User.findOne({where: { id: id, $or: [{ci: { $eq: ci}}]}})

        if (!user) { 
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        user.name = name || user.name
        user.lastname = lastname || user.lastname
        user.username = username || user.username
        user.password = password || user.password
        user.roleId = roleId || user.roleId

        const result = await user.save();

        return res.status(200).json(result);

    }catch(error) {
        console.error("Error al actualiar el Usuario: " , error)
        return res.status(500).json("Error al actualizar el Usuario")
    }
}
const eliminarUsuario = async (req, res) => {
    res.header("Content-Type", "application/json");

    const { id } = req.params; // Supongamos que el ID viene en los parámetros de la URL

    try {
        const usuario = await User.findOne({ where: { id } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        await User.destroy({ where: { id } }); // Eliminar el usuario
        return res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({ error: "Error al eliminar el usuario." });
    }
}


// module.exports = Use
module.exports = {
    registrarUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario // Exporta el modelo también
};
