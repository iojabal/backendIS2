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

ProductsCategory.associate = models => {
    ProductsCategory.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product'
    })
    ProductsCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: 'category'
    })
}

module.exports = ProductsCategory;