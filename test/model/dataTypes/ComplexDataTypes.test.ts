import ComplexDataType from "../../../src/model/dataTypes/ComplexDataType";
import { primitiveTypeCheck } from "../../../src/model/dataTypes/primitiveDataTypes";
import { normalizeTypeName } from "../../../src/utils";

jest.mock("../../../src/model/dataTypes/primitiveDataTypes", () => ({
  primitiveTypeCheck: jest.fn().mockReturnValue(true),
}));
jest.mock("../../../src/utils", () => ({
  normalizeTypeName: jest.fn().mockReturnValue("normalName"),
}));

describe("ComplexDataType", () => {
  describe("getInstance", () => {
    test("it creates a new instance when none are cached", () => {
      const result = ComplexDataType.getInstance("ns", "type");
      expect(result.namespace).toBe("ns");
      expect(result.typeName).toBe("type");
    });

    test("it should compute the value of the 'primitive' member", () => {
      const result = ComplexDataType.getInstance("ns", "type");
      expect(primitiveTypeCheck).toHaveBeenCalledWith("type");
      expect(result.primitive).toBeTruthy();
    });

    test("it should compute the value of the 'normalizedName' member", () => {
      const result = ComplexDataType.getInstance("ns", "type");
      expect(normalizeTypeName).toHaveBeenCalledWith("type");
      expect(result.normalizedName).toBe("normalName");
    });

    test("it should re-use cached values", () => {
      const type1 = ComplexDataType.getInstance("ns", "type1");
      const type1Copy = ComplexDataType.getInstance("ns", "type1");
      const differentType = ComplexDataType.getInstance("ns", "type2");
      const differentNamespace = ComplexDataType.getInstance("ns2", "type1");
      expect(type1 === type1Copy).toBeTruthy();
      expect(type1 === differentType).toBeFalsy();
      expect(type1 === differentNamespace).toBeFalsy();
    });
  });
});
