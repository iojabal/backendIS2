const { Products, Category } = require("../models")

const obtenerProductos = async (req, res) => {
    res.header("Content-Type", "application/json")

    try {
        const productos = await Products.findAll({
            include: [{
                model: Category,
                as: 'category'
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
            where: { id }, 
            include: [{
                model: Category,
                as: 'category'
            }]
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
    res.header("Content-Type", "application/json")
    const {name, description, actual_stock, minimal_stock, buy_price, sell_price, metric_unit, state, id_category} = req.body;

    if (!name || !description || !actual_stock || !minimal_stock || !buy_price || !sell_price || !metric_unit || !state || !id_category) {
        return res.status(400).json({error: "Todos los campos son requeridos"});

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
        id_category
    }

    try{
        const result = await Products.create(product)
        return res.status(201).json(result)
    }catch(error ){ 
        console.error("error al registrar el producto", error)
        return res.status(500).json({error: "error al registrar el producto"})
    }
}


const actuzalizarProducto = async (req, res) => {
    res.header("Content-Type", "application/json")
    const { id_product } = req.params;
    const {name, description, actual_stock, minimal_stock, buy_price, sell_price, metric_unit, state, id_category} = req.body;

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