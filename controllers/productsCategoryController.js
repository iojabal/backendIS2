const { ProductsCategory, Products, Category } = require("../models");


// Crear una relación entre Producto y Categoría
const crearRelacionProductoCategoria = async (req, res) => {
    const { productId, categoryId } = req.body;

    try {
        const relacion = await ProductsCategory.create({ productId, categoryId });
        return res.status(201).json(relacion);
    } catch (error) {
        console.error("Error al crear la relación:", error);
        return res.status(500).json({ error: "Error al crear la relación producto-categoría" });
    }
};

// Obtener todas las relaciones Producto-Categoría
const obtenerRelacionesProductoCategoria = async (req, res) => {
    try {
        const relaciones = await ProductsCategory.findAll({
            include: [
                { model: Products, as: "product" },
                { model: Category, as: "category" }
            ]
        });
        return res.status(200).json(relaciones);
    } catch (error) {
        console.error("Error al obtener las relaciones:", error);
        return res.status(500).json({ error: "Error al obtener las relaciones producto-categoría" });
    }
};

// Eliminar una relación entre Producto y Categoría
const eliminarRelacionProductoCategoria = async (req, res) => {
    const { productId, categoryId } = req.params;

    try {
        const relacion = await ProductsCategory.findOne({
            where: { productId, categoryId }
        });

        if (!relacion) {
            return res.status(404).json({ error: "Relación no encontrada" });
        }

        await relacion.destroy();
        return res.status(200).json({ message: "Relación eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar la relación:", error);
        return res.status(500).json({ error: "Error al eliminar la relación producto-categoría" });
    }
};

module.exports = {
    crearRelacionProductoCategoria,
    obtenerRelacionesProductoCategoria,
    eliminarRelacionProductoCategoria
};
