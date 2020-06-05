import fs from "fs";
import { mongoidPrimitiveTypes } from "../src/model/dataTypes/primitiveDataTypes";
import parser from "../src/parser";
import execPromise from "./execPromise";

describe("generateMongoidTypes", () => {
  const modelDir = "./test/mongoid";
  const modelInfoFile = "./resources/fhir-modelinfo-4.0.1.xml";
  const generatorScript = "./src/generateMongoidTypes.ts";

  // remove models after tests have been run
  afterEach(async () => {
    await execPromise(`rm -rf ${modelDir}`);
  });

  async function generateMongoids(): Promise<string> {
    const command = `npx ts-node ${generatorScript} --output-directory=${modelDir}`;
    return execPromise(command);
  }

  test("Should generate mongoid models successfully", async () => {
    const { complexTypes } = await parser(modelInfoFile);
    const result = await generateMongoids();

    expect(result).toMatch(
      /info: Parsing .* and writing to .*\ninfo: Successfully generated \d+ types/
    );

    complexTypes.forEach((typeInfo: { name: string }) => {
      // skip the primitives
      if (!mongoidPrimitiveTypes[typeInfo.name]) {
        const file = fs.readFileSync(`${modelDir}/fhir/${typeInfo.name}.rb`);
        expect(file).toBeDefined();
      }
    });
  });
});
