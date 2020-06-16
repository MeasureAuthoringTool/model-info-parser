import { program } from "commander";
import path from "path";
import { version } from "../package.json";
import Generator from "./generators/Generator";
import logger from "./logger";
import ModelInfoParser from "./ModelInfoParser";
import EntityCollection from "./model/dataTypes/EntityCollection";
import TransformedPredicate from "./collectionUtils/core/TransformedPredicate";
import ExtractDataTypeTransformer from "./collectionUtils/ExtractDataTypeTransformer";
import BlacklistedTypesPredicate from "./collectionUtils/BlacklistedTypesPredicate";
import ModelInfo from "./model/modelInfo/ModelInfo";
import AddResourceTypeFieldTransformer from "./collectionUtils/AddResourceTypeFieldTransformer";
import ModifyExtensionTypeTransformer from "./collectionUtils/ModifyExtensionTypeTransformer";
import EntityDefinition from "./model/dataTypes/EntityDefinition";

export default class GeneratorProgram {
  constructor(private generator: Generator) {
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

    // Remove the blacklisted types from the collection
    const blacklistPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      BlacklistedTypesPredicate.INSTANCE
    );
    entityCollection = entityCollection.selectRejected(blacklistPredicate);

    // Add a "resourceType" member to the Resource entity
    entityCollection = entityCollection.transform(
      new AddResourceTypeFieldTransformer()
    );

    // Modify the "FHIR.Extension" type to no longer extend FHIR.Element (to prevent circular dependencies)
    entityCollection = entityCollection.transform(
      new ModifyExtensionTypeTransformer()
    );

    // Execute the generator for each entity
    const promises = entityCollection.entities.map(
      async (entity: EntityDefinition) => {
        return this.generator(entity, entityCollection.baseDir);
      }
    );

    return Promise.all(promises);
  }
}
