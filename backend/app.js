const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const fileRoutes = require("./routes/file.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.use(errorHandler);

module.exports = app;
