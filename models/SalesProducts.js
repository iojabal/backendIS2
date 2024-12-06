const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Products = require("./products");
const Sales = require("./Sales");

const SalesProducts = sequelize.define("SalesProducts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sales, // Nombre de la tabla Sales
            key: "id",
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products, // Nombre de la tabla Products
            key: "id_product",
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false, // Opcional: evita agregar createdAt y updatedAt
    tableName: "sales_products",
});

sequelize.sync().then(() => {
    console.log("refreshed")
})

SalesProducts.associate = models => {
    SalesProducts.belongsTo(models.Sales, {
        foreignKey: 'saleId',
        as: 'sale',
    });
    SalesProducts.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product'
    })
}

module.exports = SalesProducts;