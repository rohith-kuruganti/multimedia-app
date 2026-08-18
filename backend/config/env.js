require("dotenv").config();

const config = {
  port: process.env.PORT || 7777,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

module.exports = config;
