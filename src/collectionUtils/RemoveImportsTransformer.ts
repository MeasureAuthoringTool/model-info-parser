import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import Predicate from "./core/Predicate";

/**
 * This transformer return a deep copy of the input EntityDefinition with the specified imports removed
 */
export default class RemoveImportsTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public predicate: Predicate<DataType>) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    return input.removeImports(this.predicate);
  }
}
