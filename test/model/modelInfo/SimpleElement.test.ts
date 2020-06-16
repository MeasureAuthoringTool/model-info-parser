import SimpleElement from "../../../src/model/modelinfo/SimpleElement";

describe("SimpleElement", () => {
  test("constructor", () => {
    const el = new SimpleElement("name", "namespace", "typeName");
    expect(el.name).toBe("name");
    expect(el.namespace).toBe("namespace");
    expect(el.typeName).toBe("typeName");
  });
});
