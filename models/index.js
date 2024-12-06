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
const Sales = require('./Sales');
const SalesProducts = require('./SalesProducts');
const Report_Sales = require('./report_sales')

const models = {
    Rol,                   
    User,                  
    Providers,             
    Category,              
    Products,              
    ProductsCategory,      
    Lote,                  
    Sales,                 
    SalesProducts,
    Report_Sales
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        console.log(`Aplicando asociaciones para el modelo: ${modelName}`);
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
