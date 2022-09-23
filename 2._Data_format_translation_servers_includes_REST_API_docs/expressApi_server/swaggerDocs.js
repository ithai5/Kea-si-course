const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "ISC",
        }
      }
    },
    apis: ["./routes/*.js"],
}

export {swaggerOptions}
