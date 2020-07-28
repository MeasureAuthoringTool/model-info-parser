import TypeScriptClassPreprocessor from "../../src/preprocessors/TypeScriptClassPreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import DataType from "../../src/model/dataTypes/DataType";

describe("TypeScriptClassPreprocessor", () => {
  const entityBuilder = new EntityDefinitionBuilder();

  let preprocessor: TypeScriptClassPreprocessor;
  let path: FilePath;
  let primitiveEntity: EntityDefinition;
  let nonPrimitiveEntity: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    preprocessor = new TypeScriptClassPreprocessor();
    path = FilePath.getInstance("/tmp");

    const primitiveType = DataType.getInstance("FHIR", "string", path);
    const notPrimitiveType = DataType.getInstance("FHIR", "Coding", path);

    entityBuilder.dataType = primitiveType;
    primitiveEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = notPrimitiveType;
    nonPrimitiveEntity = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [primitiveEntity, nonPrimitiveEntity],
      path
    );
  });

  it("should add the appropriate imports to primitive types", () => {
    expect(primitiveEntity.imports.dataTypes).toBeArrayOfSize(2);

    const result = preprocessor.preprocess(entityCollection);

    expect(result.entities).toBeArrayOfSize(2);
    const { dataTypes: importTypes } = result.entities[0].imports;

    expect(importTypes).toBeArrayOfSize(3);
    expect(importTypes[0].normalizedName).toBe("IElement");
    expect(importTypes[1].normalizedName).toBe("memberTypeName1");
    expect(importTypes[2].normalizedName).toBe("memberTypeName2");
  });

  it("should add the appropriate imports to non-primitive types", () => {
    expect(nonPrimitiveEntity.imports.dataTypes).toBeArrayOfSize(2);

    const result = preprocessor.preprocess(entityCollection);

    expect(result.entities).toBeArrayOfSize(2);
    const { dataTypes: importTypes } = result.entities[1].imports;

    expect(importTypes).toBeArrayOfSize(3);
    expect(importTypes[0].normalizedName).toBe("ICoding");
    expect(importTypes[1].normalizedName).toBe("memberTypeName1");
    expect(importTypes[2].normalizedName).toBe("memberTypeName2");
  });
});
