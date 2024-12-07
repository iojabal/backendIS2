const Products = require("../models/products");
const Sales = require("../models/Sales");
const SalesProducts = require("../models/SalesProducts");

// Registrar una venta
const registrarVentas = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { totalSale, hour, products } = req.body;

    if (!totalSale || !hour || !products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    try {
        const sale = await Sales.create({ totalSale, hour });

        for (const product of products) {
            const dbProduct = await Products.findByPk(product.id);

            if (!dbProduct) {
                throw new Error(`Producto con ID ${product.id} no encontrado`);
            }

            // Verificar que haya suficiente stock
            if (dbProduct.actual_stock < product.quantity) {
                throw new Error(`Stock insuficiente para el producto ${dbProduct.name}`);
            }

            // Actualizar stock
            dbProduct.actual_stock -= product.quantity;
            await dbProduct.save();
        }

        const productAssociations = products.map((product) => ({
            productId: product.id,
            saleId: sale.id,
            quantity: product.quantity,
            total: product.total,
        }));

        await SalesProducts.bulkCreate(productAssociations);

        res.status(201).json({ message: "Venta Creada con Exito", sale });
    } catch (error) {
        console.error("Error al crear la venta: ", error);
        res.status(500).json({ error: "Error al crear la venta" });
    }
};

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
    try {
        const sales = await Sales.findAll({
            include: {
                model: SalesProducts,
                as: "saleProducts",
                include:[
                    {
                        model: Products,
                        as: 'product',
                    }
                ] // asegúrate de tener esta asociación en tu modelo
            },
        });

        if (!sales.length) {
            return res.status(404).json({ error: "No se encontraron ventas" });
        }

        res.status(200).json({ sales });
    } catch (error) {
        console.error("Error al obtener las ventas: ", error);
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
};

// Obtener una venta específica por ID
const obtenerVentaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sales.findByPk(id, {
            include: {
                model: SalesProducts,
                as: "product",
            },
        });

        if (!sale) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        res.status(200).json({ sale });
    } catch (error) {
        console.error("Error al obtener la venta: ", error);
        res.status(500).json({ error: "Error al obtener la venta" });
    }
};



// Actualizar una venta
const actualizarVenta = async (req, res) => {
    const { id } = req.params;
    const { totalSale, hour, products } = req.body;

    if (!totalSale || !hour || !products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    try {
        const sale = await Sales.findByPk(id);

        if (!sale) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        // Actualizar la venta
        sale.totalSale = totalSale;
        sale.hour = hour;
        await sale.save();

        // Eliminar las asociaciones anteriores
        await SalesProducts.destroy({ where: { saleId: id } });

        // Crear nuevas asociaciones de productos
        const productAssociations = products.map((product) => ({
            productId: product.id,
            saleId: sale.id,
            quantity: product.quantity,
            total: product.total,
        }));

        await SalesProducts.bulkCreate(productAssociations);

        res.status(200).json({ message: "Venta actualizada con éxito", sale });
    } catch (error) {
        console.error("Error al actualizar la venta: ", error);
        res.status(500).json({ error: "Error al actualizar la venta" });
    }
};

// Eliminar una venta
const eliminarVenta = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sales.findByPk(id);

        if (!sale) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        // Eliminar las asociaciones de productos
        await SalesProducts.destroy({ where: { saleId: id } });

        // Eliminar la venta
        await sale.destroy();

        res.status(200).json({ message: "Venta eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la venta: ", error);
        res.status(500).json({ error: "Error al eliminar la venta" });
    }
};

module.exports = {
    registrarVentas,
    obtenerVentas,
    obtenerVentaPorId,
    actualizarVenta,
    eliminarVenta,
};
