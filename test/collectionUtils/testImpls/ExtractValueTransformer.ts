import Transformer from "../../../src/collectionUtils/core/Transformer";

export interface ValueHolder {
  value: string;
}

export default class ExtractValueTransformer extends Transformer<
  ValueHolder,
  string
> {
  public static INSTANCE = new ExtractValueTransformer();

  // eslint-disable-next-line class-methods-use-this
  transform(input: ValueHolder): string {
    return input.value;
  }
}
