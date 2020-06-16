import IfTransformer from "../../../src/collectionUtils/core/IfTransformer";
import FalsePredicate from "../../../src/collectionUtils/core/FalsePredicate";
import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";
import LowerTransformer from "../testImpls/LowerTransformer";
import UpperTransformer from "../testImpls/UpperTransformer";

describe("IfTransformer", () => {
  it("should use the first transformer when predicate returns true", () => {
    const transformer = new IfTransformer(
      TruePredicate.INSTANCE,
      new UpperTransformer(),
      new LowerTransformer()
    );
    expect(transformer.transform("Sample String")).toBe("SAMPLE STRING");
  });

  it("should use the second transformer when predicate returns false", () => {
    const transformer = new IfTransformer(
      FalsePredicate.INSTANCE,
      new UpperTransformer(),
      new LowerTransformer()
    );
    expect(transformer.transform("Sample String")).toBe("sample string");
  });
});
