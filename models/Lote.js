const {DataTypes, DATE} = require('sequelize')
const sequelize = require('../config/database')
const { Products } = require('.')
const Providers = require('./Providers')

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
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: 'id_product'
        }
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


module.exports = Lote;