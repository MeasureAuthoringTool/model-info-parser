import Generator from "./Generator";
import TypeInfo from "../model/TypeInfo";
import classTemplate from "../templates/typescript/classTemplate";
import typeAliasTemplate from "../templates/typescript/typeAliasTemplate";
import FileWriter from "../FileWriter";

export default class TypeScriptGenerator implements Generator {
  constructor(private baseDirectory: string) {}

  async generate(typeInfo: TypeInfo): Promise<string> {
    let contents: string;

    if (typeInfo.aliasType) {
      contents = typeAliasTemplate(typeInfo);
    } else {
      contents = classTemplate(typeInfo);
    }

    const { namespace, name } = typeInfo;
    const fileName = `${name}.ts`;

    const writer = new FileWriter(
      contents,
      this.baseDirectory,
      namespace,
      fileName
    );
    await writer.writeFile();
    return contents;
  }
}
