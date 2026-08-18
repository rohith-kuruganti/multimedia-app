const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Multimedia Upload & Search API",
      version: "1.0.0",
      description:
        "REST API for authenticated multimedia upload, search and ranking",
    },

    servers: [
      {
        url: "http://localhost:7777",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
