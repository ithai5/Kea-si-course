import express from "express"
import fileUpload from "express-fileupload"
import { convertCsvToObject, convertXMLToObject, convertYamlToObject,convertRawTextToObj } from "./convertToObject.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const app = express()

const options = {
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

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(fileUpload({createParentPath: true}))

app.post("/upload-file", (req,res) => {
    const body = (req.files.undefined.data.toString());
    switch (req.files.undefined.mimetype) {
        case 'application/json': 
            res.send(body)
            break
        case "application/xml": 
            res.send(convertXMLToObject(body) )
            break
        case "text/yaml":
            res.send(convertYamlToObject(body))
            break
        case "text/csv": 
            res.send(convertCsvToObject(body)[0])
            break
        case "application/octet-stream": 
            res.send(convertRawTextToObj(body))
            break
        default:
            res.send({"message": `The server cannot parse ${req.files.undefined.mimetype} file`})
            break

    }
})

app.listen(4200, ()=> console.log("Application served on: ", 4200))



