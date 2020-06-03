#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";

// Get the output directory from CLI args
// Default is /generated/typescript/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/typescript`
);

new GeneratorProgram(new TypeScriptGenerator())
  .generateTypes()
  .then((result: Array<string>) => {
    console.log(`Successfully generated ${result.length} types`);
  })
  .catch((err) => {
    console.error("ERROR");
    console.error(err);
  });
