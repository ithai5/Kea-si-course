const csv = require("csvtojson")
const fs = require("fs")
const yaml = require("yaml")
const xmlConvert = require("xml-js")

const convertCsvToObject =  async (csvPath) => {
    const result = {}
    jsonOjb = await csv().fromFile(csvPath)
    Object.entries(jsonOjb[0]).forEach((entry) => {
        result[entry[0]] = entry[1].includes("|")? entry[1].split("|") : entry[1]
    })
    return result  
}


const convertYamlToObject = (yamlFile) =>{
    const file = fs.readFileSync(yaml, "utf-8")
    return yaml.parse(file)
}


const convertJsonToObject = (jsonFile) => JSON.parse(fs.readFileSync(jsonFile));


const convertXmlToObj = (xmlFile) => {
    const xmlString = fs.readFileSync(xmlFile, "utf-8")
    return xmlConvert.xml2js(xmlString,{compact: true})    
}


const convertRawTextToObj = (textFile) => {
    const text =  fs.readFileSync(textFile, "utf-8")
    const result = {}
    const textArray = text.split("\r\n")
    for (let i = 0; i<textArray.length; i+=2) {
        result[textArray[i]] = textArray[i+1].includes(",") ? textArray[i+1].split(",") : textArray[i+1]
    }   
    return result 
}



