import TypeInfo from "../model/TypeInfo";

export default interface IGenerator {
  generate(typeInfo: TypeInfo): Promise<string>;
}
