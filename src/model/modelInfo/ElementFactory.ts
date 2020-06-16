import Element from "./Element";
import ChoiceElement, { ChoiceType } from "./ChoiceElement";
import ListElement from "./ListElement";
import SimpleElement from "./SimpleElement";
import { normalizeElementTypeName } from "../../utils";

/**
 * This is how the XML is structured for an ElementTypeSpecifier's choice option.
 * Example:
 * <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="CodeableConcept"/>
 *
 * It could also be how the XML is structured for the ListTypeSpecifier's NamedTypeSpecifier child:
 * <ns4:elementTypeSpecifier xsi:type="ns4:ListTypeSpecifier">
 *   <ns4:elementTypeSpecifier xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="ClaimResponse.Item"/>
 * </ns4:elementTypeSpecifier>
 */
export interface SimpleSpecifierXml {
  $: {
    modelName: string;
    name: string;
  };
}

/**
 * This is how the XML is structured for an ElementTypeSpecifier
 * Example:
 * <ns4:elementTypeSpecifier xsi:type="ns4:ChoiceTypeSpecifier">
 *   <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="CodeableConcept"/>
 *   <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="Reference"/>
 * </ns4:elementTypeSpecifier>
 *
 * Or:
 * <ns4:elementTypeSpecifier xsi:type="ns4:ListTypeSpecifier" elementType="FHIR.Identifier"/>
 */
export interface ElementTypeSpecifierXml {
  $: {
    "xsi:type": string;
    elementType?: string;
  };
  "ns4:choice"?: Array<SimpleSpecifierXml>;
  "ns4:elementTypeSpecifier"?: Array<SimpleSpecifierXml>;
}

/**
 * This interface defines how an Element's XML comes from xml2js
 */
export interface ElementXml {
  $: {
    name: string;
    elementType?: string;
  };
  "ns4:elementTypeSpecifier"?: Array<ElementTypeSpecifierXml>;
}

/**
 * This class is responsible for converting the XML object structure created by xml2js
 * into one of the 3 different Element types: SimpleElement, ChoiceElement or ListElement
 */
export default class ElementFactory {
  public static createElement(input: ElementXml): Element {
    const { $: attrs } = input;
    const { name, elementType } = attrs;
    const specifierElementArray = input["ns4:elementTypeSpecifier"];

    // If no specifier and an elementType, this is a SimpleElement
    if (!specifierElementArray && elementType) {
      const [namespace, typeName] = normalizeElementTypeName(elementType);
      return new SimpleElement(name, namespace, typeName);
    }

    // Ensure we don't have an invalid specifier array
    if (!specifierElementArray || specifierElementArray.length !== 1) {
      throw new Error("Cannot parse invalid Element XML");
    }

    const specifier: ElementTypeSpecifierXml = specifierElementArray[0];
    const { $: specifierAttrs } = specifier;
    const specifierElementType = specifierAttrs.elementType;
    const specifierType = specifierAttrs["xsi:type"];
    const choiceArray = specifier["ns4:choice"];

    // List type
    if (specifierType === "ns4:ListTypeSpecifier") {
      // There are two types of List syntax in the modelinfo. This one is simpler
      if (specifierElementType) {
        const [namespace, typeName] = normalizeElementTypeName(
          specifierElementType
        );
        return new ListElement(name, namespace, typeName);
      }

      // This is the other, slightly more complex list type syntax
      const namedSpecifierArray = specifier["ns4:elementTypeSpecifier"];

      // Ensure we don't have an invalid specifier array
      if (!namedSpecifierArray || namedSpecifierArray.length !== 1) {
        throw new Error("Cannot parse invalid ElementTypeSpecifier XML");
      }

      const namedSpecifier = namedSpecifierArray[0];
      const { $: namedSpecifierAttrs } = namedSpecifier;
      return new ListElement(
        name,
        namedSpecifierAttrs.modelName,
        namedSpecifierAttrs.name
      );
    }

    // Choice type
    if (specifierType === "ns4:ChoiceTypeSpecifier") {
      if (!choiceArray || choiceArray.length === 0) {
        throw new Error("Cannot parse empty element choice list");
      }
      const choices: Array<ChoiceType> = choiceArray.reduce(
        (accumulator: Array<ChoiceType>, currentChoice) => {
          const { $: choiceAttrs } = currentChoice;
          const {
            modelName: choiceNamespace,
            name: choiceTypeName,
          } = choiceAttrs;
          const choice: ChoiceType = {
            typeName: choiceTypeName,
            namespace: choiceNamespace,
          };

          accumulator.push(choice);
          return accumulator;
        },
        []
      );
      return new ChoiceElement(name, choices);
    }

    throw new Error(`Unexpected ElementTypeSpecifier type: "${specifierType}"`);
  }
}
