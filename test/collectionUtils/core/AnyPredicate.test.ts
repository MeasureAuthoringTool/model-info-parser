import AnyPredicate from "../../../src/collectionUtils/core/AnyPredicate";
import FalsePredicate from "../../../src/collectionUtils/core/FalsePredicate";
import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";

describe("AnyPredicate", () => {
  it("should return false when no predicates are specified", () => {
    const predicate = new AnyPredicate<string>();
    expect(predicate.evaluate("value")).toBeFalse();
  });

  it("should handle single truthy predicate", () => {
    const predicate = new AnyPredicate<string>(TruePredicate.INSTANCE);
    expect(predicate.evaluate("value")).toBeTrue();
  });

  it("should handle single falsy predicate", () => {
    const predicate = new AnyPredicate<string>(FalsePredicate.INSTANCE);
    expect(predicate.evaluate("value")).toBeFalse();
  });

  it("should handle multiple falsy predicates", () => {
    const predicate = new AnyPredicate<string>(
      FalsePredicate.INSTANCE,
      FalsePredicate.INSTANCE,
      FalsePredicate.INSTANCE
    );
    expect(predicate.evaluate("value")).toBeFalse();
  });

  it("should pass if a single truthy predicate is found", () => {
    const predicate = new AnyPredicate<string>(
      FalsePredicate.INSTANCE,
      FalsePredicate.INSTANCE,
      TruePredicate.INSTANCE
    );
    expect(predicate.evaluate("value")).toBeTrue();
  });
});
