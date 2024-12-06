const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No Confirmado", // Estado por defecto
    }
});

sequelize.sync().then(() => {
    console.log("refreshed")
})


Order.associate = models => {
    Order.belongsTo(models.Products,
        {
            foreignKey: {
                name: "id_product",
                allowNull: false
            },
            as: "producto"
        }
    )
}

module.exports = Order