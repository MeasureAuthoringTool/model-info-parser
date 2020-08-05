import AnyResourceTypeTransformer from "../../src/collectionUtils/AnyResourceTypeTransformer";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import DataType from "../../src/model/dataTypes/DataType";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("AnyResourceTypeTransformer", () => {
  const baseDir = FilePath.getInstance("/tmp");
  const transformer = new AnyResourceTypeTransformer(baseDir);
  let regularEntity: EntityDefinition;
  let resourceMemberEntity: EntityDefinition;
  let resourceChoiceEntity: EntityDefinition;
  let builder: EntityDefinitionBuilder;
  let iResourceType: DataType;

  beforeEach(() => {
    builder = new EntityDefinitionBuilder();
    regularEntity = builder.buildEntityDefinition();

    iResourceType = DataType.getInstance("FHIR", "IResource", baseDir);
    const otherType = DataType.getInstance("FHIR", "SomethingElse", baseDir);

    const resourceMember = new MemberVariable(
      iResourceType,
      "resourceMember",
      false,
      undefined,
      false,
      [otherType]
    );
    builder.imports = new EntityImports([iResourceType]);
    builder.memberVariables = [resourceMember];
    resourceMemberEntity = builder.buildEntityDefinition();

    const choiceMember = new MemberVariable(
      otherType,
      "choiceMember",
      false,
      undefined,
      false,
      [iResourceType, otherType]
    );
    builder.memberVariables = [choiceMember];
    resourceChoiceEntity = builder.buildEntityDefinition();
  });

  it("should return the same instance if no members have IResource members", () => {
    const result = transformer.transform(regularEntity);
    expect(result).toBe(regularEntity);
  });

  it("should replace IResource member types with AnyResource members", () => {
    const result = transformer.transform(resourceMemberEntity);
    expect(result).not.toBe(resourceMemberEntity);
    expect(result.memberVariables).toBeArrayOfSize(1);
    expect(result.memberVariables[0].variableName).toBe("resourceMember");
    expect(result.memberVariables[0].dataType.normalizedName).toBe(
      "AnyResource"
    );
    expect(result.memberVariables[0].choiceTypes).toBeArrayOfSize(1);
    expect(result.memberVariables[0].choiceTypes[0].normalizedName).toBe(
      "SomethingElse"
    );
  });

  it("should replace IResource types in choice members", () => {
    const result = transformer.transform(resourceChoiceEntity);
    expect(result).not.toBe(resourceChoiceEntity);
    expect(result.memberVariables).toBeArrayOfSize(1);
    expect(result.memberVariables[0].variableName).toBe("choiceMember");
    expect(result.memberVariables[0].dataType.normalizedName).toBe(
      "SomethingElse"
    );
    expect(result.memberVariables[0].choiceTypes).toBeArrayOfSize(2);
    expect(result.memberVariables[0].choiceTypes[0].normalizedName).toBe(
      "AnyResource"
    );
    expect(result.memberVariables[0].choiceTypes[1].normalizedName).toBe(
      "SomethingElse"
    );
  });

  it("should replace IResource imports", () => {
    const result = transformer.transform(resourceMemberEntity);
    expect(result).not.toBe(resourceMemberEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].namespace).toBe("FHIR");
    expect(result.imports.dataTypes[0].normalizedName).toBe("AnyResource");
    expect(result.imports.dataTypes[0].path.toString()).toBe(
      "/tmp/FHIR/AnyResource"
    );
  });

  it("should keep the IResource import if the interface extends IResource", () => {
    builder.parentType = iResourceType;
    const newEntity = builder.buildEntityDefinition();
    const result = transformer.transform(newEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(2);
    expect(result.imports.dataTypes[0].normalizedName).toBe("AnyResource");
    expect(result.imports.dataTypes[1].normalizedName).toBe("IResource");
  });
});
