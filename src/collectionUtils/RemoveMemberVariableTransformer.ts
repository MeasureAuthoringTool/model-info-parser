import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import MemberVariableByNamePredicate from "./MemberVariableByNamePredicate";

/**
 * This transformer return a deep copy of the input EntityDefinition with the specified
 * member variable removed
 */
export default class RemoveMemberVariableTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  public predicate: MemberVariableByNamePredicate;

  constructor(public memberName: string) {
    super();
    this.predicate = new MemberVariableByNamePredicate(memberName);
  }

  public transform(input: EntityDefinition): EntityDefinition {
    return input.removeMemberVariables(this.predicate);
  }
}
