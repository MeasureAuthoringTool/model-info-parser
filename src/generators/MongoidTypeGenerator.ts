import _ from "lodash";
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
  const fileName = `${_.snakeCase(normalizedName)}.rb`;

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
  // These types need to appear first in the list of exported modules
  const hoistedModelNames: Array<string> = [
    "type",
    "resource",
    "domain_resource",
    "element",
    "backbone_element",
    "extension",
    "quantity",
    "primitive_uri",
    "primitive_string",
    "primitive_base_64_binary",
    "primitive_boolean",
    "primitive_canonical",
    "primitive_code",
    "primitive_date",
    "primitive_date_time",
    "primitive_decimal",
    "primitive_id",
    "primitive_instant",
    "primitive_integer",
    "primitive_markdown",
    "primitive_oid",
    "primitive_positive_int",
    "primitive_question",
  ];

  // Remove existing occurrences of above types
  _.remove(models, (name) => hoistedModelNames.includes(name));

  // Add the above names to the front of the array
  const prependedNames: Array<string> = [...hoistedModelNames, ...models];

  const contents: string = exportModelsTemplate({ names: prependedNames });
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
      const entityName = _.snakeCase(entity.dataType.normalizedName);
      entityNames.push(entityName);
      return generate(entity, entityCollection.baseDir);
    }
  );

  await generateModelExporter(entityNames, entityCollection.baseDir);

  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
