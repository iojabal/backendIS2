const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


// Definir el modelo de Report_Sales
const Report_Sales = sequelize.define('Report_Sales', {
    fecha: {
        type: DataTypes.DATEONLY,  // Solo fecha (sin hora)
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,  // Solo la hora del reporte
        allowNull: false,
    },
    dia: {
        type: DataTypes.STRING,  // Día de la semana (Ejemplo: "Lunes")
        allowNull: false,
    },
    detalles: {
        type: DataTypes.JSON,  // Detalles de las ventas (puede ser un arreglo de objetos)
        allowNull: false,
    },
    total_dia: {
        type: DataTypes.DECIMAL(10, 2),  // Total de ventas del día
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'report_sales',
});

// Relación con Sales (obteniendo solo las ventas de la fecha en report_sales)
Report_Sales.associate = models => {
    Report_Sales.hasMany(models.Sales, {
        foreignKey: 'fecha',
        sourceKey: 'fecha',
        as: 'sales',
    });
};

// Sincronización del modelo con la base de datos
sequelize.sync()
    .then(() => console.log('Modelo Report_Sales sincronizado'))
    .catch((error) => console.log('Error al sincronizar el modelo:', error));

module.exports = Report_Sales;
