const { Products, Category } = require("../models")
const Lote = require("../models/Lote")
const ProductsCategory = require("../models/Producst_Category")
const Providers = require("../models/Providers")

const obtenerProductos = async (req, res) => {
    res.header("Content-Type", "application/json")

    try {
        const productos = await Products.findAll({
            include: [{
                model: ProductsCategory,
                as: 'productsCategory',
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            },
            {
                model: Lote,
                as: "lote",
                include: [
                    {
                        model: Providers,
                        as: "proveedor"
                    }
                ]
            }]
        })
        return res.status(200).json(productos)
    }catch(error) {
        console.error("Error al obtener los productos: ", error)
        return res.status(500).json({error: "Error al obtener los productos"})
    }
}

const obtenerProductosPorId = async (req, res) => {
    res.header("Content-Type", "application/json")

    const { id } = req.params;

    try {
        const product = await Products.findOne({
            where: { id_product: id}, 
            include: [{
                model: ProductsCategory,
                as: 'productsCategory'
            },
        {
            model: Lote,
            as: "lote",
            include: [
                {
                    model: Providers,
                    as: "proveedor"
                }
            ]
        }],
        })
        if (!product) {
            return res.status(404).json({error: "Producto No encontrado"});
        }
        return res.status(200).json(product)
    }catch(error) {
        console.error("Erorr al obtener el Producto, ", error)
        return res.status(500).json({error: "Error al obtener el producto seleccionado"})
    }

}

const registrarProducto = async (req, res) => {
    res.header("Content-Type", "application/json");
    const { name, description, actual_stock, minimal_stock, buy_price, sell_price, metric_unit, state, id_category, loteId } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!name || !description || !actual_stock || !minimal_stock || !buy_price || !sell_price || !metric_unit || !state || !id_category) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const product = {
        name,
        description,
        actual_stock,
        minimal_stock,
        buy_price,
        sell_price,
        metric_unit,
        state,
        id_category,
        loteId
    };

    try {
        // Crear el producto
        const result = await Products.create(product);

        // Crear la relación entre producto y categoría
        const productCategory = {
            productId: result.id_product,
            categoryId: product.id_category  // Cambio aquí a 'id_category'
        };

        // Crear la relación de la categoría
        await ProductsCategory.bulkCreate([productCategory]); // Corregido el uso de 'bulkCreate'

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error al registrar el producto", error);

        // Proporcionar un mensaje de error más detallado si es posible
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: "Violación de restricción de clave foránea." });
        }

        return res.status(500).json({ error: "Error al registrar el producto" });
    }
};



const actuzalizarProducto = async (req, res) => {
    res.header("Content-Type", "application/json")
    const { id_product } = req.params;
    const {name, description, actual_stock, minimal_stock, buy_price, sell_price, metric_unit, state, id_category, loteId} = req.body;

    if (!id_product) {
        return res.status(400).json({error: "El Id_product es requerido "})
    }

    try {
        const product = await Products.findOne({where: {id_product}});
        if (!product) {
            return res.status(404).json({error: "Producto no encontrado"});

        }

        product.name = name || product.name
        product.description = description || product.description;
        product.actual_stock = actual_stock || product.actual_stock
        product.minimal_stock = minimal_stock || product.minimal_stock
        product.buy_price = buy_price || product.buy_price;
        product.sell_price = sell_price || product.sell_price
        product.metric_unit = metric_unit || metric_unit
        product.state = state || product.state
        product.id_category = id_category || product.id_category
        product.loteId = loteId || product.loteId

        const result = await product.save();
        return res.status(200).json(result)
    }catch (error){ 
        console.error("Error al actualizar el Usuario: ", error)
        return res.status(500).json("Error al actualizar el producto")
    }
}

module.exports = {
    registrarProducto,
    obtenerProductos,
    obtenerProductosPorId,
    actuzalizarProducto
}