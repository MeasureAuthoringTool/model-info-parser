import ClearMemberChoicesTransformer from "../../src/collectionUtils/ClearMemberChoicesTransformer";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import SystemBoolean from "../../src/model/dataTypes/system/SystemBoolean";
import SystemDate from "../../src/model/dataTypes/system/SystemDate";

describe("ClearMemberChoicesTransformer", () => {
  const transformer = new ClearMemberChoicesTransformer();
  let member: MemberVariable;

  beforeEach(() => {
    member = new MemberVariable(
      SystemBoolean,
      "memberName",
      false,
      undefined,
      false,
      [SystemDate, SystemBoolean]
    );
  });

  describe("#transform()", () => {
    it("should clear the choiceTypes field", () => {
      const result = transformer.transform(member);
      expect(result).not.toBe(member);
      expect(result.choiceTypes).toBeArrayOfSize(0);
      expect(result.dataType).toBe(result.dataType);
      expect(result.variableName).toBe(result.variableName);
      expect(result.isArray).toBe(result.isArray);
      expect(result.relationshipType).toBe(result.relationshipType);
      expect(result.bidirectional).toBe(result.bidirectional);
    });
  });
});
