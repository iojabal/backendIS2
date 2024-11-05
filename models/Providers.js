const {DataTypes, DATE} = require('sequelize')
const sequelize = require('../config/database')


const Providers = sequelize.define('providers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    }
})

sequelize.sync().then(() => {
    console.log("Refreshed")
})

module.exports = Providers