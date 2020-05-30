import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import { mongoidPrimitiveTypes } from "../src/model/dataTypes/primitiveDataTypes";
import parser from "../src/parser";

describe('generateMongoidTypes', () => {

  const modelDir = './generated/mongoid';
  // remove models after all tests have been run
  afterAll(() => {
    exec(`rm -rf ${path.resolve(modelDir)}`);
  });

  interface IResult {
    code: number;
    error: any;
  }

  function cli(): Promise<IResult> {
    return new Promise(resolve => {
      exec(`ts-node ${path.resolve("./src/generateMongoidTypes.ts")}`,
        (error: any, stdout: any, stderr: any) => { resolve({
          code: error && error.code ? error.code : 0, error});
        });
    });
  }

  test('Should generate mongoid models successfully', async() => {
    const result = await  cli();
    expect(result.code).toBe(0);
    expect(result.error).toBe(null);
  });

  test('should have a mongoid model for each typeinfo', async() => {
    const modelinfoFile = `${path.resolve("./resources/fhir-modelinfo-4.0.1.xml")}`;
    const { complexTypes } = await parser(modelinfoFile) as any;
    complexTypes.map((typeInfo: { name: any; }) => {
      // skip the primitives
      if (!mongoidPrimitiveTypes[typeInfo.name]) {
        const file = fs.readFileSync(path.resolve(`${modelDir}/fhir/${typeInfo.name}.rb`));
        expect(file).toBeDefined();
      }
    });
  });

});
