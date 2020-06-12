import Predicate from "./Predicate";

/**
 * Predicate implementation that returns true if any of the predicates return true.
 * If the array of predicates is empty, then this predicate returns false.
 */
export default class AnyPredicate<T> extends Predicate<T> {
  public predicates: Array<Predicate<T>>;

  constructor(...predicates: Array<Predicate<T>>) {
    super();
    this.predicates = predicates;
  }

  public evaluate(input: T): boolean {
    if (this.predicates.length === 0) {
      return false;
    }

    let result = false;
    let index = 0;
    while (!result && index < this.predicates.length) {
      result = this.predicates[index].evaluate(input);
      index += 1;
    }

    return result;
  }
}
