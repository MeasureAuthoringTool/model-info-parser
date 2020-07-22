import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";

/**
 * This transformer return a deep copy of the input EntityDefinition with the specified imports added
 */
export default class AddImportTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public importType: DataType) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    return input.addImport(this.importType);
  }
}
