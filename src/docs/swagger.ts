import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";

dotenv.config();

const doc = {
  info: {
    version: "v1.0.0",
    title: "Shema API",
    description: "",
  },
  servers: [
    {
      url: process.env.APP_URL || "http://localhost:3000",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      APIKey: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
