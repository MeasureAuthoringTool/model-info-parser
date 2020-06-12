import { mocked } from "ts-jest/utils";
import fs from "fs/promises";
import ModelInfoParser from "../src/ModelInfoParser";

jest.mock("fs/promises");

const mockedFs = mocked(fs);

describe("ModelInfoParser", () => {
  const modelInfoFileName = "modelInfo.dummy.file.xml";
  const modelInfoXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns4:modelInfo name="FHIR" version="4.0.1" url="http://hl7.org/fhir" targetQualifier="fhir"
               patientClassName="FHIR.Patient" patientBirthDatePropertyName="birthDate.value"
               xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ns4="urn:hl7-org:elm-modelinfo:r1"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ns4:requiredModelInfo name="System" version="1.0.0"/>
</ns4:modelInfo>`;

  beforeEach(() => {
    mockedFs.readFile.mockResolvedValue(modelInfoXml);
  });

  describe("parseModelInfoXmlFile()", () => {
    it("should read from the file, parse it, and return a ModelInfo instance", async () => {
      const result = await ModelInfoParser.parseModelInfoXmlFile(
        modelInfoFileName
      );
      expect(mockedFs.readFile).toHaveBeenCalledWith(modelInfoFileName);
      expect(result.name).toBe("FHIR");
      expect(result.version).toBe("4.0.1");
    });

    it("should handle errors and throw its own", async () => {
      mockedFs.readFile.mockImplementation(() => {
        throw new Error("Filesystem error");
      });

      await expect(async () => {
        await ModelInfoParser.parseModelInfoXmlFile(modelInfoFileName);
      }).rejects.toThrow("Unable to read ModelInfo file");
    });
  });
});
