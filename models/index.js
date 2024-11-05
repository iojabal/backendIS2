// index.js en el directorio models
const Sequelize = require('sequelize')
const sequelize = require("../config/database");
const User = require("./user")
const Rol = require("./Rol")

const models = { User, Rol };

User.associate(models);
Rol.associate(models);

// Definir las asociaciones
// User.hasOne(Rol, { foreignKey: 'roleId', as: 'role' });
// Rol.belongsTo(User, { foreignKey: 'roleId' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados correctamente');
    })
    .catch(error => {
        console.error('Error al sincronizar los modelos:', error);
    });

module.exports = {
    sequelize,
    User,
    Rol
};
