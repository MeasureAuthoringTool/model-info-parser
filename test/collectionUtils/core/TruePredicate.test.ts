import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";

describe("TruePredicate", () => {
  it("should always return true", () => {
    expect(TruePredicate.INSTANCE.evaluate()).toBeTrue();
  });
});
