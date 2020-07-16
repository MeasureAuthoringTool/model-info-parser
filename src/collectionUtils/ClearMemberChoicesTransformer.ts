import Transformer from "./core/Transformer";
import MemberVariable from "../model/dataTypes/MemberVariable";

/**
 * This transformer clears the choiceTypes array on a MemberVariable
 */
export default class ClearMemberChoicesTransformer extends Transformer<
  MemberVariable,
  MemberVariable
> {
  public transform(input: MemberVariable): MemberVariable {
    return input.clearChoices();
  }
}
