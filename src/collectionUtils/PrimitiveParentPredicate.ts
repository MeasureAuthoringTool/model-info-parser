import Predicate from "./core/Predicate";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

export default class PrimitiveParentPredicate extends Predicate<
  EntityDefinition
> {
  evaluate(input: EntityDefinition): boolean {
    return input.parentDataType !== null && input.parentDataType.primitive;
  }
}
