const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SalesProducts = require('./SalesProducts')

const Sales = sequelize.define('sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalSale: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    hour: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'sales',
});

sequelize.sync().then(() => {
    console.log("refreshed")
})


Sales.associate = models => {
    Sales.belongsToMany(models.Products, {through: models.SalesProducts, foreignKey: "saleId", as: "products"})
    Sales.hasMany(models.SalesProducts, {foreignKey: 'saleId', as: 'saleProducts'})
    Sales.belongsTo(models.Report_Sales, {
        foreignKey: 'fecha',
        targetKey: 'fecha',
        as: 'report'
    })
}


module.exports = Sales;