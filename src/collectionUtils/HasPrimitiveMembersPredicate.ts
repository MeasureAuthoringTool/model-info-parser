import _ from "lodash";
import Predicate from "./core/Predicate";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import MemberVariable from "../model/dataTypes/MemberVariable";

/**
 * This predicate checks an EntityDefinition's MemberVariables to see if
 * any are primitive
 */
export default class HasPrimitiveMembersPredicate extends Predicate<
  EntityDefinition
> {
  evaluate(input: EntityDefinition): boolean {
    return !!_.find(
      input.memberVariables,
      (member: MemberVariable) => member.dataType.primitive
    );
  }
}
