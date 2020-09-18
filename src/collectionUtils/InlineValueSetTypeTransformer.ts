import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";
import DataType from "../model/dataTypes/DataType";
import EntityImports from "../model/dataTypes/EntityImports";

/**
 * This transformer addresses a bug in the modelinfo.xml file.
 * ValueSet types, which should have extended FHIR.code, do not.
 * This transformer modifies them appropriately.
 */
export default class InlineValueSetTypeTransformer
  implements Transformer<EntityDefinition, EntityDefinition> {
  constructor(public baseDir: FilePath) {}

  transform(input: EntityDefinition): EntityDefinition {
    const { dataType } = input;

    const fhirCode = DataType.getInstance("FHIR", "code", this.baseDir);

    // Change imports to only import FHIR.code
    const newImports = new EntityImports([fhirCode]);

    // Convert data type to primitive
    DataType.convertTypeToPrimitive(dataType);

    return input.clone({
      parentDataType: fhirCode,
      memberVariables: [],
      imports: newImports,
    });
  }
}
