import TypeScriptPreprocessor from "../../src/preprocessors/TypeScriptPreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import DataType from "../../src/model/dataTypes/DataType";

describe("TypeScriptPreprocessor", () => {
  const entityBuilder = new EntityDefinitionBuilder();

  let preprocessor: TypeScriptPreprocessor;
  let path: FilePath;
  let dataType1: DataType;
  let dataType2: DataType;
  let dataType3: DataType;
  let choiceMember;
  let entityDefinition: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    preprocessor = new TypeScriptPreprocessor();
    path = FilePath.getInstance("/tmp");

    dataType1 = DataType.getInstance("tmp", "TempType1", path);
    dataType2 = DataType.getInstance("tmp", "TempType2", path);
    dataType3 = DataType.getInstance("tmp", "TempType3", path);

    const choices = [dataType2, dataType3];

    choiceMember = new MemberVariable(
      dataType1,
      "variable",
      false,
      undefined,
      false,
      choices
    );

    entityBuilder.memberVariables = [choiceMember];
    entityDefinition = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection([entityDefinition], path);
  });

  it("should convert choice type imports to their referenced types", () => {
    const result = preprocessor.preprocess(entityCollection);
    expect(result).not.toBe(entityCollection);
    expect(result.entities).toBeArrayOfSize(2); // One of them is the custom FHIR.Type
    expect(result.entities[0].memberVariables).toBeArrayOfSize(1);
    expect(result.entities[0].imports.dataTypes).toIncludeAllMembers([
      dataType2,
      dataType3,
    ]);
  });
});
