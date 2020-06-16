import ListElement from "../../../src/model/modelinfo/ListElement";

describe("ListElement", () => {
  test("constructor", () => {
    const el = new ListElement("name", "namespace", "typeName");
    expect(el.name).toBe("name");
    expect(el.namespace).toBe("namespace");
    expect(el.typeName).toBe("typeName");
  });
});
