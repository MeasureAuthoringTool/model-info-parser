import { normalizeElementTypeName, normalizeTypeName } from "../utils";
import ComplexDataType from "./dataTypes/ComplexDataType";
import distinctDataTypes from "./dataTypes/distinctDataTypes";
import IDataType from "./dataTypes/IDataType";
import MemberVariable from "./dataTypes/MemberVariable";
import parseDataType from "./dataTypes/parseDataType";
import { primitiveTypeCheck } from "./dataTypes/primitiveDataTypes";
import { SystemStringInstance } from "./dataTypes/system/SystemString";
import Element, { IRawElement } from "./Element";

const elementTypeName = "ns4:element";

export interface IRawTypeInfo {
  $: {
    name: string;
    namespace: string;
    baseType: string;
  };
  [elementTypeName]: Array<IRawElement>;
}

// We treat "string" and "boolean" differently because they are reserved TS keywords.
// The other "system" types get generated as type aliases. E.g. "FHIR.integer" is just an alias to TS "number"
const reservedKeywordTypeNames = ["boolean", "string"];

// These are FHIR types we don't know how to deal with (and hope we never have to)
const blacklistedTypes = [
  "allowedUnits",
  "DataElement constraint on ElementDefinition data type",
];

export default class TypeInfo {
  fhirName: string;
  name: string;
  namespace: string;
  baseFhirType: string;
  baseDataType: IDataType | null;
  elements: Array<Element>;
  distinctTypes: Array<IDataType>;
  primitive: boolean;
  isReservedKeyword: boolean; // Used to filter out "string" and "boolean" types
  memberVariables: Array<MemberVariable>;
  isBlacklisted: boolean; // Used to filter out unnecessarily difficult types we don't know how to deal with

  constructor(raw: IRawTypeInfo) {
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

    this.memberVariables = this.elements.reduce(
      (accumulator: Array<MemberVariable>, currentElement) => {
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
