const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "contact-api",
    description: "Simple contact API for CSE341",
    contact: {
      name: "Fernando S. Costa Jr"
    }
  },
  host: "localhost:3000",
  schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);