import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyExtensionTypeTransformer from "../../src/collectionUtils/ModifyExtensionTypeTransformer";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("ModifyExtensionTypeTransformer", () => {
  const path = FilePath.getInstance("/tmp");
  const transformer = new ModifyExtensionTypeTransformer(path);
  let entityBuilder: EntityDefinitionBuilder;
  let otherEntity: EntityDefinition;
  let extensionEntity: EntityDefinition;
  let extensionType: DataType;

  beforeEach(() => {
    extensionType = DataType.getInstance("FHIR", "Extension", "/tmp");

    entityBuilder = new EntityDefinitionBuilder();
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = extensionType;
    entityBuilder.imports = new EntityImports([]);

    extensionEntity = entityBuilder.buildEntityDefinition();
  });

  it("should leave non-Extension types alone", () => {
    const result = transformer.transform(otherEntity);
    expect(result).toBe(otherEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(2);
    expect(result.imports.dataTypes[0].normalizedName).toBe("memberTypeName1");
    expect(result.imports.dataTypes[1].normalizedName).toBe("memberTypeName2");
  });

  it("should add the IElement import to Extension types", () => {
    const result = transformer.transform(extensionEntity);
    expect(result).not.toBe(extensionEntity);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].normalizedName).toBe("IElement");
  });
});
