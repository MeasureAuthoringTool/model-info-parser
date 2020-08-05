import ChainedTransformer from "../../../src/collectionUtils/core/ChainedTransformer";
import AppendTransformer from "../testImpls/AppendTransformer";
import UpperTransformer from "../testImpls/UpperTransformer";

describe("ChainedTransformer", () => {
  const upperTransform = new UpperTransformer();
  const appendTransform = new AppendTransformer("Ext");

  it("should throw an error if transformer array is empty", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      const transformer = new ChainedTransformer<string>();
      transformer.transform("");
    }).toThrow("Cannot chain 0 transformers together");
  });

  it("should chain transformers together", () => {
    const transformer1 = new ChainedTransformer(
      upperTransform,
      appendTransform
    );
    const transformer2 = new ChainedTransformer(
      appendTransform,
      upperTransform
    );
    expect(transformer1.transform("SomeInput")).toBe("SOMEINPUTExt");
    expect(transformer2.transform("SomeInput")).toBe("SOMEINPUTEXT");
  });
});
