import FileWriter from "../FileWriter";
import classTemplate, {
  TemplateContext,
} from "../templates/rubymongoid/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import exportModelsTemplate from "../templates/rubymongoid/allMongoidExportTemplate";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
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

/**
 * Generate a common file models.rb to require all mongoid models
 */
export async function generateModelExporter(
  models: Array<string>,
  baseDirectory: FilePath
): Promise<void> {
  const contents: string = exportModelsTemplate({ names: models });
  const writer = new FileWriter(
    contents,
    baseDirectory.value,
    null,
    "models.rb"
  );
  await writer.writeFile();
}

/**
 * Generate all mongoid models
 */
async function generateModels(
  entityCollection: EntityCollection
): Promise<Array<string>> {
  const entityNames: string[] = [];
  const promises = entityCollection.entities.map(
    async (entity: EntityDefinition) => {
      entityNames.push(entity.dataType.typeName);
      return generate(entity, entityCollection.baseDir);
    }
  );

  await generateModelExporter(entityNames, entityCollection.baseDir);

  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
