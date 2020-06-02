#!/usr/bin/env node
import { program } from "commander";
import GeneratorProgram from "./GeneratorProgram";
import MongoidTypeGenerator from "./generators/MongoidTypeGenerator";


// Get the output directory from CLI args
// Default is /generated/mongoid/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  "output directory for generated code",
  `./generated/mongoid`
);

new GeneratorProgram(new MongoidTypeGenerator())
  .generateTypes()
  .then((result: Array<string>) => {
    console.log(`Successfully generated ${result.length} types`);
  })
  .catch((err) => {
    console.error("ERROR");
    console.error(err);
  });
