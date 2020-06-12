import NotPredicate from "../../../src/collectionUtils/core/NotPredicate";
import FalsePredicate from "../../../src/collectionUtils/core/FalsePredicate";
import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";

describe("NotPredicate", () => {
  it("should return opposite of truty predicate", () => {
    const predicate = new NotPredicate<string>(TruePredicate.INSTANCE);
    expect(predicate.evaluate("value")).toBeFalse();
  });

  it("should return opposite of falsy predicate", () => {
    const predicate = new NotPredicate<number>(FalsePredicate.INSTANCE);
    expect(predicate.evaluate(8)).toBeTrue();
  });
});
