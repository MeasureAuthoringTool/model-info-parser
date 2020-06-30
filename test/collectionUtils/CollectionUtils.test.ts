import ContainsExtensionPredicate from "./testImpls/ContainsExtensionPredicate";
import CollectionUtils from "../../src/collectionUtils/CollectionUtils";
import ExtractValueTransformer, {
  ValueHolder,
} from "./testImpls/ExtractValueTransformer";

describe("CollectionUtils", () => {
  describe("#select()", () => {
    it("should handle an empty input array", () => {
      const predicate = new ContainsExtensionPredicate("!");
      const result: Array<string> = CollectionUtils.select([], predicate);
      expect(result).toBeArrayOfSize(0);
    });

    it("should return elements that match a Predicate", () => {
      const predicate = new ContainsExtensionPredicate("!");
      const input = ["one", "two!", "three!", "four"];
      const result: Array<string> = CollectionUtils.select(input, predicate);
      expect(result).toStrictEqual(["two!", "three!"]);
    });
  });

  describe("#selectRejected()", () => {
    it("should handle an empty input array", () => {
      const predicate = new ContainsExtensionPredicate("!");
      const result: Array<string> = CollectionUtils.selectRejected(
        [],
        predicate
      );
      expect(result).toBeArrayOfSize(0);
    });

    it("should return elements that do not match a Predicate", () => {
      const predicate = new ContainsExtensionPredicate("!");
      const input = ["one", "two!", "three!", "four"];
      const result: Array<string> = CollectionUtils.selectRejected(
        input,
        predicate
      );
      expect(result).toStrictEqual(["one", "four"]);
    });
  });

  describe("#transform()", () => {
    const transformer = ExtractValueTransformer.INSTANCE;
    it("should handle an empty array", () => {
      const input: Array<ValueHolder> = [];
      const result = CollectionUtils.transform(input, transformer);
      expect(result).toBeArrayOfSize(0);
    });

    it("should return an array of transformed values", () => {
      const input: Array<ValueHolder> = [
        {
          value: "hi",
        },
        {
          value: "world",
        },
      ];
      const result = CollectionUtils.transform(input, transformer);
      expect(result).toStrictEqual(["hi", "world"]);
    });
  });
});
