const { Providers } = require('../models');
const Lote = require('../models/Lote');

// Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
    res.header("Content-Type", "application/json");
    try {
        const proveedores = await Providers.findAll({
            include: [{
                model: Lote,
                as: 'lote'
            }]
        });
        return res.status(200).json(proveedores);
    } catch (error) {
        console.error("Error al obtener los proveedores: ", error);
        return res.status(500).json({ error: "Error al obtener los proveedores" });
    }
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;

    try {
        const proveedor = await Providers.findOne({
            where: { id },
            include: [{
                model: Lote,
                as: 'lote'
            }]
        });

        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        return res.status(200).json(proveedor);
    } catch (error) {
        console.error("Error al obtener el proveedor: ", error);
        return res.status(500).json({ error: "Error al obtener el proveedor" });
    }
};

// Crear un nuevo proveedor
const crearProveedor = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { name, phone, nit, email } = req.body;

    try {
        const nuevoProveedor = await Providers.create({
            name,
            phone,
            nit,
            email
        });

        return res.status(201).json({ message: "Proveedor creado correctamente", proveedor: nuevoProveedor });
    } catch (error) {
        console.error("Error al crear el proveedor: ", error);
        return res.status(500).json({ error: "Error al crear el proveedor" });
    }
};

// Actualizar un proveedor
const actualizarProveedor = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;
    const { name, phone, nit, email } = req.body;

    try {
        const proveedor = await Providers.findOne({ where: { id } });

        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        proveedor.name = name || proveedor.name;
        proveedor.phone = phone || proveedor.phone;
        proveedor.nit = nit || proveedor.nit;
        proveedor.email = email || proveedor.email;

        await proveedor.save();

        return res.status(200).json({ message: "Proveedor actualizado correctamente", proveedor });
    } catch (error) {
        console.error("Error al actualizar el proveedor: ", error);
        return res.status(500).json({ error: "Error al actualizar el proveedor" });
    }
};

// Eliminar un proveedor
const eliminarProveedor = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;

    try {
        const proveedor = await Providers.findOne({ where: { id } });

        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        await proveedor.destroy();

        return res.status(200).json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el proveedor: ", error);
        return res.status(500).json({ error: "Error al eliminar el proveedor" });
    }
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};
