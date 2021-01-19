#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import AggregatedGenerator from "./generators/AggregatedGenerator";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";
import TypeScriptMappingGenerator from "./generators/typescript/TypeScriptMappingGenerator";
import FieldMetadataGenerator from "./generators/typescript/FieldMetadataGenerator";
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

const aggregatedGenerator = new AggregatedGenerator([
  new TypeScriptGenerator(),
  new TypeScriptMappingGenerator(),
  new FieldMetadataGenerator(),
]);

new GeneratorProgram(aggregatedGenerator, preprocessors)
  .generateTypes()
  .then((result: Array<void>) => {
    logger.info(`Successfully generated ${result.length} types`);
    return true;
  })
  .catch((err) => {
    logger.error("ERROR");
    logger.error(err);
  });
