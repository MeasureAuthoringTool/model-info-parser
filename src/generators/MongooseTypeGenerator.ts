import FileWriter from "../FileWriter";
import { mongoosePrimitiveTypes } from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {
  TemplateContext,
} from "../templates/mongoose/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  // TODO: work around primitive type names issue
  const primitiveTypeName = entityDefinition.dataType.typeName
    .replace("Primitive", "")
    .toLowerCase();
  // skip type creation for primitives
  if (mongoosePrimitiveTypes[primitiveTypeName]) {
    return "";
  }

  const templateInput: TemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    memberVariables: entityDefinition.memberVariables,
  };

  const contents: string = classTemplate(templateInput);
  const { namespace, normalizedName } = entityDefinition.dataType;
  const fileName = `${normalizedName}.js`;

  const writer = new FileWriter(
    contents,
    baseDirectory.value,
    namespace.toLowerCase(),
    fileName
  );
  await writer.writeFile();
  return contents;
}

const typeCheck: Generator = generate;
export default typeCheck;
