import xml2js from "xml2js";
import ModelInfo, {
  IModelInfoXml,
} from "../../../src/model/modelinfo/ModelInfo";
import SimpleElement from "../../../src/model/modelinfo/SimpleElement";
import TypeInfo from "../../../src/model/modelinfo/TypeInfo";
import { IElementXml } from "../../../src/model/modelinfo/ElementFactory";
import ChoiceElement from "../../../src/model/modelinfo/ChoiceElement";
import ListElement from "../../../src/model/modelinfo/ListElement";

describe("ModelInfo", () => {
  describe("constructor", () => {
    it("should initalize variables correctly", () => {
      const elements = [new SimpleElement("foo", "bar", "baz")];
      const typeInfo = new TypeInfo(
        "name",
        "namespace",
        "baseTypeName",
        "baseTypeNamespace",
        elements
      );

      const modelInfo = new ModelInfo("name", "version", [typeInfo]);
      expect(modelInfo.name).toBe("name");
      expect(modelInfo.version).toBe("version");
      expect(modelInfo.types).toStrictEqual([typeInfo]);
    });
  });

  describe("createTypeInfo()", () => {
    let input: IModelInfoXml;

    beforeEach(() => {
      const element1: IElementXml = {
        $: {
          name: "memberName1",
          elementType: "elNamespace1.elTypeName1",
        },
      };
      const typeInfoXml = {
        $: {
          name: "typeInfoName",
          namespace: "typeNamespace",
          baseType: "baseNs.baseType",
        },
        "ns4:element": [element1],
      };

      input = {
        "ns4:modelInfo": {
          $: {
            name: "modelInfoName",
            version: "modelInfoVersion",
          },
          "ns4:typeInfo": [typeInfoXml],
        },
      };
    });

    test("creates a ModelInfo from XML representation", () => {
      const modelInfo: ModelInfo = ModelInfo.createModelInfo(input);
      expect(modelInfo.name).toBe("modelInfoName");
      expect(modelInfo.version).toBe("modelInfoVersion");
      expect(modelInfo.types.length).toBe(1);

      const typeInfo: TypeInfo = modelInfo.types[0];

      expect(typeInfo.name).toBe("typeInfoName");
      expect(typeInfo.elements).toBeArrayOfSize(1);
    });

    test("creates a ModelInfo from XML with no typeInfo elements", () => {
      input["ns4:modelInfo"]["ns4:typeInfo"] = undefined;
      const modelInfo: ModelInfo = ModelInfo.createModelInfo(input);
      expect(modelInfo.types).toBeArrayOfSize(0);
    });
  });

  describe("XML parsing end-to-end", () => {
    const xmlInput = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns4:modelInfo name="FHIR" version="4.0.1" url="http://hl7.org/fhir" targetQualifier="fhir"
               patientClassName="FHIR.Patient" patientBirthDatePropertyName="birthDate.value"
               xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ns4="urn:hl7-org:elm-modelinfo:r1"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ns4:requiredModelInfo name="System" version="1.0.0"/>
  
  <ns4:typeInfo xsi:type="ns4:ClassInfo" namespace="FHIR" name="VisionStatus" retrievable="false"
                baseType="FHIR.Element">
    <ns4:element name="value" elementType="System.String"/>
    
    <ns4:element name="references">
      <ns4:elementTypeSpecifier xsi:type="ns4:ListTypeSpecifier" elementType="FHIR.Reference"/>
    </ns4:element>
    
    <ns4:element name="subject">
      <ns4:elementTypeSpecifier xsi:type="ns4:ChoiceTypeSpecifier">
        <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="CodeableConcept"/>
        <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="Reference"/>
      </ns4:elementTypeSpecifier>
    </ns4:element>
  </ns4:typeInfo>
  
</ns4:modelInfo>`;

    test("it can parse an XML string and return object tree", async () => {
      const parser = new xml2js.Parser();
      const parsedXml: IModelInfoXml = (await parser.parseStringPromise(
        xmlInput
      )) as IModelInfoXml;
      const modelInfo = ModelInfo.createModelInfo(parsedXml);

      expect(modelInfo.name).toBe("FHIR");
      expect(modelInfo.version).toBe("4.0.1");
      expect(modelInfo.types.length).toBe(1);

      const typeInfo = modelInfo.types[0];
      expect(typeInfo.name).toBe("VisionStatus");
      expect(typeInfo.namespace).toBe("FHIR");
      expect(typeInfo.baseTypeName).toBe("Element");
      expect(typeInfo.baseTypeNamespace).toBe("FHIR");
      expect(typeInfo.elements.length).toBe(3);

      const element1 = typeInfo.elements[0];
      expect(element1).toBeInstanceOf(SimpleElement);
      const simpleElement = element1 as SimpleElement;
      expect(simpleElement.name).toBe("value");
      expect(simpleElement.namespace).toBe("System");
      expect(simpleElement.typeName).toBe("String");

      const element2 = typeInfo.elements[1];
      expect(element2).toBeInstanceOf(ListElement);
      const listElement = element2 as ListElement;
      expect(listElement.name).toBe("references");
      expect(listElement.namespace).toBe("FHIR");
      expect(listElement.typeName).toBe("Reference");

      const element3 = typeInfo.elements[2];
      expect(element3).toBeInstanceOf(ChoiceElement);
      const choiceElement = element3 as ChoiceElement;
      expect(choiceElement.name).toBe("subject");
      expect(choiceElement.choices.length).toBe(2);
      expect(choiceElement.choices[0].namespace).toBe("FHIR");
      expect(choiceElement.choices[0].typeName).toBe("CodeableConcept");
      expect(choiceElement.choices[1].namespace).toBe("FHIR");
      expect(choiceElement.choices[1].typeName).toBe("Reference");
    });
  });
});
