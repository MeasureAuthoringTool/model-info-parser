import { convertPrimitiveName } from "../../../src/model/dataTypes/primitiveDataTypes";

describe('primitiveDataTypes', () => {
  describe('convertPrimitiveName()', () => {
    test("it handle empty string", () => {
      expect(convertPrimitiveName("")).toBe("");
    });

    test("it handle non-matched string", () => {
      expect(convertPrimitiveName("foo")).toBe("foo");
    });

    test("it converts primitive type name to its proper form", () => {
      expect(convertPrimitiveName("instant")).toBe("PrimitiveInstant");
      expect(convertPrimitiveName("unsignedInt")).toBe("PrimitiveUnsignedInt");
      expect(convertPrimitiveName("base64Binary")).toBe("PrimitiveBase64Binary");
      expect(convertPrimitiveName("xhtml")).toBe("PrimitiveXhtml");
    });
  });
});
