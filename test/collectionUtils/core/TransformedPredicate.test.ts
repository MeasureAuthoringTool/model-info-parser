import TransformedPredicate from "../../../src/collectionUtils/core/TransformedPredicate";
import AppendTransformer from "../testImpls/AppendTransformer";
import ContainsExtensionPredicate from "../testImpls/ContainsExtensionPredicate";
import ExtractValueTransformer, {
  ValueHolder,
} from "../testImpls/ExtractValueTransformer";

describe("TransformedPredicate", () => {
  it("should transform an object before evaluating the predicate against it", () => {
    const transformer = new AppendTransformer("XXX");
    const predicate = new ContainsExtensionPredicate("XXX");

    const transformedPredicate = new TransformedPredicate<string, string>(
      transformer,
      predicate
    );
    expect(transformedPredicate.evaluate("Something")).toBeTrue();
  });

  it("should allow the input type to vary from the predicate comparison type", () => {
    const transformer = new ExtractValueTransformer();
    const predicate = new ContainsExtensionPredicate("!");

    const transformedPredicate = new TransformedPredicate<ValueHolder, string>(
      transformer,
      predicate
    );
    expect(transformedPredicate.evaluate({ value: "Awesome" })).toBeFalse();
    expect(transformedPredicate.evaluate({ value: "Awesome!" })).toBeTrue();
  });
});
