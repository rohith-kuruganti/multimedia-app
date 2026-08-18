const express = require("express");

const config = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);

connectDB();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
