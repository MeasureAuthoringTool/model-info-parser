import { program } from "commander";
import { version } from "../package.json";
import IGenerator from "./generators/IGenerator";
import logger from "./logger";
import parser from "./parser";

export default class GeneratorProgram {
  constructor(private generator: IGenerator) {
    program.version(version);

    // Get the location of the modelinfo.xml file from CLI args
    // Default is the FHIR modelinfo.xml file in resources
    program.requiredOption(
      "-f, --modelinfo-file <file>",
      "modelinfo.xml file being parsed",
      `./resources/fhir-modelinfo-4.0.1.xml`
    );

    // parse the CLI args
    program.parse(process.argv);
  }

  async generateTypes(): Promise<Array<string>> {
    const modelinfoFile: string = program.modelinfoFile as string;
    const outputDirectory: string = program.outputDirectory as string;

    logger.info(`Parsing ${modelinfoFile} and writing to ${outputDirectory}`);

    const modelInfo = await parser(modelinfoFile);
    const { complexTypes } = modelInfo;

    const promises = complexTypes.map(async (typeInfo) => {
      return this.generator(
        typeInfo,
        outputDirectory
      );
    });

    return Promise.all(promises);
  }
}
