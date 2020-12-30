import Transformer from "./Transformer";

/**
 * Transformer implementation that chains the specified transformers together.
 *
 * The input object is passed to the first transformer. The transformed result is passed to the second transformer and so on.
 */
export default class ChainedTransformer<T> extends Transformer<T, T> {
  public transformers: Array<Transformer<T, T>>;

  constructor(...transformers: Array<Transformer<T, T>>) {
    super();
    this.transformers = transformers;
  }

  public transform(input: T): T {
    if (this.transformers.length === 0) {
      throw new Error("Cannot chain 0 transformers together");
    }

    return this.transformers.reduce(
      (accumulator: T, currentTransformer: Transformer<T, T>) =>
        currentTransformer.transform(accumulator),
      input
    );
  }
}
