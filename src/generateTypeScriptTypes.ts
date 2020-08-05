#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";
import logger from "./logger";
import Preprocessor from "./preprocessors/Preprocessor";
import TypeScriptPreprocessor from "./preprocessors/TypeScriptPreprocessor";

// Get the output directory from CLI args
// Default is /generated/typescript/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/typescript`
);

const preprocessors: Array<Preprocessor> = [new TypeScriptPreprocessor()];

new GeneratorProgram(TypeScriptGenerator, preprocessors)
  .generateTypes()
  .then((result: Array<void>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
