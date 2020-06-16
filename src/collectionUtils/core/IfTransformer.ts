import Predicate from "./Predicate";
import Transformer from "./Transformer";

/**
 * Transformer implementation that will call one of two closures based on whether a predicate evaluates as true or false.
 */
export default class IfTransformer<T, K> extends Transformer<T, K> {
  constructor(
    public predicate: Predicate<T>,
    public trueTransformer: Transformer<T, K>,
    public falseTransformer: Transformer<T, K>
  ) {
    super();
  }

  public transform(input: T): K {
    if (this.predicate.evaluate(input)) {
      return this.trueTransformer.transform(input);
    }
    return this.falseTransformer.transform(input);
  }
}
