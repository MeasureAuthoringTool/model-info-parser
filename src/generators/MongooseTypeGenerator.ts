import {promises as fsPromises} from "fs";
import FileWriter from "../FileWriter";
import {mongoosePrimitiveTypes} from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {TemplateContext,} from "../templates/mongoose/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import exportModelsTemplate from "../templates/mongoose/allMongooseExportTemplate"
import DataType from "../model/dataTypes/DataType";


// Resource files to copy
const resources: Array<[string, string]> = [
  ["./resources/mongoose/index.notjs", "/index.js"],
  ["./resources/mongoose/browser.notjs", "/browser.js"],
  ["./resources/mongoose/fhir/basetypes/Code.notjs", "/fhir/basetypes/Code.js"],
  ["./resources/mongoose/fhir/basetypes/DateTime.notjs", "/fhir/basetypes/DateTime.js"],
  ["./resources/mongoose/fhir/basetypes/FHIRDate.notjs", "/fhir/basetypes/FHIRDate.js"],
  ["./resources/mongoose/fhir/basetypes/Quantity.notjs", "/fhir/basetypes/Quantity.js"],
];

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  if (mongoosePrimitiveTypes[entityDefinition.dataType.typeName.toLowerCase()]) {
    return "";
  }

  const templateInput: TemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    memberVariables: entityDefinition.memberVariables,
  };

  const contents: string = classTemplate(templateInput);
  const {namespace, normalizedName} = entityDefinition.dataType;
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

async function generateAllDataElements(dataTypes: Array<DataType>, baseDirectory: FilePath): Promise<void> {
  const contents: string = exportModelsTemplate({ dataTypes });
  const writer = new FileWriter(contents, baseDirectory.value, null, "AllDataElements.js");
  await writer.writeFile();
}

async function copyResource(src: string, dest: string, baseDir: FilePath): Promise<void> {
  await fsPromises.copyFile(src, `${baseDir.value}${dest}`);
}

async function copyRequiredFiles(baseDir: FilePath): Promise<void> {
  await fsPromises.mkdir(`${baseDir.value}/fhir/basetypes`, {recursive: true});
  resources.map(
    async (res: [string, string]) => {
      await copyResource(res[0], res[1], baseDir);
    }
  );
}

/**
 * Generate all models
 */
async function generateModels(entityCollection: EntityCollection): Promise<Array<string>> {
  const promises = entityCollection.entities.map(
    async (entity: EntityDefinition) => {
      return generate(entity, entityCollection.baseDir);
    }
  );

  await generateAllDataElements(entityCollection.entities.map(e => e.dataType), entityCollection.baseDir);
  await copyRequiredFiles(entityCollection.baseDir);
  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
