const express = require("express");
const bodyParser = require('body-parser')
const rolRoutes = require('./routes/rolRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

app.use('/api/roles', rolRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
})