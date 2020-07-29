import TypeScriptClassPreprocessor from "../../src/preprocessors/TypeScriptClassPreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import DataType from "../../src/model/dataTypes/DataType";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";

describe("TypeScriptClassPreprocessor", () => {
  let entityBuilder: EntityDefinitionBuilder;

  let preprocessor: TypeScriptClassPreprocessor;
  let path: FilePath;
  let primitiveEntity: EntityDefinition;
  let nonPrimitiveEntity: EntityDefinition;
  let primitiveMemberEntity: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();

    preprocessor = new TypeScriptClassPreprocessor();
    path = FilePath.getInstance("/tmp");

    const primitiveType = DataType.getInstance("FHIR", "string", path);
    const notPrimitiveType = DataType.getInstance("FHIR", "Extension", path);

    entityBuilder.dataType = primitiveType;
    primitiveEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = notPrimitiveType;
    nonPrimitiveEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    const primitiveMember = new MemberVariable(
      primitiveType,
      "primitiveMember"
    );
    entityBuilder.memberVariables = [primitiveMember];
    primitiveMemberEntity = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [primitiveEntity, nonPrimitiveEntity, primitiveMemberEntity],
      path
    );
  });

  it("should add the appropriate imports to primitive types", () => {
    expect(primitiveEntity.imports.dataTypes).toBeArrayOfSize(2);

    const result = preprocessor.preprocess(entityCollection);

    expect(result.entities).toBeArrayOfSize(3);
    const { dataTypes: importTypes } = result.entities[0].imports;

    expect(importTypes).toBeArrayOfSize(3);
    expect(importTypes[0].normalizedName).toBe("IElement");
    expect(importTypes[1].normalizedName).toBe("memberTypeName1");
    expect(importTypes[2].normalizedName).toBe("memberTypeName2");
  });

  it("should add the appropriate imports to non-primitive types", () => {
    expect(nonPrimitiveEntity.imports.dataTypes).toBeArrayOfSize(2);

    const result = preprocessor.preprocess(entityCollection);

    expect(result.entities).toBeArrayOfSize(3);
    const { dataTypes: importTypes } = result.entities[1].imports;

    expect(importTypes).toBeArrayOfSize(4);
    expect(importTypes[0].normalizedName).toBe("IElement"); // only added to Extension type
    expect(importTypes[1].normalizedName).toBe("IExtension");
    expect(importTypes[2].normalizedName).toBe("memberTypeName1");
    expect(importTypes[3].normalizedName).toBe("memberTypeName2");
  });

  it("should add an Extension import to any Entity with a primitive member", () => {
    expect(primitiveMemberEntity.imports.dataTypes).toBeArrayOfSize(2);

    const result = preprocessor.preprocess(entityCollection);

    const { dataTypes: importTypes } = result.entities[2].imports;
    expect(importTypes).toBeArrayOfSize(4);
    expect(importTypes[0].normalizedName).toBe("Extension");
    expect(importTypes[1].normalizedName).toBe("IDataType");
    expect(importTypes[2].normalizedName).toBe("memberTypeName1");
    expect(importTypes[3].normalizedName).toBe("memberTypeName2");
  });
});
