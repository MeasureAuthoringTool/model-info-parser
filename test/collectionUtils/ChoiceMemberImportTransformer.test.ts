import ChoiceMemberImportTransformer from "../../src/collectionUtils/ChoiceMemberImportTransformer";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import DataType from "../../src/model/dataTypes/DataType";

describe("ChoiceMemberImportTransformer", () => {
  let transformer: ChoiceMemberImportTransformer;
  let type1: DataType;
  let type2: DataType;
  let type3: DataType;
  let type4: DataType;
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let choiceMember: MemberVariable;

  beforeEach(() => {
    transformer = new ChoiceMemberImportTransformer();
    entityBuilder = new EntityDefinitionBuilder();

    type1 = DataType.getInstance("test", "type1", "/tmp");
    type2 = DataType.getInstance("test", "type2", "/tmp");
    type3 = DataType.getInstance("test", "type3", "/tmp");
    type4 = DataType.getInstance("test", "type4", "/tmp");

    choiceMember = new MemberVariable(
      type1,
      "choiceMember",
      false,
      undefined,
      false,
      [type2, type3]
    );

    entityBuilder.memberVariables = [choiceMember];
    entityBuilder.imports = new EntityImports([type1, type4]);

    entityDef = entityBuilder.buildEntityDefinition();
  });

  it("should add the choice types and remove the base type", () => {
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toStrictEqual([type2, type3, type4]);
  });
});
