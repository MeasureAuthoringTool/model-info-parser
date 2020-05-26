import ElementTypeSpecifier from "./ElementTypeSpecifier";
import {RawElementTypeSpecifier} from "./ElementTypeSpecifier";
import parseDataType from "./dataTypes/parseDataType";
import {normalizeElementTypeName} from "../utils";
import MemberVariable from "./dataTypes/MemberVariable";

export interface RawElement {
  $: {
    name: string;
    elementType: string;
  }
  "ns4:elementTypeSpecifier"?: Array<RawElementTypeSpecifier>;
}

export default class Element {
  readonly name: string;

  readonly memberVariables: Array<MemberVariable>;

  constructor(raw: RawElement) {
    const {$: attrs} = raw;
    this.name = attrs.name;

    const specifierElementArray = raw["ns4:elementTypeSpecifier"];
    if (specifierElementArray) {
      // Not a simple element... (choice or array)
      const [rawSpecifierElement] = specifierElementArray;
      const elementTypeSpecifier = new ElementTypeSpecifier(this.name, rawSpecifierElement);
      this.memberVariables = elementTypeSpecifier.memberVariables;
    } else {
      // Simple element def
      const elementType = attrs.elementType;
      const [namespace, typeName] = normalizeElementTypeName(elementType);
      const dataType = parseDataType(namespace, typeName);
      this.memberVariables = [new MemberVariable(dataType, this.name, false)];
    }
  }
}
