import ComplexDataType from "../../src/model/dataTypes/ComplexDataType";
import TypeHierarchy from "../../src/model/TypeHierarchy";

describe("TypeHierarchy", () => {
  let type1: ComplexDataType;
  let type2: ComplexDataType;
  let type3: ComplexDataType;
  let type4: ComplexDataType;
  let parentType1: ComplexDataType;
  let parentType2: ComplexDataType;
  let hierarchy: TypeHierarchy;

  beforeEach(() => {
    type1 = ComplexDataType.getInstance("ns", "type1");
    type2 = ComplexDataType.getInstance("ns", "type2");
    type3 = ComplexDataType.getInstance("ns", "type3");
    type4 = ComplexDataType.getInstance("ns", "type4");
    parentType1 = ComplexDataType.getInstance("ns", "parentType1");
    parentType2 = ComplexDataType.getInstance("ns", "parentType2");
    hierarchy = new TypeHierarchy();
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
