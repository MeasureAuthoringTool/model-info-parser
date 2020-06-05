#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import MongoidTypeGenerator from "./generators/MongoidTypeGenerator";
import logger from "./logger";

// Get the output directory from CLI args
// Default is /generated/mongoid/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/mongoid`
);

new GeneratorProgram(MongoidTypeGenerator)
  .generateTypes()
  .then((result: Array<string>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
