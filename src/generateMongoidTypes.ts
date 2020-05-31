#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../package.json';
import MongoidTypeGenerator from './generators/MongoidTypeGenerator';
import parser from './parser';

/*
FHIR JSON Spec
http://hl7.org/fhir/json.html
 */

program.version(version);

// Get the location of the modelinfo.xml file from CLI args
// Default is the FHIR modelinfo.xml file in resources
program.requiredOption(
  "-f, --modelinfo-file <file>",
  'modelinfo.xml file being parsed',
  `${__dirname}/../resources/fhir-modelinfo-4.0.1.xml`
);

// Get the output directory from CLI args
// Default is /generated/mongoid/{namespace} e.g. /generated/mongoid/fhir
program.requiredOption(
  "-o, --output-directory <file>",
  'output directory for generated code',
  `${__dirname}/../generated/mongoid`
);

const { modelinfoFile, outputDirectory } = program;

console.log(`Parsing ${modelinfoFile} and writing to ${outputDirectory}`);

const main = async () => {
  const modelInfo = await parser(modelinfoFile);

  const { complexTypes } = modelInfo;

  const generator = new MongoidTypeGenerator(outputDirectory);

  const promises = complexTypes.map(async (typeInfo) => {
    const generated = await generator.generate(typeInfo);
    return generated;
  });

  const generatedTypes = await Promise.all(promises);
};

main()
  .then((result) => {
    console.log('Done');
  })
  .catch((err) => {
    console.error('ERROR');
    console.error(err);
  });
