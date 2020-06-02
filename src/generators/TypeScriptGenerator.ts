import FileWriter from "../FileWriter";
import TypeInfo from "../model/TypeInfo";
import classTemplate from "../templates/typescript/classTemplate";
import IGenerator from "./IGenerator";

export default class TypeScriptGenerator implements IGenerator {
  async generate(typeInfo: TypeInfo, baseDirectory: string): Promise<string> {
    const contents: string = classTemplate(typeInfo);

    const { namespace, name } = typeInfo;
    const fileName = `${name}.ts`;

    const writer = new FileWriter(contents, baseDirectory, namespace, fileName);
    await writer.writeFile();
    return contents;
  }
}
