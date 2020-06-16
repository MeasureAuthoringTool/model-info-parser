#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import MongoidTypeGenerator, { generateModelExporter } from "./generators/MongoidTypeGenerator";
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
    // eslint-disable-next-line promise/no-nesting
    generateModelExporter(result, program.outputDirectory)
      .then(() => {return true})
      .catch(() => { logger.info("Model exporter generated")});
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
