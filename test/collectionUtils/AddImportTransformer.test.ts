import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import AddImportTransformer from "../../src/collectionUtils/AddImportTransformer";

describe("AddImportTransformer", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let import1: DataType;
  let import2: DataType;
  let newImport: DataType;
  let newImport2: DataType;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entityDef = entityBuilder.buildEntityDefinition();
    [import1, import2] = entityDef.imports.dataTypes;

    newImport = DataType.getInstance("TEST", "Import", "/tmp");
    newImport2 = DataType.getInstance("TEST2", "Import2", "/tmp");
  });

  it("should add the specified imports and return a new EntityDefinition", () => {
    const transformer = new AddImportTransformer(newImport);
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toStrictEqual([
      newImport,
      import1,
      import2,
    ]);
  });

  it("should allow multiple imports being specified", () => {
    const transformer = new AddImportTransformer(newImport, newImport2);
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toStrictEqual([
      newImport,
      newImport2,
      import1,
      import2,
    ]);
  });
});
