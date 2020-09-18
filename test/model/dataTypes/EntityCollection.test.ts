import DataType from "../../../src/model/dataTypes/DataType";
import EntityCollection from "../../../src/model/dataTypes/EntityCollection";
import EntityDefinition from "../../../src/model/dataTypes/EntityDefinition";
import EntityMetadata from "../../../src/model/dataTypes/EntityMetadata";
import EntityImports from "../../../src/model/dataTypes/EntityImports";
import FilePath from "../../../src/model/dataTypes/FilePath";
import ModelInfo from "../../../src/model/modelInfo/ModelInfo";
import TypeInfo from "../../../src/model/modelInfo/TypeInfo";
import MemberVariable from "../../../src/model/dataTypes/MemberVariable";
import TruePredicate from "../../../src/collectionUtils/core/TruePredicate";
import AddMemberVariableTransformer from "../../../src/collectionUtils/AddMemberVariableTransformer";

describe("EntityCollection", () => {
  let modelInfo: ModelInfo;
  let dataType1: DataType;
  let dataType2: DataType;
  let entity1: EntityDefinition;
  let entity2: EntityDefinition;
  let entities: Array<EntityDefinition>;
  let typeInfo1: TypeInfo;
  let typeInfo2: TypeInfo;
  let path: FilePath;

  beforeEach(() => {
    path = FilePath.getInstance("/tmp");
    dataType1 = DataType.getInstance("ns1", "type1", "/tmp");
    dataType2 = DataType.getInstance("ns2", "type2", "/tmp");

    const metadata1 = new EntityMetadata("ns1", "type1", "");
    const metadata2 = new EntityMetadata("ns2", "type2", "");

    const imports1 = new EntityImports([]);
    const imports2 = new EntityImports([]);

    entity1 = new EntityDefinition(metadata1, dataType1, null, [], imports1, null);
    entity2 = new EntityDefinition(metadata2, dataType2, null, [], imports2, null);
    entities = [entity1, entity2];

    typeInfo1 = new TypeInfo("type1", "ns1", null, null, []);
    typeInfo2 = new TypeInfo("type2", "ns2", null, null, []);
    modelInfo = new ModelInfo("mi", "version", [typeInfo1, typeInfo2]);
  });

  describe("constructor", () => {
    it("should initialize the entities collection", () => {
      const result = new EntityCollection(entities, path);
      expect(result.entities).toBe(entities);
      expect(result.baseDir).toBe(path);
    });
  });

  describe("#createEntityCollection()", () => {
    it("should handle a FilePath parameter", () => {
      const result = EntityCollection.createEntityCollection(modelInfo, path);
      expect(result.entities).toStrictEqual(entities);
    });

    it("should handle a file parameter of type string", () => {
      const baseDir = "/tmp";
      const result = EntityCollection.createEntityCollection(
        modelInfo,
        baseDir
      );
      expect(result.entities).toStrictEqual(entities);
    });
  });

  describe("#clone()", () => {
    it("should return a deep copy of the original", () => {
      const original = new EntityCollection(entities, path);
      const result = original.clone();
      expect(result.entities).not.toBe(entities);
      expect(result.baseDir).toBe(original.baseDir);
      expect(result.entities).toStrictEqual(original.entities);
    });
  });

  describe("#select()", () => {
    it("should return a new EntityColleciton with EntityDefinitions that match the Predicate", () => {
      const original = new EntityCollection(entities, path);
      const result = original.select(TruePredicate.INSTANCE);
      expect(result.entities).not.toBe(entities);
      expect(result.entities).toStrictEqual(original.entities);
    });
  });

  describe("#addEntityDefinition", () => {
    it("should add a new EntityDefinition to the collection and return a new object", () => {
      const original = new EntityCollection(entities, path);
      const result = original.addEntityDefinition(entity1);
      expect(result).not.toBe(original);
      expect(result.entities).toStrictEqual([...entities, entity1]);
    });
  });

  describe("#selectRejected()", () => {
    it("should return a new EntityColleciton with EntityDefinitions that do not match the Predicate", () => {
      const original = new EntityCollection(entities, path);
      const result = original.selectRejected(TruePredicate.INSTANCE);
      expect(result.entities).not.toBe(entities);
      expect(result.entities).toBeArrayOfSize(0);
    });
  });

  describe("#transform()", () => {
    it("should return a new EntityCollection whose values were all transformed by the transformer", () => {
      const original = new EntityCollection(entities, path);
      const newMember = new MemberVariable(dataType1, "newMember");
      const transformer = new AddMemberVariableTransformer(newMember);
      const result: EntityCollection = original.transform(transformer);
      expect(result.entities).toBeArrayOfSize(2);
      expect(result.entities[0].memberVariables).toStrictEqual([newMember]);
      expect(result.entities[1].memberVariables).toStrictEqual([newMember]);
    });
  });
});
