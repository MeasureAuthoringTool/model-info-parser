import PrimaryCode from "../../../src/model/dataTypes/PrimaryCode";
import PathSegment from "../../../src/model/dataTypes/PathSegment";
import DataType from "../../../src/model/dataTypes/DataType";

describe("PrimaryCode", () => {
  const dataType1 = DataType.getInstance("ns1", "TypeName1", "/tmp");
  const dataType2 = DataType.getInstance("ns2", "TypeName2", "/tmp");
  const dataType3 = DataType.getInstance("ns3", "TypeName3", "/tmp");
  const dataType4 = DataType.getInstance("ns4", "TypeName4", "/tmp");
  const pathSegment1 = new PathSegment(dataType1, true, "foo");
  const pathSegment2 = new PathSegment(dataType2, false, "bar");

  describe("constructor", () => {
    it("should initialize instance variables correctly", () => {
      const result = new PrimaryCode([pathSegment1, pathSegment2], [dataType3, dataType4]);
      expect(result.pathSegments).toEqual([pathSegment1, pathSegment2]);
      expect(result.returnType).toEqual([dataType3, dataType4]);
    });

    it("should throw an error if empty array of segments is passed", () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new PrimaryCode([], [dataType3]);
      }).toThrow("Cannot create PrimaryCode with no PathSegments");
    });

    it("should throw an error if empty array of return types is passed", () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new PrimaryCode([pathSegment1], []);
      }).toThrow("Cannot create PrimaryCode with no return types");
    });
  });

  describe("#clone()", () => {
    let primaryCode: PrimaryCode;

    beforeEach(() => {
      primaryCode = new PrimaryCode([pathSegment1, pathSegment2], [dataType3, dataType4]);
    });

    it("should return an exact copy if no attributes specified", () => {
      const result = primaryCode.clone();
      expect(result).not.toBe(primaryCode);
      expect(result.pathSegments).toEqual([pathSegment1, pathSegment2]);
      expect(result.returnType).toEqual([dataType3, dataType4]);
    });

    it("should allow specifying an array of path segments", () => {
      const result = primaryCode.clone({
        pathSegments: [pathSegment2],
      });
      expect(result.pathSegments).toBeArrayOfSize(1);
      expect(result.pathSegments[0]).toBe(pathSegment2);
    });

    it("should allow specifying an array of return types", () => {
      const result = primaryCode.clone({
        returnType: [dataType4],
      });
      expect(result.returnType).toBeArrayOfSize(1);
      expect(result.returnType[0]).toBe(dataType4);
    });
  });
});
