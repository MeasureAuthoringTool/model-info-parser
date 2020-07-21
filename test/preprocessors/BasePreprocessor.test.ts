import BasePreprocessor from "../../src/preprocessors/BasePreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import Predicate from "../../src/collectionUtils/core/Predicate";
import Transformer from "../../src/collectionUtils/core/Transformer";
import DataType from "../../src/model/dataTypes/DataType";
import ModifyExtensionTypeTransformer from "../../src/collectionUtils/ModifyExtensionTypeTransformer";
import ModifyElementTypeTransformer from "../../src/collectionUtils/ModifyElementTypeTransformer";
import AddResourceTypeFieldTransformer from "../../src/collectionUtils/AddResourceTypeFieldTransformer";
import AddFhirIdFieldTransformer from "../../src/collectionUtils/AddFhirIdFieldTransformer";

describe("BasePreprocessor", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let preprocessor: BasePreprocessor;
  let allowedUnitsDef: EntityDefinition;
  let otherEntity: EntityDefinition;
  let entityCollection: EntityCollection;
  let mockAddFhirIdToResourceTransform: (
    input: EntityDefinition
  ) => EntityDefinition;
  let mockAddFhirIdToElementTransform: (
    input: EntityDefinition
  ) => EntityDefinition;
  let mockResourceTransform: (input: EntityDefinition) => EntityDefinition;
  let mockExtensionTransform: (input: EntityDefinition) => EntityDefinition;
  let mockElementTransform: (input: EntityDefinition) => EntityDefinition;
  let mockEvaluate: (input: EntityDefinition) => boolean;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    preprocessor = new BasePreprocessor();
    otherEntity = entityBuilder.buildEntityDefinition();

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = DataType.getInstance(
      "FHIR",
      "allowedUnits",
      "/tmp"
    );
    allowedUnitsDef = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [otherEntity, allowedUnitsDef],
      FilePath.getInstance("/tmp")
    );

    mockResourceTransform = jest.fn().mockReturnValue(entityCollection);
    mockExtensionTransform = jest.fn().mockReturnValue(entityCollection);
    mockElementTransform = jest.fn().mockReturnValue(entityCollection);
    mockAddFhirIdToResourceTransform = jest
      .fn()
      .mockReturnValue(entityCollection);
    mockAddFhirIdToElementTransform = jest
      .fn()
      .mockReturnValue(entityCollection);
    mockEvaluate = jest.fn().mockReturnValue(false);
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

    it("should initialize the modifyExtensionTypeTransformer", () => {
      expect(preprocessor.modifyExtensionTypeTransformer).toBeDefined();
      expect(preprocessor.modifyExtensionTypeTransformer).toBeInstanceOf(
        ModifyExtensionTypeTransformer
      );
    });

    it("should initialize the modifyElementTypeTransformer", () => {
      expect(preprocessor.modifyElementTypeTransformer).toBeDefined();
      expect(preprocessor.modifyElementTypeTransformer).toBeInstanceOf(
        ModifyElementTypeTransformer
      );
    });

    it("should initialize the AddFhirIdFieldTransformers", () => {
      expect(preprocessor.addFhirIdToResourceTransformer).toBeDefined();
      expect(preprocessor.addFhirIdToResourceTransformer).toBeInstanceOf(
        AddFhirIdFieldTransformer
      );
      expect(preprocessor.addFhirIdToElementTransformer).toBeDefined();
      expect(preprocessor.addFhirIdToElementTransformer).toBeInstanceOf(
        AddFhirIdFieldTransformer
      );
    });
  });

  describe("#preprocess()", () => {
    beforeEach(() => {
      const mockBlacklistPredicate: Predicate<EntityDefinition> = {
        evaluate: mockEvaluate,
      };

      const mockResourceTransformer: Transformer<
        EntityDefinition,
        EntityDefinition
      > = {
        transform: mockResourceTransform,
      };

      const mockExtensionTransformer: Transformer<
        EntityDefinition,
        EntityDefinition
      > = {
        transform: mockExtensionTransform,
      };

      const mockElementTransformer: Transformer<
        EntityDefinition,
        EntityDefinition
      > = {
        transform: mockElementTransform,
      };

      const mockAddFhirIdToResourceTransformer: Transformer<
        EntityDefinition,
        EntityDefinition
      > = {
        transform: mockAddFhirIdToResourceTransform,
      };

      const mockAddFhirIdToElementTransformer: Transformer<
        EntityDefinition,
        EntityDefinition
      > = {
        transform: mockAddFhirIdToElementTransform,
      };

      preprocessor.blacklistPredicate = mockBlacklistPredicate;
      preprocessor.addFhirIdToResourceTransformer = mockAddFhirIdToResourceTransformer;
      preprocessor.addFhirIdToElementTransformer = mockAddFhirIdToElementTransformer;
      preprocessor.addResourceTypeTransformer = mockResourceTransformer;
      preprocessor.modifyExtensionTypeTransformer = mockExtensionTransformer;
      preprocessor.modifyElementTypeTransformer = mockElementTransformer;
    });

    it("should filter out blacklisted EntityDefinitions", () => {
      const result = preprocessor.preprocess(entityCollection);
      expect(result).not.toBe(entityCollection);
      expect(result.entities).toBeArrayOfSize(3);
      expect(mockEvaluate).toHaveBeenCalledTimes(2);
    });

    it("should add a resourceType field to Resource entities", () => {
      preprocessor.preprocess(entityCollection);
      expect(mockResourceTransform).toHaveBeenCalledTimes(2);
    });

    it("should modify the Extension type to prevent circular dependencies", () => {
      preprocessor.preprocess(entityCollection);
      expect(mockExtensionTransform).toHaveBeenCalledTimes(2);
    });

    it("should modify the Element type to extend FHIR.Type", () => {
      preprocessor.preprocess(entityCollection);
      expect(mockElementTransform).toHaveBeenCalledTimes(2);
    });

    it("should create and add the FHIR.Type defintion to the collection", () => {
      const result: EntityCollection = preprocessor.preprocess(
        entityCollection
      );
      expect(result.entities).toBeArrayOfSize(3);
      expect(result.entities[2].parentDataType).toBeNull();
      expect(result.entities[2].dataType.namespace).toBe("FHIR");
      expect(result.entities[2].dataType.typeName).toBe("Type");
      expect(result.entities[2].dataType.path.toString()).toBe(
        `${entityCollection.baseDir.toString()}/FHIR/Type`
      );
      expect(result.entities[2].metadata.namespace).toBe("FHIR");
      expect(result.entities[2].metadata.originalTypeName).toBe("Type");
      expect(result.entities[2].metadata.parentTypeName).toBe("");
      expect(result.entities[2].imports.dataTypes).toBeArrayOfSize(0);
      expect(result.entities[2].parentDataType).toBeNull();
      expect(result.entities[2].memberVariables).toBeArrayOfSize(0);
    });

    it("should add fhirId field to Resource", () => {
      preprocessor.preprocess(entityCollection);
      expect(mockAddFhirIdToResourceTransform).toHaveBeenCalledTimes(2);
    });

    it("should add fhirId field to Element", () => {
      preprocessor.preprocess(entityCollection);
      expect(mockAddFhirIdToElementTransform).toHaveBeenCalledTimes(2);
    });
  });
});
