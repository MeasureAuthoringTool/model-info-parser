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
  let typeType: DataType;
  let member1: MemberVariable;
  let member2: MemberVariable;
  let valueMember: MemberVariable;

  beforeEach(() => {
    elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    extensionType = DataType.getInstance("FHIR", "Extension", "/tmp");
    typeType = DataType.getInstance("FHIR", "Type", "/tmp");

    entityBuilder = new EntityDefinitionBuilder();
    otherEntity = entityBuilder.buildEntityDefinition();

    valueMember = new MemberVariable(
      typeType,
      "value",
      false,
      undefined,
      false,
      [elementType, extensionType]
    );

    entityBuilder.dataType = extensionType;
    entityBuilder.imports = new EntityImports([elementType]);
    entityBuilder.memberVariables.push(valueMember);

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

  it("should remove and re-add the 'value' MemberVariable ", () => {
    const result = transformer.transform(extensionEntity);
    expect(result.memberVariables).toBeArrayOfSize(6);
    expect(result.memberVariables[2].variableName).toBe("value");
    expect(result.memberVariables[2].choiceTypes).toBeArrayOfSize(0);
  });

  it("should add a new id member to the Extension type", () => {
    expect(extensionEntity.memberVariables).toStrictEqual([
      member1,
      member2,
      valueMember,
    ]);
    const result = transformer.transform(extensionEntity);
    expect(result.memberVariables).toBeArrayOfSize(6);
    expect(result.memberVariables[3].variableName).toBe("id");
    expect(result.memberVariables[3].dataType).toBe(SystemString);
    expect(result.memberVariables[3].isArray).toBeFalse();
    expect(result.memberVariables[4].variableName).toBe("extension");
    expect(result.memberVariables[4].dataType).toBe(extensionType);
    expect(result.memberVariables[4].isArray).toBeTrue();
    expect(result.memberVariables[5].variableName).toBe("fhirId");
    expect(result.memberVariables[5].dataType).toBe(SystemString);
    expect(result.memberVariables[5].isArray).toBeFalse();
  });
});
