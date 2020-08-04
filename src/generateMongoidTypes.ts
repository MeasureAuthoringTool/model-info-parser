#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import MongoidTypeGenerator from "./generators/MongoidTypeGenerator";
import logger from "./logger";
import Preprocessor from "./preprocessors/Preprocessor";
import MongoidPreprocessor from "./preprocessors/MongoidPreprocessor";

// Get the output directory from CLI args
// Default is /generated/mongoid/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/mongoid`
);

const preprocessors: Array<Preprocessor> = [new MongoidPreprocessor()];

new GeneratorProgram(MongoidTypeGenerator, preprocessors)
  .generateTypes()
  .then((result: Array<void>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
