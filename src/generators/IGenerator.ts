import TypeInfo from "../model/TypeInfo";

export default interface IGenerator {
  generate(typeInfo: TypeInfo, baseDirectory: string): Promise<string>;
}
