import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import AddInterfaceImportTransformer from "../../src/collectionUtils/AddInterfaceImportTransformer";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("AddInterfaceImportTransformer", () => {
  let baseDir: FilePath;
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;

  beforeEach(() => {
    baseDir = FilePath.getInstance("/tmp");
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance("ns4", "CustomType", "/tmp");
    entityDef = entityBuilder.buildEntityDefinition();
  });

  it("should add the interface import and return a new EntityDefinition", () => {
    const transformer = new AddInterfaceImportTransformer(baseDir);

    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(3);
    expect(result.imports.dataTypes[0].normalizedName).toBe("ICustomType");
  });
});
