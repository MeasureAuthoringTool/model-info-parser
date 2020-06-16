import FileWriter from "../FileWriter";
import { mongoidPrimitiveTypes } from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {
  TemplateContext,
} from "../templates/rubymongoid/classTemplate";
import IGenerator from "./IGenerator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  // skip type creation for primitives
  if (mongoidPrimitiveTypes[entityDefinition.dataType.typeName]) {
    return "";
  }

  const templateInput: TemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    memberVariables: entityDefinition.memberVariables,
  };

  const contents: string = classTemplate(templateInput);
  const { namespace, normalizedName } = entityDefinition.dataType;
  const fileName = `${normalizedName}.rb`;

  const writer = new FileWriter(
    contents,
    baseDirectory.value,
    namespace.toLowerCase(),
    fileName
  );
  await writer.writeFile();
  return contents;
}

const typeCheck: IGenerator = generate;
export default typeCheck;
