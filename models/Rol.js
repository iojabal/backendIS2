const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Rol = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Rol.associate = models => {
    Rol.hasMany(models.User, {foreignKey: 'roleId'})
}

sequelize.sync().then(() => {
    console.log("Refreshed");
})

module.exports = Rol; 