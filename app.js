const cors = require('cors')
const express = require("express");
const bodyParser = require('body-parser')
const rolRoutes = require('./routes/rolRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productsRoutes = require('./routes/productsRoutes')
const productCategoryRoutes = require('./routes/productCategoryRoutes')
const saleRoutes = require('./routes/saleRoutes')
const loteRoutes = require('./routes/loteRoutes')
const providerRoutes = require('./routes/providersController')
const reportSales = require('./routes/reportSalesRouter')

const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors())


app.use(bodyParser.json());

app.use('/api/roles', rolRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/productCategory', productCategoryRoutes)
app.use('/api/sales', saleRoutes)
app.use("/api/lote", loteRoutes)
app.use('/api/providers', providerRoutes)

app.use('/api/reportes', reportSales)

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
})