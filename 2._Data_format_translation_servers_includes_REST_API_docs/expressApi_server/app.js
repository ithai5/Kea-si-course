import express from "express"
import fileUpload from "express-fileupload"
import { convertCsvToObject, convertXMLToObject, convertYamlToObject,convertRawTextToObj } from "./convertToObject.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { swaggerOptions } from "./swaggerDocs.js"
const app = express()


const specs = swaggerJsdoc(swaggerOptions);
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



