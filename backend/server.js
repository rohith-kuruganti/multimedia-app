const express = require("express");

const config = require("./config/env");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
