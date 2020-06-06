import { promises as fsPromises } from "fs";
import xml2js from "xml2js";
import logger from "./logger";
import ModelInfo, { IRawModelInfo } from "./model/ModelInfo";

const parser = new xml2js.Parser(/* options */);

const readXml = async (fullName: string): Promise<ModelInfo> => {
  try {
    const rawFile = await fsPromises.readFile(fullName);
    const parsedXml: IRawModelInfo = await parser.parseStringPromise(rawFile) as IRawModelInfo;
    return new ModelInfo(parsedXml);
  } catch (err) {
    logger.error(err);
    throw new Error("Unable to read ModelInfo file");
  }
};

export default readXml;
