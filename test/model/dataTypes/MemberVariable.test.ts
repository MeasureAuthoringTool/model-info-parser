import Element from "../../../src/model/modelInfo/Element";
import ChoiceElement, {
  ChoiceType,
} from "../../../src/model/modelInfo/ChoiceElement";
import ListElement from "../../../src/model/modelInfo/ListElement";
import SimpleElement from "../../../src/model/modelInfo/SimpleElement";
import MemberVariable, {
  RelationshipType,
} from "../../../src/model/dataTypes/MemberVariable";
import FilePath from "../../../src/model/dataTypes/FilePath";
import SystemBoolean from "../../../src/model/dataTypes/system/SystemBoolean";
import SystemString from "../../../src/model/dataTypes/system/SystemString";

describe("MemberVariable", () => {
  // Set up some test data
  class BadElement extends Element {
    constructor() {
      super("bad");
    }
  }

  let badElement: BadElement;
  let simpleElement: SimpleElement;
  let listElement: ListElement;
  let choiceElement: ChoiceElement;
  let fullMember: MemberVariable;

  beforeEach(() => {
    badElement = new BadElement();
    simpleElement = new SimpleElement("person", "ns", "PrimitivePerson");
    listElement = new ListElement("vehicle", "car", "Tesla");
    const choice1: ChoiceType = {
      typeName: "Chair",
      namespace: "office",
    };
    const choice2: ChoiceType = {
      typeName: "Bed",
      namespace: "bedroom",
    };

    choiceElement = new ChoiceElement("position", [choice1, choice2]);

    fullMember = new MemberVariable(
      SystemBoolean,
      "testVar",
      true,
      RelationshipType.HasMany,
      false,
      [SystemBoolean, SystemString]
    );
  });

  // reusable assertion functions for above test data
  function expectSimpleElementResult(member: MemberVariable): void {
    expect(member.variableName).toBe("person");
    expect(member.isArray).toBeFalse();
    expect(member.dataType.namespace).toBe("ns");
    expect(member.dataType.typeName).toBe("PrimitivePerson");
    expect(member.dataType.path.value).toBe("/base/ns/PrimitivePerson");
    expect(member.choiceTypes).toBeArrayOfSize(0);
  }

  function expectListElementResult(member: MemberVariable): void {
    expect(member.variableName).toBe("vehicle");
    expect(member.isArray).toBeTrue();
    expect(member.dataType.namespace).toBe("car");
    expect(member.dataType.typeName).toBe("Tesla");
    expect(member.dataType.path.value).toBe("/base/car/Tesla");
    expect(member.choiceTypes).toBeArrayOfSize(0);
  }

  function expectChoiceElementResult(member: MemberVariable): void {
    expect(member.variableName).toBe("position");
    expect(member.isArray).toBeFalse();
    expect(member.dataType.namespace).toBe("FHIR");
    expect(member.dataType.typeName).toBe("Type");
    expect(member.dataType.path.value).toBe("/base/FHIR/Type");
    expect(member.choiceTypes).toBeArrayOfSize(2);

    expect(member.choiceTypes[0].namespace).toBe("office");
    expect(member.choiceTypes[0].typeName).toBe("Chair");
    expect(member.choiceTypes[0].path.value).toBe("/base/office/Chair");

    expect(member.choiceTypes[1].namespace).toBe("bedroom");
    expect(member.choiceTypes[1].typeName).toBe("Bed");
    expect(member.choiceTypes[1].path.value).toBe("/base/bedroom/Bed");
  }

  describe("constructor", () => {
    it("initializes dataType and variableName", () => {
      const result = new MemberVariable(SystemBoolean, "testVar");
      expect(result.dataType).toEqual(SystemBoolean);
      expect(result.variableName).toEqual("testVar");
    });

    it("defaults isArray value to false", () => {
      const result = new MemberVariable(SystemBoolean, "testVar");
      expect(result.isArray).toBeFalse();
    });

    it("allows explicit isArray initialization", () => {
      const result = new MemberVariable(SystemBoolean, "testVar", true);
      expect(result.isArray).toBeTrue();
    });

    it("defaults the relationshipType to embeds_one if isArray is false", () => {
      const result = new MemberVariable(SystemBoolean, "testVar", false);
      expect(result.relationshipType).toBe(RelationshipType.EmbedsOne);
    });

    it("defaults the relationshipType to embeds_many if isArray is true", () => {
      const result = new MemberVariable(SystemBoolean, "testVar", true);
      expect(result.relationshipType).toBe(RelationshipType.EmbedsMany);
    });

    it("allows the specification of a custom relationshipType", () => {
      const result = new MemberVariable(
        SystemBoolean,
        "testVar",
        true,
        RelationshipType.BelongsTo
      );
      expect(result.relationshipType).toBe(RelationshipType.BelongsTo);
    });

    it("defaults the bidirectional property to true", () => {
      const result = new MemberVariable(SystemBoolean, "testVar");
      expect(result.bidirectional).toBeTrue();
    });

    it("allows setting the bidirectional property to false", () => {
      const result = new MemberVariable(
        SystemBoolean,
        "testVar",
        true,
        RelationshipType.HasOne,
        false
      );
      expect(result.bidirectional).toBeFalse();
    });

    it("should default the choiceTypes array to an empty array", () => {
      const result = new MemberVariable(
        SystemBoolean,
        "testVar",
        true,
        RelationshipType.HasOne,
        false
      );
      expect(result.choiceTypes).toBeEmpty();
    });

    it("should choiceTypes to be explicitly specified", () => {
      const result = new MemberVariable(
        SystemBoolean,
        "testVar",
        true,
        RelationshipType.HasOne,
        false,
        [SystemBoolean, SystemString]
      );
      expect(result.choiceTypes).toBeArrayOfSize(2);
      expect(result.choiceTypes[0]).toBe(SystemBoolean);
      expect(result.choiceTypes[1]).toBe(SystemString);
    });
  });

  describe("createMemberVariable()", () => {
    it("throws an Error if base directory is not absolute", () => {
      expect(() => {
        MemberVariable.createMemberVariable(
          simpleElement,
          FilePath.getInstance("some/dir")
        );
      }).toThrow(
        'Cannot create MemberVariable with relative base directory "some/dir"'
      );
    });

    it("throws an Error with unrecognized Element types", () => {
      expect(() => {
        MemberVariable.createMemberVariable(badElement, "/base");
      }).toThrow("Unrecognized Element type");
    });

    it("creates a MemberVariable from a SimpleElement", () => {
      const result: MemberVariable = MemberVariable.createMemberVariable(
        simpleElement,
        "/base"
      );
      expect(result).toBeInstanceOf(MemberVariable);
      expectSimpleElementResult(result);
    });

    it("creates a single MemberVariable from a ListElement", () => {
      const result: MemberVariable = MemberVariable.createMemberVariable(
        listElement,
        "/base"
      );
      expect(result).toBeInstanceOf(MemberVariable);
      expectListElementResult(result);
    });

    it("creates an Array of MemberVariables for each choice in a ChoiceElement", () => {
      const result: MemberVariable = MemberVariable.createMemberVariable(
        choiceElement,
        "/base"
      );
      expect(result).toBeInstanceOf(MemberVariable);
      expectChoiceElementResult(result);
    });
  });

  describe("createMemberVariables()", () => {
    it("handles empty array parameters", () => {
      const result = MemberVariable.createMemberVariables([], "/base");
      expect(result).toBeArrayOfSize(0);
    });

    it("handles single, SimpleElement array parameters", () => {
      const result = MemberVariable.createMemberVariables(
        [simpleElement],
        "/base"
      );
      expect(result).toBeArrayOfSize(1);
      expectSimpleElementResult(result[0]);
    });

    it("handles single, ChoiceElement array parameters", () => {
      const result = MemberVariable.createMemberVariables(
        [choiceElement],
        "/base"
      );
      expect(result).toBeArrayOfSize(1);
      expectChoiceElementResult(result[0]);
    });

    it("handles varied element parameters of all types", () => {
      const result = MemberVariable.createMemberVariables(
        [simpleElement, listElement, choiceElement],
        "/base"
      );
      expect(result).toBeArrayOfSize(3);
      expectSimpleElementResult(result[0]);
      expectListElementResult(result[1]);
      expectChoiceElementResult(result[2]);
    });
  });

  describe("clone", () => {
    it("should make a deep copy of the MemberVariable", () => {
      const result = fullMember.clone();
      expect(fullMember).not.toBe(result);
      expect(result.dataType).toEqual(SystemBoolean);
      expect(result.variableName).toEqual("testVar");
      expect(result.isArray).toBeTrue();
      expect(result.relationshipType).toBe(RelationshipType.HasMany);
      expect(result.bidirectional).toBeFalse();
      expect(result.choiceTypes).toStrictEqual([SystemBoolean, SystemString]);
    });
  });

  describe("#clearChoices()", () => {
    it("should return a new memberVariable with its choiceTypes cleared", () => {
      const result = fullMember.clearChoices();
      expect(fullMember).not.toBe(result);
      expect(result.choiceTypes).toStrictEqual([]);
    });
  });
});
