import NOPTransformer from "../../../src/collectionUtils/core/NOPTransformer";

describe("NOPTransformer", () => {
  it("should always return same object passed in", () => {
    expect(new NOPTransformer().transform(5)).toBe(5);
    expect(new NOPTransformer().transform("5")).toBe("5");
    const objParam = { foo: "bar" };
    expect(new NOPTransformer().transform(objParam)).toBe(objParam);
  });
});
