const mongoose = require ("mongoose");

async function connectDB(uri) {
    await mongoose.connect(uri);
    console.log("Conectado a la Base de datos");
}

module.exports = {connectDB};