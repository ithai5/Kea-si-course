import express from "express"

const fileUploadRoute = express.Router()


/**
 * @openapi
 * /file-upload/file:
 *     post:
 *      summary: upload a file of types xml json yaml csv or txt and return a json object 
 *      requestBody:
 *        content:
 *          application/octet-stream:
 *            schema:
 *              type: object
 *              properties:
 *                  # 'file' will be the field name in this multipart request
 */

fileUploadRoute.post("/file", (req,res) => {
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


export  {fileUploadRoute}