import {
  ResourceChild,
  PrimitiveBoolean,
  PathWithArray,
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
});
