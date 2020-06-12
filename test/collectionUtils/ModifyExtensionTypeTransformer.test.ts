import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyExtensionTypeTransformer from "../../src/collectionUtils/ModifyExtensionTypeTransformer";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import SystemString from "../../src/model/dataTypes/system/SystemString";

describe("ModifyExtensionTypeTransformer", () => {
  const transformer = new ModifyExtensionTypeTransformer();
  let entityBuilder: EntityDefinitionBuilder;
  let otherEntity: EntityDefinition;
  let extensionEntity: EntityDefinition;
  let elementType: DataType;
  let extensionType: DataType;
  let member1: MemberVariable;
  let member2: MemberVariable;

  beforeEach(() => {
    elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    extensionType = DataType.getInstance("FHIR", "Extension", "/tmp");

    entityBuilder = new EntityDefinitionBuilder();
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = extensionType;
    entityBuilder.imports = new EntityImports([elementType]);
    extensionEntity = entityBuilder.buildEntityDefinition();
    [member1, member2] = extensionEntity.memberVariables;
  });

  it("should leave non-Extension types alone", () => {
    const result = transformer.transform(otherEntity);
    expect(result).toBe(otherEntity);
    expect(result.parentDataType).not.toBeNull();
  });

  it("should remove the parent of Extension types", () => {
    const result = transformer.transform(extensionEntity);
    expect(result).not.toBe(extensionEntity);
    expect(result.parentDataType).toBeNull();
  });

  it("should remove the Element import from Extension type", () => {
    expect(extensionEntity.imports.dataTypes).toStrictEqual([elementType]);
    const result = transformer.transform(extensionEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(0);
  });

  it("should add a new id member to the Extension type", () => {
    expect(extensionEntity.memberVariables).toStrictEqual([member1, member2]);
    const result = transformer.transform(extensionEntity);
    expect(result.memberVariables).toBeArrayOfSize(4);
    expect(result.memberVariables[2].variableName).toBe("id");
    expect(result.memberVariables[2].dataType).toBe(SystemString);
    expect(result.memberVariables[2].isArray).toBeFalse();
    expect(result.memberVariables[3].variableName).toBe("extension");
    expect(result.memberVariables[3].dataType).toBe(extensionType);
    expect(result.memberVariables[3].isArray).toBeTrue();
  });
});
