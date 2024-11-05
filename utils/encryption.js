// /utils/encryption.js
const bcrypt = require('bcrypt');

// Función para encriptar la contraseña
const encriptarPassword = async (password) => {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// Exportar la función
module.exports = {
    encriptarPassword,
};
