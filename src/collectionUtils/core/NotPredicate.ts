import Predicate from "./Predicate";

/**
 * Predicate implementation that returns the opposite of the decorated predicate.
 */
export default class NotPredicate<T> extends Predicate<T> {
  constructor(public predicate: Predicate<T>) {
    super();
  }

  public evaluate(input: T): boolean {
    return !this.predicate.evaluate(input);
  }
}
