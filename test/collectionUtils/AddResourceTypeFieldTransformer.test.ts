import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import DataType from "../../src/model/dataTypes/DataType";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import AddResourceTypeFieldTransformer from "../../src/collectionUtils/AddResourceTypeFieldTransformer";
import SystemString from "../../src/model/dataTypes/system/SystemString";

describe("AddResourceTypeFieldTransformer", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let otherEntity: EntityDefinition;
  let resourceEntity: EntityDefinition;
  let resourceType: DataType;
  let member1: MemberVariable;
  let member2: MemberVariable;

  beforeEach(() => {
    resourceType = DataType.getInstance("FHIR", "Resource", "/tmp");

    entityBuilder = new EntityDefinitionBuilder();
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = resourceType;
    resourceEntity = entityBuilder.buildEntityDefinition();
    [member1, member2] = resourceEntity.memberVariables;
  });

  it("should add a new MemberVariable to the Resource entity", () => {
    const transformer = new AddResourceTypeFieldTransformer();
    const result = transformer.transform(resourceEntity);
    expect(result).not.toBe(resourceEntity);
    expect(result.memberVariables).toBeArrayOfSize(3);
    expect(result.memberVariables[0].variableName).toBe(member1.variableName);
    expect(result.memberVariables[1].variableName).toBe(member2.variableName);
    expect(result.memberVariables[2].variableName).toBe("resourceType");
    expect(result.memberVariables[2].dataType).toBe(SystemString);
    expect(result.memberVariables[2].isArray).toBeFalse();
  });

  it("should leave non-Resource entities alone", () => {
    const transformer = new AddResourceTypeFieldTransformer();
    const result = transformer.transform(otherEntity);
    expect(result).toBe(otherEntity);
    expect(result.memberVariables).toBeArrayOfSize(2);
    expect(result.memberVariables[0].variableName).toBe(member1.variableName);
    expect(result.memberVariables[1].variableName).toBe(member2.variableName);
  });
});
