const express = require("express");
const config = require("./config/env");

const healthRoutes = require("./routes/health.routes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const fileRoutes = require("./routes/file.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.use(errorHandler);

connectDB();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
