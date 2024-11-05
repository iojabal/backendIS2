const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Products = require("./products");
const Category = require("./Category");

const ProductsCategory = sequelize.define("products_category", {
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: "id_product"
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "id"
        }
    }
})

module.exports = ProductsCategory;