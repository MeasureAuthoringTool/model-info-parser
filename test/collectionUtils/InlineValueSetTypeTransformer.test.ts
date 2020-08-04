import InlineValueSetTypeTransformer from "../../src/collectionUtils/InlineValueSetTypeTransformer";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import DataType from "../../src/model/dataTypes/DataType";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("InlineValueSetTypeTransformer", () => {
  let transformer: InlineValueSetTypeTransformer;
  let valueSetEntity: EntityDefinition;
  let entityType: DataType;

  beforeEach(() => {
    transformer = new InlineValueSetTypeTransformer(
      FilePath.getInstance("/tmp")
    );
    const builder = new EntityDefinitionBuilder();

    const elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    entityType = DataType.getInstance("FHIR", "TestEntity", "/tmp");
    const iEntityType = DataType.getInstance("FHIR", "ITestEntity", "/tmp");
    const systemString = DataType.getInstance("System", "String", "/tmp");

    const valueMember = new MemberVariable(systemString, "value");

    builder.parentType = elementType;
    builder.imports = new EntityImports([elementType, iEntityType]);
    builder.dataType = entityType;
    builder.memberVariables = [valueMember];
    valueSetEntity = builder.buildEntityDefinition();
  });

  it("should return a new instance", () => {
    const result = transformer.transform(valueSetEntity);
    expect(result).not.toBe(valueSetEntity);
  });

  it("should only import FHIR.code", () => {
    const result = transformer.transform(valueSetEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].namespace).toBe("FHIR");
    expect(result.imports.dataTypes[0].normalizedName).toBe("PrimitiveCode");
  });

  it("should extend FHIR.code", () => {
    const result = transformer.transform(valueSetEntity);
    expect(result.parentDataType).toBeDefined();
    expect(result.parentDataType?.namespace).toBe("FHIR");
    expect(result.parentDataType?.normalizedName).toBe("PrimitiveCode");
  });

  it("should no member variables", () => {
    const result = transformer.transform(valueSetEntity);
    expect(result.memberVariables).toBeArrayOfSize(0);
  });

  it("should convert the entity's DataType to primitive", () => {
    transformer.transform(valueSetEntity);
    expect(entityType.primitive).toBeTrue();
  });
});
