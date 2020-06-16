import Predicate from "../../../src/collectionUtils/core/Predicate";

export default class ContainsExtensionPredicate extends Predicate<string> {
  constructor(public extension: string){
    super();
  }

  evaluate(input: string): boolean {
    return input.endsWith(this.extension);
  }
}
