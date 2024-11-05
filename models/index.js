// index.js en el directorio models
const Sequelize = require('sequelize')
const sequelize = require("../config/database");
const User = require("./user")
const Rol = require("./Rol");
const Products = require('./products');
const Category = require('./Category');
const ProductsCategory = require('./Producst_Category');
const Lote = require('./Lote');
const Providers = require('./Providers');

const models = { User, Rol, Products, Category, ProductsCategory, Lote, Providers};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

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
   ...models 
};
