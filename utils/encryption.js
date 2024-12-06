// /utils/encryption.js
const bcrypt = require('bcrypt');

// Función para encriptar la contraseña
const encriptarPassword = async (password) => {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const passCompare = async (passwordPlain, passwordHashed) => {
    try {
        // Compara la contraseña en texto plano con la encriptada
        const esValida = await bcrypt.compare(passwordPlain, passwordHashed);
        
        if (esValida) {
            return true; // Las contraseñas coinciden
        } else {
            return false; // Las contraseñas no coinciden
        }
    } catch (error) {
        console.error("Error al comparar las contraseñas:", error);
        throw new Error("Error en la comparación de contraseñas");
    }
}

// Exportar la función
module.exports = {
    encriptarPassword,
    passCompare
};
