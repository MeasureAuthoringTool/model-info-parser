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
  public importTypes: Array<DataType>;

  constructor(...importTypes: Array<DataType>) {
    super();
    this.importTypes = importTypes
  }

  public transform(input: EntityDefinition): EntityDefinition {
    let newImport = input;
    this.importTypes.forEach((importType) => {
        newImport = newImport.addImport(importType);
    });
    return newImport;
  }
}
