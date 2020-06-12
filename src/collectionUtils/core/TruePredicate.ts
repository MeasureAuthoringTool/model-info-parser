import Predicate from "./Predicate";

/**
 * Predicate implementation that always returns true.
 */
export default class TruePredicate extends Predicate<boolean> {
  public static readonly INSTANCE = new TruePredicate();

  // eslint-disable-next-line class-methods-use-this
  public evaluate(): boolean {
    return true;
  }
}
