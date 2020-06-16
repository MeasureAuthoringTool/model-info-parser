import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import AddMemberVariableTransformer from "../../src/collectionUtils/AddMemberVariableTransformer";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";

describe("AddMemberVariableTransformer", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let member1: MemberVariable;
  let member2: MemberVariable;
  let extraMember: MemberVariable;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entityDef = entityBuilder.buildEntityDefinition();
    [member1, member2] = entityDef.memberVariables;
    extraMember = new MemberVariable(member2.dataType, "extraMember");
  });

  it("should remove the specified imports and return a new EntityDefinition", () => {
    const transformer = new AddMemberVariableTransformer(extraMember);
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.memberVariables).toStrictEqual([
      member1,
      member2,
      extraMember,
    ]);
  });
});
