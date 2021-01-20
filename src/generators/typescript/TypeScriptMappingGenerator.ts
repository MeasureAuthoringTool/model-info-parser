import Generator from "../Generator";
import EntityCollection from "../../model/dataTypes/EntityCollection";
import template from "../../templates/typescript/allTypeMappingsTemplate";
import DataType from "../../model/dataTypes/DataType";
import FileWriter from "../../FileWriter";

export default class FieldMetadataGenerator implements Generator {
  generate(entityCollection: EntityCollection): Array<Promise<void>> {
    const allTypes: Array<DataType> = entityCollection.entities.map(
      (value) => value.dataType
    );

    const fileContents = template({
      allTypes,
    });
    const fileWriter = new FileWriter(
      fileContents,
      entityCollection.baseDir.toString(),
      null,
      "TypeMapping.ts"
    );
    return [fileWriter.writeFile()];
  }
}
