import Predicate from "./Predicate";

/**
 * Predicate implementation that returns true if all the predicates return true.
 * If the array of predicates is empty, then this predicate returns true.
 */
export default class AllPredicate<T> extends Predicate<T> {
  public predicates: Array<Predicate<T>>;

  constructor(...predicates: Array<Predicate<T>>) {
    super();
    this.predicates = predicates;
  }

  public evaluate(input: T): boolean {
    if (this.predicates.length === 0) {
      return true;
    }

    let result = true;
    let index = 0;
    while (result && index < this.predicates.length) {
      result = this.predicates[index].evaluate(input);
      index += 1;
    }

    return result;
  }
}
