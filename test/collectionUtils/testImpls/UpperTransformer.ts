import Transformer from "../../../src/collectionUtils/core/Transformer";

// Test Transformer implementation that uppercases a string input
export default class UpperTransformer extends Transformer<string, string> {
  public transform(input: string): string {
    return input.toUpperCase();
  }
}
