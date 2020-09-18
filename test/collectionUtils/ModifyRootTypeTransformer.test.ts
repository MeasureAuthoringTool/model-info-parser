import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyRootTypeTransformer from "../../src/collectionUtils/ModifyRootTypeTransformer";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("ModifyRootTypeTransformer", () => {
  const baseDir = FilePath.getInstance("/tmp/base");
  const transformer = new ModifyRootTypeTransformer(baseDir);
  let entityBuilder: EntityDefinitionBuilder;
  let typeEntity: EntityDefinition;
  let otherEntity: EntityDefinition;
  let rootEntity: EntityDefinition;
  let typeType: DataType;
  let rootType: DataType;
  let otherType: DataType;

  beforeEach(() => {
    typeType = DataType.getInstance("FHIR", "Type", baseDir);
    rootType = DataType.getInstance("FHIR", "RootType", baseDir);
    otherType = DataType.getInstance("FHIR", "Other", baseDir);

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.parentType = typeType;
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.parentType = null;
    entityBuilder.dataType = typeType;
    typeEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.parentType = null;
    entityBuilder.dataType = rootType;
    entityBuilder.imports = new EntityImports([otherType]);
    rootEntity = entityBuilder.buildEntityDefinition();
  });

  it("should leave non-root types alone", () => {
    const result = transformer.transform(otherEntity);
    expect(result).toBe(otherEntity);
    expect(result.parentDataType).toBe(typeType);
  });

  it("should leave the 'Type' type alone", () => {
    const result = transformer.transform(typeEntity);
    expect(result).toBe(typeEntity);
    expect(result.parentDataType).toBeNull();
  });

  it("should set the parent of root types to FHIR.Type", () => {
    const result = transformer.transform(rootEntity);
    expect(result).not.toBe(rootEntity);
    expect(result.parentDataType).not.toBeNull();
    expect(result.parentDataType).toBe(typeType);
  });

  it("should add the FHIR.Type import to non-root types", () => {
    expect(rootEntity.imports.dataTypes).toStrictEqual([otherType]);
    const result = transformer.transform(rootEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(2);
    expect(result.imports.dataTypes[1].typeName).toBe("Type");
  });
});
