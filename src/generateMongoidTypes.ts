#!/usr/bin/env node


/*
FHIR JSON Spec
http://hl7.org/fhir/json.html
 */

import GeneratorProgram from "./GeneratorProgram";

const main = async () => {
  const program = new GeneratorProgram();
  await program.generateTypes(true);
};

main()
  .then((result) => {
    console.log('Done');
  })
  .catch((err) => {
    console.error('ERROR');
    console.error(err);
  });
