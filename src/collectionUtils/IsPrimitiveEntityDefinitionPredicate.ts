import Predicate from "./core/Predicate";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

export default class IsPrimitiveEntityDefinitionPredicate extends Predicate<
  EntityDefinition
> {
  evaluate(input: EntityDefinition): boolean {
    return input.dataType.primitive;
  }
}
