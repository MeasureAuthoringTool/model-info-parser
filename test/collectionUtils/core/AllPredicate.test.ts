import AllPredicate from "../../../src/collectionUtils/core/AllPredicate";
import FalsePredicate from "../../../src/collectionUtils/core/FalsePredicate";
import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";

describe("AllPredicate", () => {
  it("should return true when no predicates are specified", () => {
    const predicate = new AllPredicate<string>();
    expect(predicate.evaluate("value")).toBeTrue();
  });

  it("should handle single truthy predicate", () => {
    const predicate = new AllPredicate<string>(TruePredicate.INSTANCE);
    expect(predicate.evaluate("value")).toBeTrue();
  });

  it("should handle single falsy predicate", () => {
    const predicate = new AllPredicate<string>(FalsePredicate.INSTANCE);
    expect(predicate.evaluate("value")).toBeFalse();
  });

  it("should handle multiple truthy predicates", () => {
    const predicate = new AllPredicate<string>(
      TruePredicate.INSTANCE,
      TruePredicate.INSTANCE,
      TruePredicate.INSTANCE
    );
    expect(predicate.evaluate("value")).toBeTrue();
  });

  it("should fail if a single false predicate is found", () => {
    const predicate = new AllPredicate<string>(
      TruePredicate.INSTANCE,
      TruePredicate.INSTANCE,
      FalsePredicate.INSTANCE
    );
    expect(predicate.evaluate("value")).toBeFalse();
  });
});
