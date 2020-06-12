import ElementFactory, {
  IElementXml,
  IElementTypeSpecifierXml,
} from "../../../src/model/modelinfo/ElementFactory";
import ChoiceElement from "../../../src/model/modelinfo/ChoiceElement";
import ListElement from "../../../src/model/modelinfo/ListElement";
import SimpleElement from "../../../src/model/modelinfo/SimpleElement";

describe("ElementFactory", () => {
  let choiceSpecifier: IElementTypeSpecifierXml;
  let listSpecifier: IElementTypeSpecifierXml;
  let alternateListSpecifier: IElementTypeSpecifierXml;

  beforeEach(() => {
    choiceSpecifier = {
      $: {
        "xsi:type": "ns4:ChoiceTypeSpecifier",
      },
      "ns4:choice": [
        {
          $: {
            modelName: "FHIR1",
            name: "Name1",
          },
        },
        {
          $: {
            modelName: "FHIR2",
            name: "Name2",
          },
        },
      ],
    };

    listSpecifier = {
      $: {
        "xsi:type": "ns4:ListTypeSpecifier",
        elementType: "FHIR.TheType",
      },
    };

    // This is the one with the NamedTypeSpecifier child
    alternateListSpecifier = {
      $: {
        "xsi:type": "ns4:ListTypeSpecifier",
      },
      "ns4:elementTypeSpecifier": [
        {
          $: {
            modelName: "FHIR3",
            name: "Name3",
          },
        },
      ],
    };
  });

  describe("createElement()", () => {
    it("should create a SimpleElement", () => {
      const input: IElementXml = {
        $: {
          name: "memberName",
          elementType: "namespace.typeName",
        },
      };
      const result = ElementFactory.createElement(input);
      expect(result).toBeInstanceOf(SimpleElement);
      const castResult = result as SimpleElement;
      expect(castResult.name).toBe("memberName");
      expect(castResult.namespace).toBe("namespace");
      expect(castResult.typeName).toBe("typeName");
    });

    it("should create a ListElement", () => {
      const input: IElementXml = {
        $: {
          name: "listName",
        },
        "ns4:elementTypeSpecifier": [listSpecifier],
      };
      const result = ElementFactory.createElement(input);
      expect(result).toBeInstanceOf(ListElement);
      const castResult = result as ListElement;
      expect(castResult.name).toBe("listName");
      expect(castResult.namespace).toBe("FHIR");
      expect(castResult.typeName).toBe("TheType");
    });

    it("should create a ListElement using the alternate syntax", () => {
      const input: IElementXml = {
        $: {
          name: "alternateListName",
        },
        "ns4:elementTypeSpecifier": [alternateListSpecifier],
      };
      const result = ElementFactory.createElement(input);
      expect(result).toBeInstanceOf(ListElement);
      const castResult = result as ListElement;
      expect(castResult.name).toBe("alternateListName");
      expect(castResult.namespace).toBe("FHIR3");
      expect(castResult.typeName).toBe("Name3");
    });

    it("should throw an error if too many named specifiers in alternate syntax", () => {
      const namedArray =
        alternateListSpecifier["ns4:elementTypeSpecifier"] || [];
      namedArray.push(namedArray[0]);
      const input: IElementXml = {
        $: {
          name: "alternateListName",
        },
        "ns4:elementTypeSpecifier": [alternateListSpecifier],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrow("Cannot parse invalid ElementTypeSpecifier XML");
    });

    it("should throw an error if noy named specifiers in alternate syntax", () => {
      const namedArray =
        alternateListSpecifier["ns4:elementTypeSpecifier"] || [];
      namedArray.length = 0;
      const input: IElementXml = {
        $: {
          name: "alternateListName",
        },
        "ns4:elementTypeSpecifier": [alternateListSpecifier],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrow("Cannot parse invalid ElementTypeSpecifier XML");
    });

    it("should create a ChoiceElement", () => {
      const input: IElementXml = {
        $: {
          name: "listName",
        },
        "ns4:elementTypeSpecifier": [choiceSpecifier],
      };
      const result = ElementFactory.createElement(input);
      expect(result).toBeInstanceOf(ChoiceElement);
      const castResult = result as ChoiceElement;
      expect(castResult.name).toBe("listName");
      expect(castResult.choices.length).toBe(2);
      expect(castResult.choices[0].namespace).toBe("FHIR1");
      expect(castResult.choices[0].typeName).toBe("Name1");
      expect(castResult.choices[1].namespace).toBe("FHIR2");
      expect(castResult.choices[1].typeName).toBe("Name2");
    });

    it("should reject missing elementTypeSpecifiers", () => {
      const input: IElementXml = {
        $: {
          name: "memberName",
        },
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrowError("Cannot parse invalid Element XML");
    });

    it("should reject empty elementTypeSpecifiers", () => {
      const input: IElementXml = {
        $: {
          name: "memberName",
        },
        "ns4:elementTypeSpecifier": [],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrowError("Cannot parse invalid Element XML");
    });

    it("should reject too many elementTypeSpecifiers", () => {
      const input: IElementXml = {
        $: {
          name: "memberName",
        },
        "ns4:elementTypeSpecifier": [choiceSpecifier, listSpecifier],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrowError("Cannot parse invalid Element XML");
    });

    it("should reject elementTypeSpecifiers of the wrong type", () => {
      listSpecifier.$["xsi:type"] = "something invalid";
      const input: IElementXml = {
        $: {
          name: "memberName",
        },
        "ns4:elementTypeSpecifier": [listSpecifier],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrowError(
        'Unexpected ElementTypeSpecifier type: "something invalid"'
      );
    });

    it("should reject choice specifiers with no choices", () => {
      choiceSpecifier["ns4:choice"] = [];
      const input: IElementXml = {
        $: {
          name: "memberName",
        },
        "ns4:elementTypeSpecifier": [choiceSpecifier],
      };
      expect(() => {
        ElementFactory.createElement(input);
      }).toThrowError("Cannot parse empty element choice list");
    });
  });
});
