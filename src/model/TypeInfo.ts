import { normalizeTypeName, normalizeElementTypeName } from "../utils";
import { RawElement } from "./Element";
import Element from "./Element";
import DataType from "./dataTypes/DataType";
import distinctDataTypes from "./dataTypes/distinctDataTypes";
import MemberVariable from "./dataTypes/MemberVariable";
import parseDataType from "./dataTypes/parseDataType";
import {
  primitiveTypeCheck,
  containsPrimitive,
} from "./dataTypes/primitiveDataTypes";
import { SystemStringInstance } from "./dataTypes/system/SystemString";
import ComplexDataType from "./dataTypes/ComplexDataType";

const elementTypeName = "ns4:element";

export interface RawTypeInfo {
  $: {
    name: string;
    namespace: string;
    baseType: string;
  };
  [elementTypeName]: Array<RawElement>;
}

// We treat "string" and "boolean" differently because they are reserved TS keywords.
// The other "system" types get generated as type aliases. E.g. "FHIR.integer" is just an alias to TS "number"
const reservedKeywordTypeNames = ["boolean", "string"];

// These are FHIR types we don't know how to deal with (and hope we never have to)
const blacklistedTypes = ["allowedUnits", "DataElement constraint on ElementDefinition data type"];

export default class TypeInfo {
  fhirName: string;
  name: string;
  namespace: string;
  baseFhirType: string;
  baseDataType: DataType | null;
  elements: Array<Element>;
  distinctTypes: Array<DataType>;
  primitive: boolean;
  isReservedKeyword: boolean; // Used to filter out "string" and "boolean" types
  memberVariables: Array<MemberVariable>;
  aliasType: boolean = false;
  isBlacklisted: boolean; // Used to filter out unnecessarily difficult types we don't know how to deal with

  constructor(raw: RawTypeInfo) {
    const attrs = raw.$;
    const rawElementsArr = raw[elementTypeName] || [];
    this.fhirName = attrs.name;
    this.name = normalizeTypeName(this.fhirName);
    this.namespace = attrs.namespace;

    // Parse the parent class/baseType info
    // TODO What about "baseTypeSpecifier"? Only on "allowedUnits"??
    this.baseFhirType = attrs.baseType;
    if (this.baseFhirType) {
      const [baseNamespace, normalizedBaseTypeName] = normalizeElementTypeName(
        this.baseFhirType
      );
      this.baseDataType = parseDataType(baseNamespace, normalizedBaseTypeName);
    } else {
      this.baseDataType = null;
    }

    // Convert raw XML into our Element type
    this.elements = [];
    rawElementsArr.forEach((rawElement) => {
      this.elements.push(new Element(rawElement));
    });

    // No data members, just an alias to the parent type
    if (this.elements.length === 0) {
      this.aliasType = true;
    }

    // Just a single member, whose name is "value"
    if (this.elements.length === 1 && this.elements[0].name === "value") {
      const [valueElement] = this.elements;

      if (valueElement.memberVariables.length === 1) {
        // Just a simple alias type
        this.aliasType = true;
        this.baseDataType = valueElement.memberVariables[0].dataType;
      } else {
        // Leave the field alone.
        // The value can be a choice of types. Look at Contract.Term.Offer.Answer as an example
      }
    }

    this.memberVariables = this.elements.reduce(
      (accumulator, currentElement) => {
        return accumulator.concat(currentElement.memberVariables);
      },
      []
    );

    this.distinctTypes = distinctDataTypes(
      this.memberVariables,
      this.baseDataType,
      this.name,
      this.namespace
    );
    this.isReservedKeyword = reservedKeywordTypeNames.includes(this.name);
    this.isBlacklisted = blacklistedTypes.includes(this.fhirName);
    this.primitive = primitiveTypeCheck(this.name);

    // Check if we're looking at "Extension". We have to treat that differently to prevent circular dependencies
    if (this.namespace === "FHIR" && this.name === "Extension") {
      // Remove "Element" from the list of imports
      this.distinctTypes = this.distinctTypes.filter(
        (type) => type.typeName !== "Element"
      );

      // Stop being a child of Element
      this.baseDataType = null;

      // Add the "id" property (just like Element)
      this.memberVariables.push(new MemberVariable(SystemStringInstance, "id"));

      // Add an Array of Extensions to itself (just like Element)
      const extensionDataType = new ComplexDataType("FHIR", "Extension");
      this.memberVariables.push(
        new MemberVariable(extensionDataType, "extension", true)
      );
    }
  }
}
