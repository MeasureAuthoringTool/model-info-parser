import "jest-extended";
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
import DataType from "../../../src/model/dataTypes/DataType";

describe("MemberVariable", () => {
  const systemBool = DataType.getInstance("System", "boolean", "/tmp");

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
  });

  // reusable assertion functions for above test data
  function expectSimpleElementResult(member: MemberVariable): void {
    expect(member.variableName).toBe("person");
    expect(member.isArray).toBeFalse();
    expect(member.dataType.namespace).toBe("ns");
    expect(member.dataType.typeName).toBe("PrimitivePerson");
    expect(member.dataType.path.value).toBe("/base/ns/PrimitivePerson");
  }

  function expectListElementResult(member: MemberVariable): void {
    expect(member.variableName).toBe("vehicle");
    expect(member.isArray).toBeTrue();
    expect(member.dataType.namespace).toBe("car");
    expect(member.dataType.typeName).toBe("Tesla");
    expect(member.dataType.path.value).toBe("/base/car/Tesla");
  }

  function expectChoiceElementResult(
    member1: MemberVariable,
    member2: MemberVariable
  ): void {
    expect(member1.variableName).toBe("positionChair");
    expect(member1.isArray).toBeFalse();
    expect(member1.dataType.namespace).toBe("office");
    expect(member1.dataType.typeName).toBe("Chair");
    expect(member1.dataType.path.value).toBe("/base/office/Chair");
    expect(member2.variableName).toBe("positionBed");
    expect(member2.isArray).toBeFalse();
    expect(member2.dataType.namespace).toBe("bedroom");
    expect(member2.dataType.typeName).toBe("Bed");
    expect(member2.dataType.path.value).toBe("/base/bedroom/Bed");
  }

  describe("constructor", () => {
    it("initializes dataType and variableName", () => {
      const result = new MemberVariable(systemBool, "testVar");
      expect(result.dataType).toEqual(systemBool);
      expect(result.variableName).toEqual("testVar");
    });

    it("defaults isArray value to false", () => {
      const result = new MemberVariable(systemBool, "testVar");
      expect(result.isArray).toBeFalse();
    });

    it("allows explicit isArray initialization", () => {
      const result = new MemberVariable(systemBool, "testVar", true);
      expect(result.isArray).toBeTrue();
    });

    it("defaults the relationshipType to embeds_one if isArray is false", () => {
      const result = new MemberVariable(systemBool, "testVar", false);
      expect(result.relationshipType).toBe(RelationshipType.EmbedsOne);
    });

    it("defaults the relationshipType to embeds_many if isArray is true", () => {
      const result = new MemberVariable(systemBool, "testVar", true);
      expect(result.relationshipType).toBe(RelationshipType.EmbedsMany);
    });

    it("allows the specification of a custom relationshipType", () => {
      const result = new MemberVariable(
        systemBool,
        "testVar",
        true,
        RelationshipType.BelongsTo
      );
      expect(result.relationshipType).toBe(RelationshipType.BelongsTo);
    });

    it("defaults the bidirectional property to true", () => {
      const result = new MemberVariable(systemBool, "testVar");
      expect(result.bidirectional).toBeTrue();
    });

    it("allows setting the bidirectional property to false", () => {
      const result = new MemberVariable(
        systemBool,
        "testVar",
        true,
        RelationshipType.HasOne,
        false
      );
      expect(result.bidirectional).toBeFalse();
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

    it("creates a single MemberVariable from a SimpleElement", () => {
      const result: Array<MemberVariable> = MemberVariable.createMemberVariable(
        simpleElement,
        "/base"
      );
      expect(result).toBeArrayOfSize(1);
      expectSimpleElementResult(result[0]);
    });

    it("creates a single MemberVariable from a ListElement", () => {
      const result: Array<MemberVariable> = MemberVariable.createMemberVariable(
        listElement,
        "/base"
      );
      expect(result).toBeArrayOfSize(1);
      expectListElementResult(result[0]);
    });

    it("creates an Array of MemberVariables for each choice in a ChoiceElement", () => {
      const result: Array<MemberVariable> = MemberVariable.createMemberVariable(
        choiceElement,
        "/base"
      );
      expect(result).toBeArrayOfSize(2);
      expectChoiceElementResult(result[0], result[1]);
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
      expect(result).toBeArrayOfSize(2);
      expectChoiceElementResult(result[0], result[1]);
    });

    it("handles varied element parameters of all types", () => {
      const result = MemberVariable.createMemberVariables(
        [simpleElement, listElement, choiceElement],
        "/base"
      );
      expect(result).toBeArrayOfSize(4);
      expectSimpleElementResult(result[0]);
      expectListElementResult(result[1]);
      expectChoiceElementResult(result[2], result[3]);
    });
  });

  describe("clone", () => {
    it("should make a deep copy of the MemberVariable", () => {
      const original = new MemberVariable(
        systemBool,
        "testVar",
        true,
        RelationshipType.HasMany,
        false
      );
      const result = original.clone();
      expect(original).not.toBe(result);
      expect(result.dataType).toEqual(systemBool);
      expect(result.variableName).toEqual("testVar");
      expect(result.isArray).toBeTrue();
      expect(result.relationshipType).toBe(RelationshipType.HasMany);
      expect(result.bidirectional).toBeFalse();
    });
  });
});
