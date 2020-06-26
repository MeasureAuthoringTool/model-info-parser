import _ from "lodash";
import FileWriter from "../FileWriter";
import {mongoosePrimitiveTypes} from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {TemplateContext} from "../templates/mongoose/classTemplate";
import Generator from "./Generator";
import FilePath from "../model/dataTypes/FilePath";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import exportModelsTemplate from "../templates/mongoose/allMongooseExportTemplate"
import DataType from "../model/dataTypes/DataType";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  if (mongoosePrimitiveTypes[_.lowerFirst(entityDefinition.dataType.typeName)]) {
    return "";
  }

  const templateInput: TemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    memberVariables: entityDefinition.memberVariables,
    imports: entityDefinition.imports.dataTypes,
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
  const contents: string = exportModelsTemplate({dataTypes});
  const writer = new FileWriter(contents, baseDirectory.value, null, "AllDataElements.js");
  await writer.writeFile();
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

  await generateAllDataElements(entityCollection.entities.map(e => e.dataType).filter(dt => !dt.systemType && !dt.primitive), entityCollection.baseDir);
  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
