import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyElementTypeTransformer from "../../src/collectionUtils/ModifyElementTypeTransformer";
import EntityImports from "../../src/model/dataTypes/EntityImports";

describe("ModifyElementTypeTransformer", () => {
  const transformer = new ModifyElementTypeTransformer();
  let entityBuilder: EntityDefinitionBuilder;
  let otherEntity: EntityDefinition;
  let elementEntity: EntityDefinition;
  let elementType: DataType;
  let otherType: DataType;

  beforeEach(() => {
    elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    otherType = DataType.getInstance("FHIR", "Other", "/tmp");

    entityBuilder = new EntityDefinitionBuilder();
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = elementType;
    entityBuilder.imports = new EntityImports([otherType]);
    elementEntity = entityBuilder.buildEntityDefinition();
  });

  it("should leave non-Element types alone", () => {
    const result = transformer.transform(otherEntity);
    expect(result).toBe(otherEntity);
    expect(result.parentDataType).not.toBeNull();
  });

  it("should set the parent of Element types to FHIR.Type", () => {
    const result = transformer.transform(elementEntity);
    expect(result).not.toBe(elementEntity);
    expect(result.parentDataType).not.toBeNull();
    expect(result.parentDataType?.namespace).toBe("FHIR");
    expect(result.parentDataType?.typeName).toBe("Type");
  });

  it("should add the FHIR.Type import to Element type", () => {
    expect(elementEntity.imports.dataTypes).toStrictEqual([otherType]);
    const result = transformer.transform(elementEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(2);
    expect(result.imports.dataTypes[1].typeName).toBe("Type");
  });
});
