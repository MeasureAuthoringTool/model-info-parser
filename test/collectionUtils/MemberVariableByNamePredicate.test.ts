import MemberVariableByNamePredicate from "../../src/collectionUtils/MemberVariableByNamePredicate";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import SystemBoolean from "../../src/model/dataTypes/system/SystemBoolean";

describe("MemberVariableByNamePredicate", () => {
  let predicate: MemberVariableByNamePredicate;
  let member1: MemberVariable;
  let member2: MemberVariable;

  beforeEach(() => {
    predicate = new MemberVariableByNamePredicate("member1");
    member1 = new MemberVariable(SystemBoolean, "member1");
    member2 = new MemberVariable(SystemBoolean, "member2");
  });

  describe("#evaluate()", () => {
    it("should return true if the specified member's name matches the pedicate's name", () => {
      expect(predicate.evaluate(member1)).toBeTrue();
    });

    it("should return false if the member's name does not match", () => {
      expect(predicate.evaluate(member2)).toBeFalse();
    });
  });
});
