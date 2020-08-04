import _ from "lodash";
import FileWriter from "../FileWriter";
import classTemplate, {
  TemplateContext,
} from "../templates/mongoose/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import exportModelsTemplate from "../templates/mongoose/allModelsTemplate";
import exportSchemaHeaders from "../templates/mongoose/allModelHeadersTemplate";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<void> {
  const templateInput: TemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    memberVariables: entityDefinition.memberVariables,
    imports: entityDefinition.imports.dataTypes,
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
}

function prepareAllModelNamesForExport(models: Array<string>): Array<string> {
  const hoistedModelNames: Array<string> = [
    "Type",
    "Extension",
    "Element",
    "PrimitiveUri",
    "PrimitiveString",
    "PrimitiveBase64Binary",
    "PrimitiveBoolean",
    "PrimitiveCanonical",
    "PrimitiveCode",
    "PrimitiveDate",
    "PrimitiveDateTime",
    "PrimitiveDecimal",
    "PrimitiveId",
    "PrimitiveInstant",
    "PrimitiveInteger",
    "PrimitiveMarkdown",
    "PrimitiveOid",
    "PrimitivePositiveInt",
    "PrimitiveQuestion",
    "Coding",
    "Meta",
    "Resource",
    "DomainResource",
    "BackboneElement",
    "Quantity",
  ];

  // Remove existing occurrences of above types
  _.remove(models, (name) => hoistedModelNames.includes(name));

  // Add the above names to the front of the array
  const prependedNames: Array<string> = [...hoistedModelNames, ...models];
  return prependedNames;
}

async function generateSchemaHeaders(
  models: Array<string>,
  baseDirectory: FilePath
): Promise<void> {
  const prependedNames = prepareAllModelNamesForExport(models);
  const contents: string = exportSchemaHeaders({ names: prependedNames });
  const writer = new FileWriter(
    contents,
    baseDirectory.value,
    null,
    "fhir/allSchemaHeaders.js"
  );
  await writer.writeFile();
}

async function generateAllModelsExporter(
  models: Array<string>,
  baseDirectory: FilePath
): Promise<void> {
  const prependedNames = prepareAllModelNamesForExport(models);
  const contents: string = exportModelsTemplate({ names: prependedNames });
  const writer = new FileWriter(
    contents,
    baseDirectory.value,
    null,
    "AllDataElements.js"
  );
  await writer.writeFile();
}

/**
 * Generate all models
 */
async function generateModels(
  entityCollection: EntityCollection
): Promise<Array<void>> {
  const entityNames: string[] = [];
  const promises = entityCollection.entities.map(
    async (entity: EntityDefinition) => {
      entityNames.push(entity.dataType.normalizedName);
      return generate(entity, entityCollection.baseDir);
    }
  );

  await generateAllModelsExporter(entityNames, entityCollection.baseDir);
  await generateSchemaHeaders(entityNames, entityCollection.baseDir);

  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
