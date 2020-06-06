import fs from "fs";
import parser from "../src/parser";
import execPromise from "./execPromise";

describe("generateTypescriptTypes", () => {
  const modelDir = "./test/typescript";
  const modelInfoFile = "./resources/fhir-modelinfo-4.0.1.xml";
  const generatorScript = "./src/generateTypeScriptTypes.ts";

  // remove models after tests have been run
  afterEach(async () => {
    await execPromise(`rm -rf ${modelDir}`);
  });

  async function generateTypeScript(): Promise<string> {
    const command = `npx ts-node ${generatorScript} --output-directory=${modelDir}`;
    return execPromise(command);
  }

  test("Should generate fhir types in typescript successfully", async () => {
    const { complexTypes } = await parser(modelInfoFile);
    const result = await generateTypeScript();

    expect(result).toMatch(
      /info: Parsing .* and writing to .*\ninfo: Successfully generated \d+ types/
    );

    complexTypes.forEach((typeInfo: { name: string }) => {
      const file = fs.readFileSync(`${modelDir}/classes/FHIR/${typeInfo.name}.ts`);
      expect(file).toBeDefined();
    });
  });
});
