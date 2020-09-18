import Predicate from "./core/Predicate";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

export default class HasParentPredicate extends Predicate<EntityDefinition> {
  public static INSTANCE = new HasParentPredicate();

  evaluate(input: EntityDefinition): boolean {
    return input.parentDataType !== null;
  }
}
