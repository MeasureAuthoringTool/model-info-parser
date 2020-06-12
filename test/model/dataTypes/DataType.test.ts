import DataType from "../../../src/model/dataTypes/DataType";
import FilePath from "../../../src/model/dataTypes/FilePath";

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
      const result = DataType.getInstance("System", "SystemType", "/tmp");
      expect(result.namespace).toBe("System");
      expect(result.typeName).toBe("SystemType");
      expect(result.systemType).toBe(true);
    });

    it("should not normalize system type names", () => {
      const result = DataType.getInstance("System", "String.Type", "/tmp");
      expect(result.systemType).toBeTruthy();
      expect(result.normalizedName).toBe("String.Type");
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
  });
});
