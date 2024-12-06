const models = require("../models");
const { Order, Products } = require("../models");
const Category = require("../models/Category");
const ProductsCategory = require("../models/Producst_Category");

const obtenerOrdenes = async (req, res) => {
    try {
        const ordenes = await Order.findAll({
            include: [
                {
                    model: Products,
                    as: "producto",
                    attributes: ["name"], // Campos de Products que deseas incluir
                    include: [
                        {
                            model: ProductsCategory,
                            as: "productsCategory",
                            include: [
                                {
                                    model: Category,
                                    as: "category",
                                    attributes: ["name"] // Campo `name` de la tabla `Category`
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(ordenes);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        res.status(500).json({ error: "Error al obtener las órdenes" });
    }
};

const obtenerOrdenesPorFecha = async (req, res) => {
    const { fecha } = req.query; // Pasar fecha como parámetro de consulta (query)

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida" });
    }

    try {
        const ordenes = await Order.findAll({
            where: {
                fechaPedido: fecha
            },
            include: [
                {
                    model: Products,
                    as: "producto",
                    attributes: ["name"], // Campos de Products que deseas incluir
                    include: [
                        {
                            model: ProductsCategory,
                            as: "productsCategory",
                            include: [
                                {
                                    model: Category,
                                    as: "category",
                                    attributes: ["name"] // Campo `name` de la tabla `Category`
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        

        if (ordenes.length === 0) {
            return res.status(404).json({ message: "No se encontraron órdenes para la fecha indicada" });
        }

        res.status(200).json(ordenes);
    } catch (error) {
        console.error("Error al obtener órdenes por fecha:", error);
        res.status(500).json({ error: "Error al obtener las órdenes por fecha" });
    }
};

const crearOrden = async (req, res) => {
    const { cantidad, lote, fechaPedido, id_product } = req.body;

    if (!cantidad || !lote || !id_product) {
        return res.status(400).json({ error: "Los campos cantidad, lote y productId son requeridos" });
    }

    try {
        const nuevaOrden = await Order.create({
            cantidad,
            lote,
            fechaPedido,
            id_product
        });

        res.status(201).json(nuevaOrden);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ error: "Error al crear la orden" });
    }
};

const actualizarOrden = async (req, res) => {
    const { id } = req.params;
    const { cantidad, lote, fechaPedido, estado } = req.body;

    try {
        const orden = await Order.findByPk(id);

        if (!orden) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        // Actualizar solo los campos enviados
        orden.cantidad = cantidad || orden.cantidad;
        orden.lote = lote || orden.lote;
        orden.fechaPedido = fechaPedido || orden.fechaPedido;
        orden.estado = estado || orden.estado;

        const ordenActualizada = await orden.save();

        res.status(200).json(ordenActualizada);
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).json({ error: "Error al actualizar la orden" });
    }
};

module.exports = {
    obtenerOrdenes,
    obtenerOrdenesPorFecha,
    crearOrden,
    actualizarOrden
};
