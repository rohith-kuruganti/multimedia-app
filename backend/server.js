const express = require("express");

const app = express();

const PORT = 7777;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
