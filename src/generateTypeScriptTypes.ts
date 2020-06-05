#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";
import logger from "./logger";

// Get the output directory from CLI args
// Default is /generated/typescript/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/typescript`
);

new GeneratorProgram(TypeScriptGenerator)
  .generateTypes()
  .then((result: Array<string>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
