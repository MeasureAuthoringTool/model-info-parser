import Generator from "../Generator";
import template from "../../templates/typescript/FieldMetadataTemplate";
import FileWriter from "../../FileWriter";
import EntityCollection from "../../model/dataTypes/EntityCollection";

export default class TypeScriptMappingGenerator implements Generator {
  generate(entityCollection: EntityCollection): Array<Promise<void>> {
    const fileContents = template();
    const fileWriter = new FileWriter(
      fileContents,
      entityCollection.baseDir.toString(),
      null,
      "FieldMetadata.ts"
    );
    return [fileWriter.writeFile()];
  }
}
