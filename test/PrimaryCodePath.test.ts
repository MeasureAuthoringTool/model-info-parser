import {
  CodeableConcept,
  ResourceChild,
  PrimitiveBoolean,
  PathWithArray,
  NestedArray,
  Coding,
  ChoicePath,
  PrimitiveString,
} from "./fixture/generatedTypeScript/fhir";

describe("Tests for the generated primaryCode logic", () => {
  describe("single, non-nested paths", () => {
    it("should return the primaryCode value when present", () => {
      const element = new ResourceChild();
      expect(element.primaryCode).toBeUndefined();

      element.boolVal = PrimitiveBoolean.parsePrimitive(true);
      expect(element.primaryCode).not.toBeUndefined();
      expect(element.primaryCode?.value).toBeTrue();
    });
  });

  describe("non-nested path with array at end", () => {
    it("should return the primaryCode value when present", () => {
      const element = new PathWithArray();
      expect(element.primaryCode).toBeUndefined();

      element.boolList = [];
      expect(element.primaryCode).toBeUndefined();

      element.boolList = [PrimitiveBoolean.parsePrimitive(true)];
      expect(element.primaryCode).not.toBeUndefined();
      expect(element.primaryCode?.value).toBeTrue();
    });
  });

  describe("nested path with array in middle", () => {
    it("should return the primaryCode value when present", () => {
      const element = new NestedArray();
      expect(element.primaryCode).toBeUndefined();

      element.codeList = [];
      expect(element.primaryCode).toBeUndefined();

      element.codeList = [new CodeableConcept()];
      element.codeList[0].coding = [new Coding()];
      element.codeList[0].coding[0].id = "hi";

      expect(element.primaryCode).not.toBeUndefined();
      expect(element.primaryCode?.id).toBe("hi");

      const newCoding = new Coding();
      newCoding.id = "bye";
      element.primaryCode = newCoding;
      expect(element.codeList[0].coding[0].id).toBe("bye");
    });
  });

  describe("primary code with a choice path", () => {
    it("should return the primaryCode value when present", () => {
      const element = new ChoicePath();
      expect(element.primaryCode).toBeUndefined();

      // Test getter and setter for a PrimitiveBoolean value
      element.options = PrimitiveBoolean.parsePrimitive(true);
      expect(PrimitiveBoolean.isPrimitiveBoolean(element.options)).toBeTrue();
      expect(
        PrimitiveBoolean.isPrimitiveBoolean(element.primaryCode)
      ).toBeTrue();
      if (PrimitiveBoolean.isPrimitiveBoolean(element.options)) {
        expect(element.options.value).toBeTrue();
      }
      if (PrimitiveBoolean.isPrimitiveBoolean(element.primaryCode)) {
        expect(element.primaryCode.value).toBeTrue();
      }

      // Test getter and setter for a Coding value
      const newCoding = new Coding();
      newCoding.display = PrimitiveString.parsePrimitive("displayVal");
      element.options = newCoding;
      expect(Coding.isCoding(element.options)).toBeTrue();
      expect(Coding.isCoding(element.primaryCode)).toBeTrue();
      if (Coding.isCoding(element.options)) {
        expect(element.options.display?.value).toBe("displayVal");
      }
      if (Coding.isCoding(element.primaryCode)) {
        expect(element.primaryCode.display?.value).toBe("displayVal");
      }
    });
  });
});
