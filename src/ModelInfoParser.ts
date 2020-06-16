import fs from "fs/promises";
import xml2js from "xml2js";
import ModelInfo, { ModelInfoXml } from "./model/modelInfo/ModelInfo";
import logger from "./logger";

export default class ModelInfoParser {
  static parser = new xml2js.Parser(/* options */);

  public static async parseModelInfoXmlFile(
    modelInfoFileName: string
  ): Promise<ModelInfo> {
    try {
      const rawFile = await fs.readFile(modelInfoFileName);

      const parsedXml: ModelInfoXml = (await ModelInfoParser.parser.parseStringPromise(
        rawFile
      )) as ModelInfoXml;

      return ModelInfo.createModelInfo(parsedXml);
    } catch (err) {
      logger.error(err);
      throw new Error("Unable to read ModelInfo file");
    }
  }
}
