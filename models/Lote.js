const {DataTypes, DATE} = require('sequelize')
const sequelize = require('../config/database')
const { Products, Providers } = require('.')


const Lote = sequelize.define("lote", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    fecha_produccion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        references: {
            model: Providers,
            key: 'id'
        }
    }
})

sequelize.sync().then( () => {
    console.log("Refreshed")
})

Lote.associate = models => {
    Lote.hasMany(models.Products, {foreignKey: "loteId", as: 'productos'});
    Lote.belongsTo(models.Providers, {foreignKey: "id_proveedor", as: 'proveedor'});
}

module.exports = Lote;