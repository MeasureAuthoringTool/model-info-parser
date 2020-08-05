import Transformer from "./Transformer";

/**
 * Transformer implementation that does nothing.
 */
export default class NOPTransformer<T> extends Transformer<T, T> {
  public transform(input: T): T {
    return input;
  }
}
