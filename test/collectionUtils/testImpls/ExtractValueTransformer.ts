import Transformer from "../../../src/collectionUtils/core/Transformer";

export interface IValue {
  value: string;
}

export default class ExtractValueTransformer extends Transformer<
  IValue,
  string
> {
  public static INSTANCE = new ExtractValueTransformer();

  // eslint-disable-next-line class-methods-use-this
  transform(input: IValue): string {
    return input.value;
  }
}
