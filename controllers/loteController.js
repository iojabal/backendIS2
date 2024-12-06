const { Lote } = require('../models');
const { Providers } = require('../models');  // Asegúrate de que Providers esté importado correctamente

// Obtener todos los lotes
const obtenerLotes = async (req, res) => {
    res.header("Content-Type", "application/json");
    try {
        const lotes = await Lote.findAll({
            include: [{
                model: Providers,
                as: 'proveedor'
            }]
        });
        return res.status(200).json(lotes);
    } catch (error) {
        console.error("Error al obtener los lotes: ", error);
        return res.status(500).json({ error: "Error al obtener los lotes" });
    }
};

// Obtener un lote por ID
const obtenerLotePorId = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;

    try {
        const lote = await Lote.findOne({
            where: { id },
            include: [{
                model: Providers,
                as: 'proveedor'
            }]
        });

        if (!lote) {
            return res.status(404).json({ error: "Lote no encontrado" });
        }

        return res.status(200).json(lote);
    } catch (error) {
        console.error("Error al obtener el lote: ", error);
        return res.status(500).json({ error: "Error al obtener el lote" });
    }
};

// Crear un nuevo lote
const crearLote = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { fecha_produccion, fecha_vencimiento, cantidad, id_proveedor } = req.body;

    try {
        const nuevoLote = await Lote.create({
            fecha_produccion,
            fecha_vencimiento,
            cantidad,
            id_proveedor
        });

        return res.status(201).json({ message: "Lote creado correctamente", lote: nuevoLote });
    } catch (error) {
        console.error("Error al crear el lote: ", error);
        return res.status(500).json({ error: "Error al crear el lote" });
    }
};

// Actualizar un lote
const actualizarLote = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;
    const { fecha_produccion, fecha_vencimiento, cantidad, id_proveedor } = req.body;

    try {
        const lote = await Lote.findOne({ where: { id } });

        if (!lote) {
            return res.status(404).json({ error: "Lote no encontrado" });
        }

        lote.fecha_produccion = fecha_produccion || lote.fecha_produccion;
        lote.fecha_vencimiento = fecha_vencimiento || lote.fecha_vencimiento;
        lote.cantidad = cantidad || lote.cantidad;
        lote.id_proveedor = id_proveedor || lote.id_proveedor;

        await lote.save();

        return res.status(200).json({ message: "Lote actualizado correctamente", lote });
    } catch (error) {
        console.error("Error al actualizar el lote: ", error);
        return res.status(500).json({ error: "Error al actualizar el lote" });
    }
};

// Eliminar un lote
const eliminarLote = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { id } = req.params;

    try {
        const lote = await Lote.findOne({ where: { id } });

        if (!lote) {
            return res.status(404).json({ error: "Lote no encontrado" });
        }

        await lote.destroy();

        return res.status(200).json({ message: "Lote eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el lote: ", error);
        return res.status(500).json({ error: "Error al eliminar el lote" });
    }
};

module.exports = {
    obtenerLotes,
    obtenerLotePorId,
    crearLote,
    actualizarLote,
    eliminarLote
};
