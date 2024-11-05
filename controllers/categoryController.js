const { Category, Products } = require("../models");

const registarCategoria = async (req, res) => {
    res.header("Content-Type", "application/json")
    const {name} = req.body


    if (!name) {
        return res.status(400).json({error: 'requerido el nombre de la categoria'});
    }
    const category = {
        name
    }
    try{
        const result = await Category.create(category);
        return res.status(201).json(result)
    }
    catch(error){
        console.error("Error al registrar un usuario", error)
        return res.status(500).json({error: "Error al registrar la Categoria"});
    }

}

const obtenerCategoriaPorId = async (req, res) => {
    res.header("Content-Type", "application/json")
    const { id } = req.params;
    
    try{ 
        
            const category = await Category.findOne({
                where: { id },
                include: [
                    {
                        model: Products,
                        as: 'products'
                    }
                ]
            })
            if (!category) {
                return res.status(404).json({error: "Categoria no encontrada"});
            }
            return res.status(200).json(category)

    }catch(error) {
        console.error("Error al obtener la caregoria: ", error)
        return res.status(500).json({error: error})
    }
}


const obtenerCategorias = async (req, res) => {
    res.header("Content-Type", "application/json");

    try {
        const categorias = await Category.findAll({
            include: [{
                model: Products,
                as: "products"
            }]
        })
        return res.status(200).json(categorias)
    }
    catch(error) {
        console.error("error al obtener categorias: ", error);
        return res.status(500).json({error: "Error al obtener las categorias"})
    }
}

module.exports  = {
    obtenerCategoriaPorId,
    obtenerCategorias,
    registarCategoria
}