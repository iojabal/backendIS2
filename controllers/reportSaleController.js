const { Sequelize } = require("sequelize");
const { Sales, Report_Sales } = require("../models"); // Asegúrate de importar ambos modelos
const Products = require("../models/products");
const SalesProducts = require("../models/SalesProducts");

const createSalesReport = async (fecha) => {
  try {
    // Obtén todas las ventas de ese día
    const sales = await Sales.findAll({
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("hour")),
        "=",
        fecha
      ),
      include: {
        model: SalesProducts,
        as: "saleProducts",
        include: {
          model: Products,
          as: "product",
        },
      },
    });

    // Calcula el total del día sumando todas las ventas
    const totalDia = sales.reduce(
      (sum, sale) => sum + parseFloat(sale.totalSale),
      0
    );

    // Crea el reporte de ventas
    const report = await Report_Sales.create({
      fecha: fecha,
      hora: new Date().toISOString().split("T")[1].split(".")[0], // Formato HH:mm:ss
      dia: new Date(fecha).toLocaleDateString(), // Usa el día de la fecha del reporte
      detalles: sales.map((sale) => ({
        id_sale: sale.id,
        totalSale: sale.totalSale,
        hour: sale.hour,
        productos: sale.saleProducts
          ? sale.saleProducts.map((saleProduct) => ({
              id_product: saleProduct.product?.id || null,
              name: saleProduct.product?.name || "Producto no encontrado",
              price: saleProduct.product?.sell_price || 0,
              quantity: saleProduct.quantity || 0,
            }))
          : [], // Si no hay productos, devuelve un arreglo vacío
      })),
      total_dia: totalDia,
    });

    return report;
  } catch (error) {
    console.error("Error al crear el reporte de ventas:", error);
    throw new Error("Error al crear el reporte");
  }
};

const registrarReporte = async (req, res) => {
  res.header("Content-Type", "application/json");
  const { fecha } = req.body;
  if (!fecha) {
    return res.status(400).json({ message: "La fecha es obligatoria" });
  }
  try {
    // Crea el reporte de ventas para la fecha proporcionada
    const report = await createSalesReport(fecha);
    res.status(201).json(report); // Devuelve el reporte creado
  } catch (error) {
    console.error("Error al crear el reporte:", error);
    res.status(500).json({ message: "Error al crear el reporte" });
  }
};
const getReportes = async (req, res) => {
    try {
      const reportes = await Report_Sales.findAll();
  
      if (!reportes.length) {
        return res.status(404).json({ message: "No se encontraron reportes de ventas" });
      }
  
      res.status(200).json(reportes); // Devuelve todos los reportes encontrados
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
      res.status(500).json({ message: "Error al obtener los reportes" });
    }
  };
  
  // Obtener un reporte de ventas por fecha
  const getReportePorFecha = async (req, res) => {
    const { fecha } = req.params; // La fecha es un parámetro de la URL
  
    try {
      const reporte = await Report_Sales.findOne({ where: { fecha } });
  
      if (!reporte) {
        return res.status(404).json({ message: `No se encontró un reporte para la fecha ${fecha}` });
      }
  
      res.status(200).json(reporte); // Devuelve el reporte de la fecha solicitada
    } catch (error) {
      console.error("Error al obtener el reporte por fecha:", error);
      res.status(500).json({ message: "Error al obtener el reporte por fecha" });
    }
  };
  
  module.exports = {
    registrarReporte,
    getReportes,
    getReportePorFecha,
  };

