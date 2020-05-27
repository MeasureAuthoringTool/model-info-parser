import { normalizeElementTypeName } from "../utils";
import MemberVariable from "./dataTypes/MemberVariable";
import parseDataType from "./dataTypes/parseDataType";
import ElementTypeSpecifier from "./ElementTypeSpecifier";
import { IRawElementTypeSpecifier } from "./ElementTypeSpecifier";

export interface IRawElement {
  $: {
    name: string;
    elementType: string;
  };
  "ns4:elementTypeSpecifier"?: Array<IRawElementTypeSpecifier>;
}

export default class Element {
  readonly name: string;

  readonly memberVariables: Array<MemberVariable>;

  constructor(raw: IRawElement) {
    const { $: attrs } = raw;
    this.name = attrs.name;

    const specifierElementArray = raw["ns4:elementTypeSpecifier"];
    if (specifierElementArray) {
      // Not a simple element... (choice or array)
      const [rawSpecifierElement] = specifierElementArray;
      const elementTypeSpecifier = new ElementTypeSpecifier(
        this.name,
        rawSpecifierElement
      );
      this.memberVariables = elementTypeSpecifier.memberVariables;
    } else {
      // Simple element def
      const elementType = attrs.elementType;
      const [namespace, normalizedTypeName] = normalizeElementTypeName(elementType);
      const dataType = parseDataType(namespace, normalizedTypeName);
      this.memberVariables = [new MemberVariable(dataType, this.name, false)];
    }
  }
}
