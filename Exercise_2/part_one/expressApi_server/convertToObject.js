import yaml from "js-yaml";
import xml2js from "xml-js";

export function convertXMLToObject(body) {
    return xml2js.xml2js(body, { compact: true });
}
export function convertYamlToObject(body) {
    return yaml.load(body);
}


export const convertCsvToObject = (csvContent) => {
    const content = csvContent.split('\n');
    const result = [];
    for (let i = 1; i < content.length; i += 2) {
        const keys = content[0].split(',');
        const values = content[i].split(',');
        let entry = {};
        keys.forEach((key, index) => entry[key] = values[index].includes("|") ? values[index].split("|") : values[index]);
        result.push(entry);
    }
    return result;
};


export const convertRawTextToObj = (text) => {
    const result = {};
    const textArray = text.split("\n");
    console.log(textArray);
    for (let i = 0; i < textArray.length; i += 2) {
        result[textArray[i]] = textArray[i + 1].includes(",") ? textArray[i + 1].split(",") : textArray[i + 1];
    }
    return result;
};
