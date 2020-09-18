import Element from "./Element";
import ElementFactory, { ElementXml } from "./ElementFactory";
import { normalizeElementTypeName } from "../../utils";

/**
 * This is how the XML is structured for a TypeInfo element
 * Example:
 *
 * <ns4:typeInfo
 *     xsi:type="ns4:ClassInfo" namespace="FHIR" name="ActionSelectionBehavior" retrievable="false" baseType="FHIR.Element">
 *   <ns4:element name="value" elementType="System.String"/>
 * </ns4:typeInfo>
 */
export interface TypeInfoXml {
  $: {
    name: string;
    namespace: string;
    baseType: string;
    primaryCodePath?: string;
  };
  ["ns4:element"]?: Array<ElementXml>;
}

/**
 * This represents the TypeInfo element in modelinfo XML.
 * It is the top-level definition of a modelinfo type
 */
export default class TypeInfo {
  constructor(
    public readonly name: string,
    public readonly namespace: string,
    public readonly baseTypeName: string | null,
    public readonly baseTypeNamespace: string | null,
    public readonly elements: Array<Element>,
    public readonly primaryCodePath: string | null = null
  ) {}

  static createTypeInfo(input: TypeInfoXml): TypeInfo {
    const { $: attrs } = input;
    const elementArray = input["ns4:element"] || [];
    const { name, namespace, baseType, primaryCodePath } = attrs;

    let baseTypeName = null;
    let baseNamespace = null;

    if (baseType) {
      const [normalizedBaseNs, normalizeBaseType] = normalizeElementTypeName(
        baseType
      );
      baseTypeName = normalizeBaseType;
      baseNamespace = normalizedBaseNs;
    }

    const elements: Array<Element> = elementArray.reduce(
      (accumulator: Array<Element>, currentElXml: ElementXml) => {
        const element: Element = ElementFactory.createElement(currentElXml);
        accumulator.push(element);
        return accumulator;
      },
      []
    );

    return new TypeInfo(name, namespace, baseTypeName, baseNamespace, elements, primaryCodePath);
  }
}
