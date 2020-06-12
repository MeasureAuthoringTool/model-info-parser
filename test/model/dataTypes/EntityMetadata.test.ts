import EntityMetadata from "../../../src/model/dataTypes/EntityMetadata";

describe("EntityMetadata", () => {
  describe("constructor", () => {
    it("should initialize EntityMetadata variables", () => {
      const result = new EntityMetadata("namespace", "typeName", "parentTypeName");
      expect(result.namespace).toBe("namespace");
      expect(result.originalTypeName).toBe("typeName");
      expect(result.parentTypeName).toBe("parentTypeName");
    });
  });

  describe("clone", () => {
    it("should create an deep copy of the metadata", () => {
      const original = new EntityMetadata("namespace", "typeName", "parentTypeName");
      const result = original.clone();
      expect(result).not.toBe(original);
      expect(result.namespace).toBe("namespace");
      expect(result.originalTypeName).toBe("typeName");
      expect(result.parentTypeName).toBe("parentTypeName");
    });
  });
});
