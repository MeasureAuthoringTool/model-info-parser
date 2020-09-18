import PrimaryCodeType from "../../../src/model/dataTypes/PrimaryCodeType";
import DataType from "../../../src/model/dataTypes/DataType";

describe("PrimaryCodeType", () => {
  const dataType = DataType.getInstance("ns", "TypeName", "/tmp");
  const primaryCodeType = new PrimaryCodeType(dataType, true, "foo.bar");

  describe("constructor", () => {
    it("should initialize instance variables correctly", () => {
      expect(primaryCodeType.dataType).toBe(dataType);
      expect(primaryCodeType.isArray).toBeTrue();
      expect(primaryCodeType.path).toBe("foo.bar");
    });
  });

  describe("#clone()", () => {
    it("should return an exact copy if no attributes specified", () => {
      const result = primaryCodeType.clone();
      expect(result).not.toBe(primaryCodeType);
      expect(result.dataType).toBe(dataType);
      expect(result.isArray).toBeTrue();
      expect(result.path).toBe("foo.bar");
    });

    it("should allow specifying a custom dataType", () => {
      const newType = DataType.getInstance("ns2", "Type2", "/tmp");
      const result = primaryCodeType.clone({
        dataType: newType,
      });
      expect(result.dataType).toBe(newType);
    });

    it("should allow specifying a custom isArray value", () => {
      const result = primaryCodeType.clone({
        isArray: false,
      });
      expect(result.isArray).toBeFalse();
    });

    it("should allow specifying a custom path value", () => {
      const result = primaryCodeType.clone({
        path: "new.path",
      });
      expect(result.path).toBe("new.path");
    });
  });
});
