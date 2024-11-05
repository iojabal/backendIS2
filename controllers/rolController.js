const {Rol}= require('../models')

const crearRol = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { role_name } = req.body;

    if (!role_name) {
        return res.status(400).json({ error: "El nombre del rol es requerido." });
    }

    try {
        const rol = await Rol.create({ role_name });
        return res.status(201).json(rol);
    } catch (error) {
        console.error("Error al crear el rol:", error);
        return res.status(500).json({ error: "Error al crear el rol." });
    }
};

// Obtener todos los roles
const obtenerRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        return res.status(200).json(roles);
    } catch (error) {
        console.error("Error al obtener roles:", error);
        return res.status(500).json({ error: "Error al obtener roles." });
    }
};

// Obtener un rol por ID
const obtenerRolPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const rol = await Rol.findOne({ where: { id } });
        if (!rol) {
            return res.status(404).json({ error: "Rol no encontrado." });
        }
        return res.status(200).json(rol);
    } catch (error) {
        console.error("Error al obtener el rol:", error);
        return res.status(500).json({ error: "Error al obtener el rol." });
    }
};

// Actualizar un rol
const actualizarRol = async (req, res) => {
    const { id } = req.params;
    const { role_name } = req.body;

    if (!role_name) {
        return res.status(400).json({ error: "El nombre del rol es requerido." });
    }

    try {
        const rol = await Rol.findOne({ where: { id } });
        if (!rol) {
            return res.status(404).json({ error: "Rol no encontrado." });
        }

        rol.role_name = role_name;
        await rol.save();

        return res.status(200).json(rol);
    } catch (error) {
        console.error("Error al actualizar el rol:", error);
        return res.status(500).json({ error: "Error al actualizar el rol." });
    }
};

// Eliminar un rol
const eliminarRol = async (req, res) => {
    const { id } = req.params;

    try {
        const rol = await Rol.findOne({ where: { id } });
        if (!rol) {
            return res.status(404).json({ error: "Rol no encontrado." });
        }

        await rol.destroy();
        return res.status(204).send(); // No content
    } catch (error) {
        console.error("Error al eliminar el rol:", error);
        return res.status(500).json({ error: "Error al eliminar el rol." });
    }
};

// Exportar las funciones
module.exports = {
    crearRol,
    obtenerRoles,
    obtenerRolPorId,
    actualizarRol,
    eliminarRol
};