import FileWriter from "../FileWriter";
import { mongoidPrimitiveTypes } from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {
  TemplateContext,
} from "../templates/rubymongoid/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import exportModelsTemplate from "../templates/rubymongoid/allMongoidExportTemplate";

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
  return entityDefinition.dataType.normalizedName;
}

export async function generateModelExporter(models: Array<string>, baseDirectory: string): Promise<void> {
  const contents: string = exportModelsTemplate({names: models});
  const writer = new FileWriter(contents, baseDirectory, null, "models.rb");
  return writer.writeFile();
}

const typeCheck: Generator = generate;
export default typeCheck;
