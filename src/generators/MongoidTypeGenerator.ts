import FileWriter from "../FileWriter";
import { mongoidPrimitiveTypes } from "../model/dataTypes/primitiveDataTypes";
import TypeInfo from "../model/TypeInfo";
import classTemplate from "../templates/rubymongoid/classTemplate";
import IGenerator from "./IGenerator";

export default class MongoidTypeGenerator implements IGenerator {
  async generate(typeInfo: TypeInfo, baseDirectory: string): Promise<string> {
    let contents: string;

    // skip type creation for primitives
    if (mongoidPrimitiveTypes[typeInfo.name]) {
      return "";
    }

    contents = classTemplate(typeInfo);
    const { namespace, name } = typeInfo;
    const fileName = `${name}.rb`;

    const writer = new FileWriter(
      contents,
      baseDirectory,
      namespace.toLowerCase(),
      fileName
    );
    await writer.writeFile();
    return contents;
  }
}