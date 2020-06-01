import { program } from 'commander';
import { version } from '../package.json';
import IGenerator from "./generators/IGenerator";
import MongoidTypeGenerator from "./generators/MongoidTypeGenerator";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";
import parser from './parser';

export default class GeneratorProgram {
  constructor() {
    program.version(version);

    // Get the location of the modelinfo.xml file from CLI args
    // Default is the FHIR modelinfo.xml file in resources
    program.requiredOption(
      "-f, --modelinfo-file <file>",
      'modelinfo.xml file being parsed',
      `./resources/fhir-modelinfo-4.0.1.xml`
    );

    // Get the output directory from CLI args
    // Default is /generated/mongoid/{namespace} e.g. /generated/mongoid/fhir
    program.requiredOption(
      "-o, --output-directory <file>",
      'output directory for generated code',
      `./generated/`
    );

    // parse the CLI args
    program.parse(process.argv);
  }

  async generateTypes(isMongoid: boolean) {
    const { modelinfoFile, outputDirectory } = program;

    console.log(`Parsing ${modelinfoFile} and writing to ${outputDirectory}`);

    const modelInfo = await parser(modelinfoFile);
    let generator: IGenerator;
    const { complexTypes } = modelInfo;
    if (isMongoid) {
      generator = new MongoidTypeGenerator(outputDirectory);
    } else {
      generator = new TypeScriptGenerator(outputDirectory);
    }
    const promises = complexTypes.map(async (typeInfo) => {
      const generated = await generator.generate(typeInfo);
      return generated;
    });

    const generatedTypes = await Promise.all(promises);
  }
}
