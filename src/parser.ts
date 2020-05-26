import {promises as fsPromises} from "fs";
import xml2js from "xml2js";
import ModelInfo from "./model/ModelInfo";

const parser = new xml2js.Parser(/* options */);

const readXml = async (fileName) => {
  const fullName = `${__dirname}/../resources/${fileName}`;
  try {
    const rawFile = await fsPromises.readFile(fullName);
    const parsedXml = await parser.parseStringPromise(rawFile);
    const modelInfo = new ModelInfo(parsedXml);
    return modelInfo;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to read ModelInfo file");
  }
};

export default readXml;
