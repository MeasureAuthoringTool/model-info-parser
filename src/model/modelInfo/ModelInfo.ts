import TypeInfo, { TypeInfoXml } from "./TypeInfo";

export interface ModelInfoXml {
  ["ns4:modelInfo"]: {
    $: {
      name: string;
      version: string;
    };
    ["ns4:typeInfo"]?: Array<TypeInfoXml>;
  };
}

/**
 * This represents the top-level element in the modelinfo file.
 *
 * For the most part, it is a collection of type definitions
 */
export default class ModelInfo {
  constructor(
    public name: string,
    public version: string,
    public types: Array<TypeInfo>
  ) {}

  static createModelInfo(input: ModelInfoXml): ModelInfo {
    const modelInfoBase = input["ns4:modelInfo"];
    const { $: attrs } = modelInfoBase;
    const typeInfoArray: Array<TypeInfoXml> = modelInfoBase["ns4:typeInfo"] || [];
    const { name, version } = attrs;

    const types: Array<TypeInfo> = typeInfoArray.reduce(
      (accumulator: Array<TypeInfo>, currentTypeXml: TypeInfoXml) => {
        const typeInfo: TypeInfo = TypeInfo.createTypeInfo(currentTypeXml);
        accumulator.push(typeInfo);
        return accumulator;
      },
      []
    );

    return new ModelInfo(name, version, types);
  }
}
