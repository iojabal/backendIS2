const {DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./products');
const ProductsCategory = require('./Producst_Category');

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

sequelize.sync().then(() => {
    console.log("Refreshed");
})

Category.associate = models => {
    Category.belongsToMany(models.Products, {through: ProductsCategory, foreignKey: 'categoryId', as: 'products'})
}

module.exports = Category;