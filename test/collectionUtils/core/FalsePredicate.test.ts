import FalsePredicate from "../../../src/collectionUtils/core/FalsePredicate";

describe("FalsePredicate", () => {
  it("should always return false", () => {
    expect(FalsePredicate.INSTANCE.evaluate()).toBeFalse();
  });
});
