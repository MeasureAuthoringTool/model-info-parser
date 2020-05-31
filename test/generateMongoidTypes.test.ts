import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { mongoidPrimitiveTypes } from "../src/model/dataTypes/primitiveDataTypes";
import parser from "../src/parser";

describe('generateMongoidTypes', () => {

  const modelDir = './generated/mongoid';
  const modelInfoPath = './resources/fhir-modelinfo-4.0.1.xml';
  const generatorScriptPath = './src/generateMongoidTypes.ts';

  // remove models after all tests have been run
  afterAll(() => {
    exec(`rm -rf ${path.resolve(modelDir)}`);
  });

  function generateMongoids(): Promise<{ code: number, error: any }> {
    return new Promise(resolve => {
      exec(`ts-node ${path.resolve(generatorScriptPath)}`,
        (error: any, stdout: any, stderr: any) => { resolve({
          code: error && error.code ? error.code : 0, error});
        });
    });
  }

  test('Should generate mongoid models successfully', async() => {
    const result = await  generateMongoids();
    expect(result.code).toBe(0);
    expect(result.error).toBe(null);
  });

  test('Should have a mongoid model for each typeinfo', async() => {
    const modelInfoFile = `${path.resolve(modelInfoPath)}`;
    const { complexTypes } = await parser(modelInfoFile) as any;
    complexTypes.forEach((typeInfo: { name: any; }) => {
      // skip the primitives
      if (!mongoidPrimitiveTypes[typeInfo.name]) {
        const file = fs.readFileSync(path.resolve(`${modelDir}/fhir/${typeInfo.name}.rb`));
        expect(file).toBeDefined();
      }
    });
  });
});
