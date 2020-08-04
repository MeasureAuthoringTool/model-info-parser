import BasePreprocessor from "../../src/preprocessors/BasePreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import Predicate from "../../src/collectionUtils/core/Predicate";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyElementTypeTransformer from "../../src/collectionUtils/ModifyElementTypeTransformer";
import AddResourceTypeFieldTransformer from "../../src/collectionUtils/AddResourceTypeFieldTransformer";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";

describe("BasePreprocessor", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let preprocessor: BasePreprocessor;
  let allowedUnitsDef: EntityDefinition;
  let resourceEntity: EntityDefinition;
  let elementEntity: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    preprocessor = new BasePreprocessor();
    entityBuilder.dataType = DataType.getInstance("FHIR", "Resource", "/tmp");
    resourceEntity = entityBuilder.buildEntityDefinition();

    entityBuilder.dataType = DataType.getInstance("FHIR", "Element", "/tmp");
    elementEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance(
      "FHIR",
      "allowedUnits",
      "/tmp"
    );
    allowedUnitsDef = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    const valueSetType = DataType.getInstance("FHIR", "ValueSetType", "/tmp");
    const elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    const systemString = DataType.getInstance("System", "String", "/tmp");
    const valueMember = new MemberVariable(systemString, "value");

    entityBuilder.dataType = valueSetType;
    entityBuilder.parentType = elementType;
    entityBuilder.memberVariables = [valueMember];
    const valueSetEntity = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [resourceEntity, elementEntity, allowedUnitsDef, valueSetEntity],
      FilePath.getInstance("/tmp")
    );
  });

  describe("constructor", () => {
    it("should initialize the blacklistPredicate", () => {
      expect(preprocessor.blacklistPredicate).toBeDefined();
      expect(preprocessor.blacklistPredicate).toBeInstanceOf(Predicate);
    });

    it("should initialize the addResourceTypeTransformer", () => {
      expect(preprocessor.addResourceTypeTransformer).toBeDefined();
      expect(preprocessor.addResourceTypeTransformer).toBeInstanceOf(
        AddResourceTypeFieldTransformer
      );
    });

    it("should initialize the modifyElementTypeTransformer", () => {
      expect(preprocessor.modifyElementTypeTransformer).toBeDefined();
      expect(preprocessor.modifyElementTypeTransformer).toBeInstanceOf(
        ModifyElementTypeTransformer
      );
    });
  });

  describe("#preprocess()", () => {
    it("should filter out blacklisted EntityDefinitions", () => {
      const result = preprocessor.preprocess(entityCollection);
      expect(result).not.toBe(entityCollection);
      expect(result.entities).toBeArrayOfSize(4);
      expect(result.entities[0].dataType.normalizedName).toBe("Resource");
      expect(result.entities[1].dataType.normalizedName).toBe("Element");
      expect(result.entities[2].dataType.normalizedName).toBe("ValueSetType");
      expect(result.entities[3].dataType.normalizedName).toBe("Type");
    });

    it("should add a resourceType field to Resource entities", () => {
      const result = preprocessor.preprocess(entityCollection);
      expect(result.entities[0].dataType.normalizedName).toBe("Resource")
      expect(result.entities[0].memberVariables).toBeArrayOfSize(3);
      expect(result.entities[0].memberVariables[2].variableName).toBe("resourceType");

    });

    it("should modify the Element type to extend FHIR.Type", () => {
      const result = preprocessor.preprocess(entityCollection);
      expect(result.entities[1].parentDataType?.normalizedName).toBe("Type");
    });

    it("should create and add the FHIR.Type definition to the collection", () => {
      const result: EntityCollection = preprocessor.preprocess(
        entityCollection
      );
      expect(result.entities).toBeArrayOfSize(4);
      const fhirType = result.entities[3];
      expect(fhirType.parentDataType).toBeNull();
      expect(fhirType.dataType.namespace).toBe("FHIR");
      expect(fhirType.dataType.typeName).toBe("Type");
      expect(fhirType.dataType.path.toString()).toBe(
        `${entityCollection.baseDir.toString()}/FHIR/Type`
      );
      expect(fhirType.metadata.namespace).toBe("FHIR");
      expect(fhirType.metadata.originalTypeName).toBe("Type");
      expect(fhirType.metadata.parentTypeName).toBe("");
      expect(fhirType.imports.dataTypes).toBeArrayOfSize(0);
      expect(fhirType.parentDataType).toBeNull();
      expect(fhirType.memberVariables).toBeArrayOfSize(0);
    });

    it("should transform the valueSet type", () => {
      const result: EntityCollection = preprocessor.preprocess(
        entityCollection
      );
      expect(result.entities).toBeArrayOfSize(4);
      const transformedEntity = result.entities[2];
      expect(transformedEntity.dataType.normalizedName).toBe("ValueSetType");
      expect(transformedEntity.dataType.primitive).toBeTrue();
      expect(transformedEntity.memberVariables).toBeArrayOfSize(0);
      expect(transformedEntity.imports.dataTypes).toBeArrayOfSize(1);
      expect(transformedEntity.imports.dataTypes[0].normalizedName).toBe("PrimitiveCode");
      expect(transformedEntity.parentDataType?.normalizedName).toBe("PrimitiveCode");
    });
  });
});
