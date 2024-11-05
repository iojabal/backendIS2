const {DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol');


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    ci: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id'
        }
    }
})

sequelize.sync().then(() => {
    console.log("Refreshed");
})

User.associate = models => {
    User.belongsTo(models.Rol, {foreignKey: "roleId", as:"rol"})
}

module.exports = User;