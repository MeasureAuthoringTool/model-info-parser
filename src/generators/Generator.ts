import TypeInfo from "../model/TypeInfo";

export default interface Generator {
  generate(typeInfo: TypeInfo): Promise<string>;
}
