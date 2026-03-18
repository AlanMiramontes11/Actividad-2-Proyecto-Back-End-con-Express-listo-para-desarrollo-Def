const express = require("express");

const morgan = require("morgan");

const indexRoutes = require("./routes/indexRoute");
const healthRoutes = require("./routes/healthRouter");
const taskRoutes = require("./routes/taskRoutes"); // ← AGREGAR

const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");

const { PORT } = require("./config/env");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/", indexRoutes);
app.use("/", healthRoutes);

// TaskCrud
app.use("/api/tasks", taskRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});