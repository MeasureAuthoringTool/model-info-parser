#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import MongooseTypeGenerator from "./generators/MongooseTypeGenerator";
import logger from "./logger";
import Preprocessor from "./preprocessors/Preprocessor";
import MongoosePreprocessor from "./preprocessors/MongoosePreprocessor";

// Get the output directory from CLI args
// Default is /generated/mongoose/{namespace} e.g. /generated/mongoose/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/mongoose`
);

const preprocessors: Array<Preprocessor> = [new MongoosePreprocessor()];

new GeneratorProgram(MongooseTypeGenerator, preprocessors)
  .generateTypes()
  .then((result: Array<string>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
