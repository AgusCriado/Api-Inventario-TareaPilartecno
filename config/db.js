const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Inventarioapi_PILAR");
        console.log('Conexión a la base de datos establecida');
    } catch (err) {
        console.error('Error en la conexión a la base de datos:', err);
        process.exit(1);
    }
};

module.exports = dbconnect;