import PathSegment from "../../../src/model/dataTypes/PathSegment";
import DataType from "../../../src/model/dataTypes/DataType";

describe("PathSegment", () => {
  const dataType = DataType.getInstance("ns", "TypeName", "/tmp");
  const pathSegment = new PathSegment(dataType, true, "foo.bar");

  describe("constructor", () => {
    it("should initialize instance variables correctly", () => {
      expect(pathSegment.dataType).toBe(dataType);
      expect(pathSegment.isArray).toBeTrue();
      expect(pathSegment.path).toBe("foo.bar");
    });
  });

  describe("#clone()", () => {
    it("should return an exact copy if no attributes specified", () => {
      const result = pathSegment.clone();
      expect(result).not.toBe(pathSegment);
      expect(result.dataType).toBe(dataType);
      expect(result.isArray).toBeTrue();
      expect(result.path).toBe("foo.bar");
    });

    it("should allow specifying a custom dataType", () => {
      const newType = DataType.getInstance("ns2", "Type2", "/tmp");
      const result = pathSegment.clone({
        dataType: newType,
      });
      expect(result.dataType).toBe(newType);
    });

    it("should allow specifying a custom isArray value", () => {
      const result = pathSegment.clone({
        isArray: false,
      });
      expect(result.isArray).toBeFalse();
    });

    it("should allow specifying a custom path value", () => {
      const result = pathSegment.clone({
        path: "new.path",
      });
      expect(result.path).toBe("new.path");
    });
  });
});
