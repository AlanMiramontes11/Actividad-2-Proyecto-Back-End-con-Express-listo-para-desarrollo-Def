const express = require("express");

const morgan = require("morgan");

const indexRoutes = require("./routes/indexRoute");
const healthRoutes = require("./routes/healthRouter");
const taskRoutes = require("./routes/taskRoutes");
const usersRoutes = require("./routes/usersRoutes")

const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");

require('dotenv').config();

const { PORT, MONGO_URI } = require("./config/env");
const { connectDB } = require("./config/db");
const sequelize = require('./config/db_postgre')

require('./models/user');

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/", indexRoutes);
app.use("/", healthRoutes);
app.use("/", taskRoutes);
app.use("/users", usersRoutes);

app.use(notFound);

app.use(errorHandler);

/*app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});*/

async function start (){
    /*if (!MONGO_URI){
        console.log("falta MONGO_URI en .env");
        process.exit(1);
    }

    await connectDB(MONGO_URI);*/
    await sequelize.authenticate();
    console.log('Conexion a PostgreSQL correcta.');

    await sequelize.sync();
    console.log('Modelos sincronizados correctamente.');
    app.listen(PORT, "0.0.0.0", () => {
        console.log("Servidor en http://localhost:3000");
    });
}

start().catch((error) => {
    console.log("Error al iniciar: ", error);
});