import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import MemberVariable from "../model/dataTypes/MemberVariable";

/**
 * This transformer return a deep copy of the input EntityDefinition with the specified
 * member variable added
 */
export default class AddMemberVariableTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public newMember: MemberVariable) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    return input.addMemberVariable(this.newMember);
  }
}
