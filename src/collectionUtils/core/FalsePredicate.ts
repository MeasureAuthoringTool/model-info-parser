import Predicate from "./Predicate";

/**
 * Predicate implementation that always returns false.
 */
export default class FalsePredicate extends Predicate<boolean> {
  public static readonly INSTANCE = new FalsePredicate();

  public evaluate(): boolean {
    return false;
  }
}
