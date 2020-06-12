import DataType from "../../../src/model/dataTypes/DataType";
import EntityImports from "../../../src/model/dataTypes/EntityImports";
import IsDataTypePredicate from "../../../src/collectionUtils/IsDataTypePredicate";

describe("EntityImports", () => {
  const dt1 = DataType.getInstance("ns", "type1", "/tmp");
  const dt2 = DataType.getInstance("ns", "type2", "/tmp");

  describe("constructor", () => {
    it("should initialize the dataTypes property", () => {
      const input = [dt1, dt2];
      const result = new EntityImports(input);
      expect(result.dataTypes).toStrictEqual(input);
      expect(result.dataTypes).not.toBe(input); // different instances
    });

    it("should sort the dataTypes being added", () => {
      const input = [dt2, dt1];
      const result = new EntityImports(input);
      expect(result.dataTypes).toStrictEqual([dt1, dt2]);
    });

    it("should remove duplicates from the dataTypes being added", () => {
      const input = [dt2, dt1, dt2, dt2, dt1];
      const result = new EntityImports(input);
      expect(result.dataTypes).toStrictEqual([dt1, dt2]);
    });
  });

  describe("#clone()", () => {
    it("should create a deep copy of the original", () => {
      const input = [dt1, dt2];
      const original = new EntityImports(input);
      const result = original.clone();
      expect(result.dataTypes).toStrictEqual(input);
      expect(result.dataTypes).not.toBe(input);
      expect(result.dataTypes).not.toBe(original.dataTypes);
      expect(result).not.toBe(original);
    });
  });

  describe("#addImport()", () => {
    it("should return a new EntityImport with the additional import added", () => {
      const input = [dt1];
      const original = new EntityImports(input);
      const result = original.addImport(dt2);
      expect(result.dataTypes).toStrictEqual([dt1, dt2]);
      expect(result.dataTypes).not.toBe(input);
      expect(result).not.toBe(original);
    });
  });

  describe("#removeImports()", () => {
    it("should return a new EntityImport with the specified imports removed", () => {
      const predicate = new IsDataTypePredicate("ns", "type1");
      const input = [dt1, dt2];
      const original = new EntityImports(input);
      const result = original.removeImports(predicate);
      expect(result.dataTypes).toStrictEqual([dt2]);
      expect(result.dataTypes).not.toBe(input);
      expect(result).not.toBe(original);
    });
  });
});
