import Predicate from "./core/Predicate";
import MemberVariable from "../model/dataTypes/MemberVariable";

/**
 * This predicate compares a MemberVariable's name with a specified value
 */
export default class MemberVariableByNamePredicate extends Predicate<
  MemberVariable
> {
  constructor(public variableName: string) {
    super();
  }

  evaluate(input: MemberVariable): boolean {
    return input.variableName === this.variableName;
  }
}
