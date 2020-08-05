import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import MemberVariable from "../model/dataTypes/MemberVariable";

/**
 * This transformer makes it easier to modify an EntityDefinition's
 * memberVariables
 */
export default class ModifyMemberVariablesTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(
    public memberTransformer: Transformer<MemberVariable, MemberVariable>
  ) {
    super();
  }

  transform(input: EntityDefinition): EntityDefinition {
    return input.transformMemberVariables(this.memberTransformer);
  }
}
