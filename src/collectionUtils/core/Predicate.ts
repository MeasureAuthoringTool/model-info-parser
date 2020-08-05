/**
 * A Predicate is the object equivalent of an if statement. It uses the input object to return a true or false value, and is often used in validation or filtering.
 */
export default abstract class Predicate<T> {
  public abstract evaluate(input: T): boolean;
}
