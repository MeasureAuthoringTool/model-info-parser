import { program } from "commander";
import path from "path";
import { version } from "../package.json";
import Generator from "./generators/Generator";
import logger from "./logger";
import ModelInfoParser from "./ModelInfoParser";
import EntityCollection from "./model/dataTypes/EntityCollection";
import ModelInfo from "./model/modelInfo/ModelInfo";
import Preprocessor from "./preprocessors/Preprocessor";

export default class GeneratorProgram {
  constructor(private generator: Generator, private preprocessors: Array<Preprocessor>) {
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
    let outputDirectory: string = program.outputDirectory as string;

    if (!path.isAbsolute(outputDirectory)) {
      logger.info(`Redirecting relative directory ${outputDirectory}`);
      outputDirectory = path.normalize(`${__dirname}/../${outputDirectory}`);
    }

    logger.info(`Parsing ${modelinfoFile} and writing to ${outputDirectory}`);

    // Parse the modelinfo.xml file into the ModelInfo type representation
    const otherModelInfo: ModelInfo = await ModelInfoParser.parseModelInfoXmlFile(
      modelinfoFile
    );

    // Convert the XML representation into an EntityCollection of types
    let entityCollection = EntityCollection.createEntityCollection(
      otherModelInfo,
      outputDirectory
    );

    // Execute all of the specified preprocessors
    entityCollection = this.preprocessors.reduce((accumulator: EntityCollection, preprocessor: Preprocessor) => {
      return preprocessor.preprocess(accumulator);
    }, entityCollection);

    // Execute the generator for entityCollection
    return this.generator(entityCollection);
  }
}
