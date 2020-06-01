import { exec } from 'child_process';
import fs from 'fs';
import parser from '../src/parser';

describe('generateTypescriptTypes', () => {

  const modelDir = './test/typescript';
  const modelInfoFile = './resources/fhir-modelinfo-4.0.1.xml';
  const generatorScript = './src/generateTypeScriptTypes.ts';

  // remove models after all tests have been run
  afterAll(() => {
    exec(`rm -rf ${modelDir}`);
  });

  function generateTypescript(): Promise<{ code: number, error: any }> {
    return new Promise(resolve => {
      exec(`ts-node ${generatorScript} --output-directory=${modelDir}`,
        (error: any, stdout: any, stderr: any) => { resolve({
          code: error && error.code ? error.code : 0, error});
        });
    });
  }

  test('Should generate fhir types in typescript successfully', async() => {
    const result = await  generateTypescript();
    expect(result.code).toBe(0);
    expect(result.error).toBe(null);
  });

  test('Should have a fhir typescript class for each typeinfo', async() => {
    const { complexTypes } = await parser(modelInfoFile);
    complexTypes.forEach((typeInfo: { name: any; }) => {
      const file = fs.readFileSync(`${modelDir}/fhir/${typeInfo.name}.ts`);
      expect(file).toBeDefined();
    });
  });
});
