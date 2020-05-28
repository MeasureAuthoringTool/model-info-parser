import _ from "lodash";
import { normalizeElementTypeName, normalizeTypeName } from "../utils";
import IDataType from "./dataTypes/IDataType";
import MemberVariable from "./dataTypes/MemberVariable";
import parseDataType from "./dataTypes/parseDataType";

export interface IRawSpecifier {
  $: {
    modelName: string;
    name: string;
  };
}

export interface IRawElementTypeSpecifier {
  $: {
    "xsi:type": string;
    elementType?: string;
  };
  "ns4:choice"?: Array<IRawSpecifier>;
  "ns4:elementTypeSpecifier"?: Array<IRawSpecifier>;
}

export enum TypeSpecifier {
  ListTypeSpecifier = "ns4:ListTypeSpecifier",
  ChoiceTypeSpecifier = "ns4:ChoiceTypeSpecifier",
}

export default class ElementTypeSpecifier {
  private readonly parentElementName: string;
  readonly specifierType: TypeSpecifier;
  readonly memberVariables: Array<MemberVariable>;

  constructor(parentElementName: string, raw: IRawElementTypeSpecifier) {
    this.parentElementName = parentElementName;
    const { $: attrs } = raw;

    const type = attrs["xsi:type"];
    this.memberVariables = [];

    switch (type) {
      case "ns4:ListTypeSpecifier":
        this.specifierType = TypeSpecifier.ListTypeSpecifier;
        break;
      case "ns4:ChoiceTypeSpecifier":
        this.specifierType = TypeSpecifier.ChoiceTypeSpecifier;
        break;
      default:
        throw new Error(`Unsupported ElementTypeSpecifier: ${type}`);
    }

    if (this.specifierType === TypeSpecifier.ChoiceTypeSpecifier) {
      const choiceArray = raw["ns4:choice"] || [];
      choiceArray.forEach((specifier) => {
        const dataType = ElementTypeSpecifier.convertSpecifierToDataType(
          specifier
        );
        const { typeName } = dataType;
        const capitalTypeName = _.upperFirst(typeName);
        const memberName = parentElementName + capitalTypeName;
        this.memberVariables.push(
          new MemberVariable(dataType, memberName, false)
        );
      });
    } else if (this.specifierType === TypeSpecifier.ListTypeSpecifier) {
      const namedSpecifierArray = raw["ns4:elementTypeSpecifier"];

      if (namedSpecifierArray) {
        // The more complex way, with child "NameTypeSpecifier" elements
        const [specifier] = namedSpecifierArray;
        const dataType = ElementTypeSpecifier.convertSpecifierToDataType(
          specifier
        );

        this.memberVariables.push(
          new MemberVariable(dataType, parentElementName, true)
        );
      } else {
        // The simpler variety of lists- no child "elementTypeSpecifier NameTypeSpecifier" elements
        if (!attrs.elementType) {
          throw new Error('Missing expected "elementType" attribute');
        }
        const elementType = attrs.elementType;
        const [namespace, normalizedTypeName] = normalizeElementTypeName(
          elementType
        );
        const dataType = parseDataType(namespace, normalizedTypeName);

        this.memberVariables.push(
          new MemberVariable(dataType, parentElementName, true)
        );
      }
    } else {
      throw new Error(`Unsupported TypeSpecifier ${this.specifierType}`);
    }
  }

  static convertSpecifierToDataType(specifier: IRawSpecifier): IDataType {
    const { $: specifierAttrs } = specifier;
    const { name, modelName } = specifierAttrs;
    const normalizedName = normalizeTypeName(name);
    return parseDataType(modelName, normalizedName);
  }
}
