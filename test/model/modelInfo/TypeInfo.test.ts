import TypeInfo, { TypeInfoXml } from "../../../src/model/modelInfo/TypeInfo";
import SimpleElement from "../../../src/model/modelInfo/SimpleElement";
import { ElementXml } from "../../../src/model/modelInfo/ElementFactory";

describe("TypeInfo", () => {
  test("constructor", () => {
    const elements = [new SimpleElement("foo", "bar", "baz")];
    const el = new TypeInfo(
      "name",
      "namespace",
      "baseTypeName",
      "baseTypeNamespace",
      elements,
      "primaryCodePathVal"
    );
    expect(el.name).toBe("name");
    expect(el.namespace).toBe("namespace");
    expect(el.baseTypeName).toBe("baseTypeName");
    expect(el.baseTypeNamespace).toBe("baseTypeNamespace");
    expect(el.elements).toStrictEqual(elements);
    expect(el.primaryCodePath).toBe("primaryCodePathVal");
  });

  describe("createTypeInfo()", () => {
    let input: TypeInfoXml;

    beforeEach(() => {
      const element1: ElementXml = {
        $: {
          name: "memberName1",
          elementType: "elNamespace1.elTypeName1",
        },
      };

      const element2: ElementXml = {
        $: {
          name: "memberName2",
          elementType: "elNamespace2.elTypeName2",
        },
      };

      input = {
        $: {
          name: "typeInfoName",
          namespace: "typeNamespace",
          baseType: "baseNs.baseType",
          primaryCodePath: "primaryCodePathVal"
        },
        "ns4:element": [element1, element2],
      };
    });

    it("should handle type with no base type", () => {
      delete input.$.baseType;
      const result: TypeInfo = TypeInfo.createTypeInfo(input);
      expect(result.baseTypeName).toBeNull();
      expect(result.baseTypeNamespace).toBeNull();
    });

    it("should handle type with no elements", () => {
      delete input["ns4:element"];
      const result: TypeInfo = TypeInfo.createTypeInfo(input);
      expect(result.name).toBe("typeInfoName");
      expect(result.elements).toBeArrayOfSize(0);
    });

    it("creates a TypeInfo from XML representation", () => {
      const result: TypeInfo = TypeInfo.createTypeInfo(input);

      expect(result.name).toBe("typeInfoName");
      expect(result.namespace).toBe("typeNamespace");
      expect(result.baseTypeName).toBe("baseType");
      expect(result.baseTypeNamespace).toBe("baseNs");
      expect(result.primaryCodePath).toBe("primaryCodePathVal");
      expect(result.elements.length).toBe(2);

      const element1 = result.elements[0];
      expect(element1).toBeInstanceOf(SimpleElement);
      const castEl1 = element1 as SimpleElement;
      expect(castEl1.name).toBe("memberName1");
      expect(castEl1.namespace).toBe("elNamespace1");
      expect(castEl1.typeName).toBe("elTypeName1");

      const element2 = result.elements[1];
      expect(element2).toBeInstanceOf(SimpleElement);
      const castEl2 = element2 as SimpleElement;
      expect(castEl2.name).toBe("memberName2");
      expect(castEl2.namespace).toBe("elNamespace2");
      expect(castEl2.typeName).toBe("elTypeName2");
    });
  });
});
