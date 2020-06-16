import Transformer from "../../../src/collectionUtils/core/Transformer";

// Test Transformer implementation that lowercases a string input
export default class LowerTransformer extends Transformer<string, string> {
  // eslint-disable-next-line class-methods-use-this
  public transform(input: string): string {
    return input.toLowerCase();
  }
}
