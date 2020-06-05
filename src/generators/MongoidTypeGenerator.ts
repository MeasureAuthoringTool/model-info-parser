import FileWriter from "../FileWriter";
import { mongoidPrimitiveTypes } from "../model/dataTypes/primitiveDataTypes";
import TypeInfo from "../model/TypeInfo";
import classTemplate from "../templates/rubymongoid/classTemplate";
import IGenerator from "./IGenerator";

async function generate(
  typeInfo: TypeInfo,
  baseDirectory: string
): Promise<string> {
  // skip type creation for primitives
  if (mongoidPrimitiveTypes[typeInfo.name]) {
    return "";
  }

  const contents: string = classTemplate(typeInfo);
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

const typeCheck: IGenerator = generate;
export default typeCheck;
