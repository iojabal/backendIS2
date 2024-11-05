const {DataTypes, DATE} = require('sequelize')
const sequelize = require('../config/database')

const Category = require("./Category")
const ProductsCategory = require('./Producst_Category')

const Products = sequelize.define("product", {
    id_product: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    actual_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minimal_stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buy_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sell_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    metric_unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    id_category:{
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }

})

sequelize.sync().then(() => {
    console.log("refreshed")
})

Products.associate = models => {
    Products.belongsToMany(Category, {through: ProductsCategory, foreignKey: "productId"})
}
module.exports = Products