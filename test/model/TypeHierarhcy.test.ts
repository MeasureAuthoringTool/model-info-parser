import DataType from "../../src/model/dataTypes/DataType";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import TypeHierarchy from "../../src/model/TypeHierarchy";
import EntityDefinitionBuilder from "./dataTypes/EntityDefinitionBuilder";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("TypeHierarchy", () => {
  let type1: DataType;
  let type2: DataType;
  let type3: DataType;
  let type4: DataType;
  let parentType1: DataType;
  let parentType2: DataType;
  let collection: EntityCollection;
  let hierarchy: TypeHierarchy;

  beforeEach(() => {
    const builder = new EntityDefinitionBuilder();
    const entity = builder.buildEntityDefinition();
    collection = new EntityCollection([entity], FilePath.getInstance("/tmp"));

    type1 = DataType.getInstance("ns", "type1", "/tmp");
    type2 = DataType.getInstance("ns", "type2", "/tmp");
    type3 = DataType.getInstance("ns", "type3", "/tmp");
    type4 = DataType.getInstance("ns", "type4", "/tmp");
    parentType1 = DataType.getInstance("ns", "parentType1", "/tmp");
    parentType2 = DataType.getInstance("ns", "parentType2", "/tmp");
    hierarchy = new TypeHierarchy();
  });

  describe("constructor", () => {
    it("should build a TypeHierarchy from an EntityCollection", () => {
      const result = new TypeHierarchy(collection);
      expect(Object.keys(result.typeMap).length).toBe(2);
      expect(Object.keys(result.typeMap)[0]).toBe("ns4.Data.Type");
      expect(Object.keys(result.typeMap)[1]).toBe("ns3.Base.Type");
    });
  });

  describe("buildKey", () => {
    test("it builds a key using namespace and type name", () => {
      expect(TypeHierarchy.buildKey(type1)).toBe("ns.type1");
    });
  });

  describe("addType", () => {
    test("it adds a type with no parent to the hierarchy", () => {
      hierarchy.addType(type1, null);

      expect(Object.keys(hierarchy.typeMap).length).toBe(1);
      const type1Entry = hierarchy.typeMap["ns.type1"];

      expect(type1Entry).toBeDefined();
      expect(Array.from(type1Entry)).toStrictEqual([]);
    });

    test("it adds a type with a parent to the hierarchy", () => {
      hierarchy.addType(type1, parentType1);

      expect(Object.keys(hierarchy.typeMap).length).toBe(2);
      const type1Entry = hierarchy.typeMap["ns.type1"];
      const parentEntry = hierarchy.typeMap["ns.parentType1"];

      expect(type1Entry).toBeDefined();
      expect(parentEntry).toBeDefined();

      expect(Array.from(type1Entry)).toStrictEqual([]);
      expect(Array.from(parentEntry)).toStrictEqual([type1]);
    });
  });

  describe("getAllChildrenFor", () => {
    test("it handles types not in the hierarchy", () => {
      expect(hierarchy.getAllChildrenFor(type1)).toStrictEqual([]);
    });

    test("it recursively returns all children for a type", () => {
      // Hierarchy is:
      // parentType1 => parentType2 => type1
      //                            => type2
      //             => type3
      // type4 (no parent)
      // Add them out of order intentionally
      hierarchy.addType(type1, parentType2);
      hierarchy.addType(parentType2, parentType1);
      hierarchy.addType(type2, parentType2);
      hierarchy.addType(type4, null);
      hierarchy.addType(type3, parentType1);

      expect(hierarchy.getAllChildrenFor(type1)).toStrictEqual([]);
      expect(hierarchy.getAllChildrenFor(type2)).toStrictEqual([]);
      expect(hierarchy.getAllChildrenFor(type3)).toStrictEqual([]);
      expect(hierarchy.getAllChildrenFor(type4)).toStrictEqual([]);
      expect(hierarchy.getAllChildrenFor(parentType2)).toStrictEqual([
        type1,
        type2,
      ]);
      expect(hierarchy.getAllChildrenFor(parentType1)).toStrictEqual([
        parentType2,
        type3,
        type1,
        type2,
      ]);
    });
  });
});
