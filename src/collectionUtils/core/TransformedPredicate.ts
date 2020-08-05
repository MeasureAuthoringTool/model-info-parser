import Predicate from "./Predicate";
import Transformer from "./Transformer";

/**
 * Predicate implementation that transforms the given object before invoking another Predicate.
 */
export default class TransformedPredicate<T, K> extends Predicate<T> {
  constructor(
    public transformer: Transformer<T, K>,
    public predicate: Predicate<K>
  ) {
    super();
  }

  evaluate(input: T): boolean {
    const transformed: K = this.transformer.transform(input);
    return this.predicate.evaluate(transformed);
  }
}
