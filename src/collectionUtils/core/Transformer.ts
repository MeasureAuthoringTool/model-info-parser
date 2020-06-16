/**
 * A Transformer converts the input object to the output object. The input object should be left unchanged.
 * Transformers are typically used for type conversions, or extracting data from an object.
 */
export default abstract class Transformer<T, K> {
  public abstract transform(input: T): K;
}
