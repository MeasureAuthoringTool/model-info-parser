import TypeScriptInterfaceTransformer from "../../src/collectionUtils/TypeScriptInterfaceTransformer";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import DataType from "../../src/model/dataTypes/DataType";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import FilePath from "../../src/model/dataTypes/FilePath";
import SystemBoolean from "../../src/model/dataTypes/system/SystemBoolean";

describe("TypeScriptInterfaceTransformer", () => {
  describe("constructor", () => {
    it("should set the baseDir property", () => {
      const baseDir = FilePath.getInstance("/tmp");
      const result = new TypeScriptInterfaceTransformer(baseDir);
      expect(result.baseDir).toBe(baseDir);
    });
  });

  describe("#transform()", () => {
    const baseDir = FilePath.getInstance("/tmp/whatever/new/path");
    let transformer: TypeScriptInterfaceTransformer;
    let builder: EntityDefinitionBuilder;
    let regularEntity: EntityDefinition;
    let primitiveEntity: EntityDefinition;
    let dataType: DataType;
    let parentDataType: DataType;
    let member1: MemberVariable;
    let member2: MemberVariable;

    beforeEach(() => {
      transformer = new TypeScriptInterfaceTransformer(baseDir);
      builder = new EntityDefinitionBuilder();
      regularEntity = builder.buildEntityDefinition();
      dataType = regularEntity.dataType;
      if (!regularEntity.parentDataType) {
        throw new Error("missing parentDataType");
      }
      parentDataType = regularEntity.parentDataType;
      [member1, member2] = regularEntity.memberVariables;

      const primitiveType = DataType.getInstance("FHIR", "string", baseDir);
      const primitiveMember = new MemberVariable(primitiveType, "primitiveMember");
      builder = new EntityDefinitionBuilder();
      builder.memberVariables = [primitiveMember];
      primitiveEntity = builder.buildEntityDefinition();
    });

    function assertDataType(resultType: DataType, inputType: DataType): void {
      expect(resultType.namespace).toBe(inputType.namespace);
      expect(resultType.path.toString()).toBe(
        `${baseDir.toString()}/${inputType.namespace}/I${
          inputType.normalizedName
        }`
      );
      expect(resultType.typeName).toBe(`I${inputType.normalizedName}`);
      expect(resultType.normalizedName).toBe(`I${inputType.normalizedName}`);
      expect(resultType.systemType).toBe(inputType.systemType);
      expect(resultType.primitive).toBe(inputType.primitive);
    }

    it("should clone the input EntityDefinition", () => {
      const result = transformer.transform(regularEntity);
      expect(result).not.toBe(regularEntity);
    });

    it("should clone, but not alter the metadata", () => {
      const result = transformer.transform(regularEntity);
      expect(result.metadata).not.toBe(regularEntity.metadata);
      expect(result.metadata).toStrictEqual(regularEntity.metadata);
    });

    it("should not transform system types", () => {
      builder = new EntityDefinitionBuilder();
      builder.memberVariables = [new MemberVariable(SystemBoolean, "blah")];
      regularEntity = builder.buildEntityDefinition();

      const result = transformer.transform(regularEntity);

      expect(result.memberVariables).toBeArrayOfSize(1);
      expect(result.memberVariables[0].variableName).toBe("blah");
      expect(result.memberVariables[0].dataType.namespace).toBe("System");
      expect(result.memberVariables[0].dataType.typeName).toBe("Boolean");
    });

    it("should prefix new DataType with an 'I'", () => {
      const result = transformer.transform(regularEntity);
      expect(result).toBeDefined();
      const resultType = result.dataType;
      assertDataType(resultType, dataType);
    });

    it("should prefix parent DataType with an 'I'", () => {
      const result = transformer.transform(regularEntity);
      expect(result).toBeDefined();
      const resultType = result.parentDataType;
      if (!resultType) {
        throw new Error("missing result type");
      }
      assertDataType(resultType, parentDataType);
    });

    it("should convert successfully when no parent type specified", () => {
      builder = new EntityDefinitionBuilder();
      builder.parentType = null;
      regularEntity = builder.buildEntityDefinition();
      const result = transformer.transform(regularEntity);
      expect(result.parentDataType).toBeNull();
    });

    it("should convert member variables", () => {
      const result = transformer.transform(regularEntity);
      const [resultMember1, resultMember2] = result.memberVariables;
      expect(resultMember1.variableName).toBe(member1.variableName);
      expect(resultMember2.variableName).toBe(member2.variableName);
      expect(resultMember1.isArray).toBe(member1.isArray);
      expect(resultMember2.isArray).toBe(resultMember2.isArray);
      expect(resultMember1.relationshipType).toBe(
        resultMember1.relationshipType
      );
      expect(resultMember2.relationshipType).toBe(member2.relationshipType);
      expect(resultMember1.bidirectional).toBe(resultMember1.bidirectional);
      expect(resultMember2.bidirectional).toBe(member2.bidirectional);
      assertDataType(resultMember1.dataType, member1.dataType);
      assertDataType(resultMember2.dataType, member2.dataType);
    });

    it("should convert imports", () => {
      const { imports } = regularEntity;
      const [importType1, importType2] = imports.dataTypes;
      const result = transformer.transform(regularEntity);
      expect(result).toBeDefined();
      const [resultType1, resultType2] = result.imports.dataTypes;
      assertDataType(resultType1, importType1);
      assertDataType(resultType2, importType2);
    });

    it("should add an IElement import to entities with primitive members", () => {
      const result = transformer.transform(primitiveEntity);
      expect(result.imports.dataTypes).toBeArrayOfSize(3);
      expect(result.imports.dataTypes[0].normalizedName).toBe("IElement");
      expect(result.imports.dataTypes[1].normalizedName).toBe("ImemberTypeName1");
      expect(result.imports.dataTypes[2].normalizedName).toBe("ImemberTypeName2");
    });
  });
});
