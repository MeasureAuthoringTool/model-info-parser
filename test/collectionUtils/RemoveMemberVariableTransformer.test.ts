import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import RemoveMemberVariableTransformer from "../../src/collectionUtils/RemoveMemberVariableTransformer";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";

describe("RemoveMemberVariableTransformer", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let member1: MemberVariable;
  let member2: MemberVariable;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entityDef = entityBuilder.buildEntityDefinition();
    [member1, member2] = entityDef.memberVariables;
  });

  it("should remove the specified memberVariables and return a new EntityDefinition", () => {
    const transformer = new RemoveMemberVariableTransformer(
      member1.variableName
    );
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.memberVariables).toStrictEqual([member2]);
  });
});
