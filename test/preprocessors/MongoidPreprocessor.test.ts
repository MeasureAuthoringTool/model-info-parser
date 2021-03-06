import MongoidPreprocessor from "../../src/preprocessors/MongoidPreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import DataType from "../../src/model/dataTypes/DataType";
import { RelationshipType } from "../../src/model/dataTypes/MemberVariable";

describe("MongoidPreprocessor", () => {
  let entityBuilder;
  let preprocessor: MongoidPreprocessor;
  let entityDefinition: EntityDefinition;
  let resourceEntity: EntityDefinition;
  let elementEntity: EntityDefinition;
  let measureDefinition: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.collectionName = null;
    preprocessor = new MongoidPreprocessor();

    entityDefinition = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance(
      "FHIR",
      "Measure",
      entityBuilder.dataType.path
    );
    measureDefinition = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance(
      "FHIR",
      "Element",
      entityBuilder.dataType.path
    );
    elementEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance(
      "FHIR",
      "Resource",
      entityBuilder.dataType.path
    );
    resourceEntity = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [entityDefinition, measureDefinition, resourceEntity, elementEntity],
      FilePath.getInstance("/tmp")
    );
  });

  it("should add two additional member variables to the Measure type (only)", () => {
    // preconditions
    expect(entityCollection.entities).toBeArrayOfSize(4);
    expect(entityCollection.entities[0].memberVariables).toBeArrayOfSize(2);
    expect(entityCollection.entities[1].memberVariables).toBeArrayOfSize(2);
    expect(entityCollection.entities[0].collectionName).toBeNull();
    expect(entityCollection.entities[1].collectionName).toBeNull();

    const result = preprocessor.preprocess(entityCollection);

    expect(result).not.toBe(entityCollection);
    const { entities } = result;
    expect(entities).toBeArrayOfSize(5);

    // First entity unchanged
    expect(entities[0].memberVariables).toBeArrayOfSize(2);

    // Second entity has 2 new members
    expect(entities[1].memberVariables).toBeArrayOfSize(4);
    expect(entities[1].memberVariables[2].relationshipType).toBe(
      RelationshipType.HasAndBelongsToMany
    );
    expect(entities[1].memberVariables[3].relationshipType).toBe(
      RelationshipType.HasAndBelongsToMany
    );
    expect(entities[1].memberVariables[2].variableName).toBe("valueSets");
    expect(entities[1].memberVariables[3].variableName).toBe("patients");
    expect(entities[1].memberVariables[2].bidirectional).toBeFalse();
    expect(entities[1].memberVariables[3].bidirectional).toBeFalse();

    expect(entities[0].collectionName).toBeNull();
    expect(entities[1].collectionName).toBe("fhir_measures");

    expect(entities[2].dataType.typeName).toBe("Resource");
    expect(entities[2].memberVariables[3].variableName).toBe("fhirId");

    expect(entities[3].dataType.typeName).toBe("Element");
    expect(entities[3].memberVariables[2].variableName).toBe("fhirId");

    // Third entity is our hand-made FHIR.Type
    expect(entities[4].dataType.namespace).toBe("FHIR");
    expect(entities[4].dataType.typeName).toBe("Type");
  });
});
