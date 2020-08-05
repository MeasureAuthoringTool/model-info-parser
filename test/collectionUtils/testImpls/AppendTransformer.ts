import Transformer from "../../../src/collectionUtils/core/Transformer";

export default class AppendTransformer extends Transformer<string, string> {
  constructor(public extension: string) {
    super();
  }

  public transform(input: string): string {
    return `${input}${this.extension}`;
  }
}
