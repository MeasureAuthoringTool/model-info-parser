import DataType from "../../../src/model/dataTypes/DataType";
import FilePath from "../../../src/model/dataTypes/FilePath";
import SystemString from "../../../src/model/dataTypes/system/SystemString";
import SystemBoolean from "../../../src/model/dataTypes/system/SystemBoolean";
import SystemDate from "../../../src/model/dataTypes/system/SystemDate";
import SystemDecimal from "../../../src/model/dataTypes/system/SystemDecimal";
import SystemDateTime from "../../../src/model/dataTypes/system/SystemDateTime";
import SystemInteger from "../../../src/model/dataTypes/system/SystemInteger";
import SystemTime from "../../../src/model/dataTypes/system/SystemTime";

describe("DataType", () => {
  describe("getInstance", () => {
    it("should throw an error if passed a relative FilePath", () => {
      expect(() => {
        DataType.getInstance(
          "ns",
          "someType",
          FilePath.getInstance("someDir/notRelative")
        );
      }).toThrow(
        'Cannot create DataType for relative path "someDir/notRelative"'
      );
    });

    it("should create a new instance when none are cached", () => {
      const result = DataType.getInstance("ns", "Type.Name", "/tmp");
      expect(result.namespace).toBe("ns");
      expect(result.typeName).toBe("Type.Name");
      expect(result.path.value).toBe("/tmp/ns/TypeName");
    });

    it("should compute the 'systemType' member", () => {
      const result = DataType.getInstance("System", "newDateTime", "/tmp");
      expect(result.namespace).toBe("System");
      expect(result.typeName).toBe("newDateTime");
      expect(result.systemType).toBe(true);
    });

    it("should not normalize system type names", () => {
      const result = DataType.getInstance("System", "newString", "/tmp");
      expect(result.systemType).toBeTruthy();
      expect(result.normalizedName).toBe("newString");
    });

    it("should not mark system types as primitive", () => {
      const result = DataType.getInstance("System", "String", "/tmp");
      expect(result.primitive).toBeFalse();
    });

    it("should compute the value of the 'primitive' member", () => {
      const result = DataType.getInstance("FHIR", "string", "/tmp");
      expect(result.primitive).toBeTruthy();
    });

    it("should re-use cached values", () => {
      const type1 = DataType.getInstance("ns", "type1", "/tmp");
      const type1Copy = DataType.getInstance("ns", "type1", "/tmp");
      const differentType = DataType.getInstance("ns", "type2", "/tmp");
      const differentNamespace = DataType.getInstance("ns2", "type1", "/tmp");
      expect(type1 === type1Copy).toBeTruthy();
      expect(type1 === differentType).toBeFalsy();
      expect(type1 === differentNamespace).toBeFalsy();
    });

    it("should recognize system types and use their singleton instances", () => {
      expect(DataType.getInstance("System", "Boolean", "/tmp")).toBe(
        SystemBoolean
      );
      expect(DataType.getInstance("System", "Date", "/tmp")).toBe(SystemDate);
      expect(DataType.getInstance("System", "Decimal", "/tmp")).toBe(
        SystemDecimal
      );
      expect(DataType.getInstance("System", "DateTime", "/tmp")).toBe(
        SystemDateTime
      );
      expect(DataType.getInstance("System", "Integer", "/tmp")).toBe(
        SystemInteger
      );
      expect(DataType.getInstance("System", "String", "/tmp")).toBe(
        SystemString
      );
      expect(DataType.getInstance("System", "Time", "/tmp")).toBe(SystemTime);
    });
  });

  describe("#convertTypeToPrimitive()", () => {
    it("should set the specified type's primitive flag to true", () => {
      const originalType = DataType.getInstance("NewNS", "NewType", "/tmp");
      expect(originalType.primitive).toBeFalse();

      const result = DataType.convertTypeToPrimitive(originalType);
      expect(result).toBe(originalType);
      expect(result.path).toBe(originalType.path);
      expect(result.normalizedName).toBe(originalType.normalizedName);
      expect(result.systemType).toBe(originalType.systemType);
      expect(result.typeName).toBe(originalType.typeName);
      expect(result.namespace).toBe(originalType.namespace);
      expect(result.primitive).toBeTrue();

      const cachedType = DataType.getInstance("NewNS", "NewType", "/tmp");
      expect(cachedType).toBe(result);
      expect(cachedType.primitive).toBeTrue();
    });
  });
});
