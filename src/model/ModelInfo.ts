import { RawTypeInfo } from "./TypeInfo";
import TypeInfo from "./TypeInfo";

export const typeName = "ns4:modelInfo";
export const typeInfoTypeName = "ns4:typeInfo";

export interface RawModelInfo {
  [typeName]: {
    $: {
      name: string;
      version: string;
    };
    [typeInfoTypeName]: Array<RawTypeInfo>;
  };
}

export default class ModelInfo {
  name: string;
  version: string;
  types: Array<TypeInfo>;
  // "complexTypes" is a misnomer: we generate type alias definitions for primitives too.
  // The only types we omit are reserved TS keywords: boolean and string
  complexTypes: Array<TypeInfo>;

  constructor(raw: RawModelInfo) {
    const { $: attrs, [typeInfoTypeName]: rawTypeInfoArr } = raw[typeName];
    this.name = attrs.name;
    this.version = attrs.version;
    this.types = rawTypeInfoArr.map((rawType) => new TypeInfo(rawType));
    this.complexTypes = this.types.filter((type) => !type.isReservedKeyword && !type.isBlacklisted);
  }
}
