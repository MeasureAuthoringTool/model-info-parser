import Predicate from "./core/Predicate";
import Transformer from "./core/Transformer";

export default class CollectionUtils {
  public static select<T>(input: Array<T>, predicate: Predicate<T>): Array<T> {
    return input.filter((val: T) => predicate.evaluate(val));
  }

  public static selectRejected<T>(
    input: Array<T>,
    predicate: Predicate<T>
  ): Array<T> {
    return input.filter((val: T) => !predicate.evaluate(val));
  }

  public static transform<T, K>(input: Array<T>, transformer: Transformer<T, K>): Array<K> {
    return input.map((value: T) => transformer.transform(value));
  }
}
