import ChoiceElement, {
  ChoiceType,
} from "../../../src/model/modelinfo/ChoiceElement";

describe("ChoiceElement", () => {
  test("constructor", () => {
    const type1: ChoiceType = { namespace: "ns1", typeName: "type1" };
    const type2: ChoiceType = { namespace: "ns2", typeName: "type2" };
    const el = new ChoiceElement("name", [type1, type2]);
    expect(el.name).toBe("name");
    expect(el.choices.length).toBe(2);
    expect(el.choices[0]).toBeDefined();
    expect(el.choices[0].namespace).toBe("ns1");
    expect(el.choices[0].typeName).toBe("type1");
    expect(el.choices[1]).toBeDefined();
    expect(el.choices[1].namespace).toBe("ns2");
    expect(el.choices[1].typeName).toBe("type2");
  });
});
