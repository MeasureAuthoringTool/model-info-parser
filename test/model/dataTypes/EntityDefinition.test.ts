import DataType from "../../../src/model/dataTypes/DataType";
import EntityDefinition from "../../../src/model/dataTypes/EntityDefinition";
import EntityImports from "../../../src/model/dataTypes/EntityImports";
import EntityMetadata from "../../../src/model/dataTypes/EntityMetadata";
import MemberVariable from "../../../src/model/dataTypes/MemberVariable";
import Element from "../../../src/model/modelInfo/Element";
import ListElement from "../../../src/model/modelInfo/ListElement";
import SimpleElement from "../../../src/model/modelInfo/SimpleElement";
import TypeInfo from "../../../src/model/modelInfo/TypeInfo";
import FilePath from "../../../src/model/dataTypes/FilePath";
import IsDataTypePredicate from "../../../src/collectionUtils/IsDataTypePredicate";
import MemberVariableByNamePredicate from "../../../src/collectionUtils/MemberVariableByNamePredicate";
import NOPTransformer from "../../../src/collectionUtils/core/NOPTransformer";
import PathSegment from "../../../src/model/dataTypes/PathSegment";
import PrimaryCode from "../../../src/model/dataTypes/PrimaryCode";

describe("EntityDefinition", () => {
  let parentType: DataType;
  let memberType1: DataType;
  let memberType2: DataType;
  let extraType: DataType;
  let imports: EntityImports;
  let metadata: EntityMetadata;
  let dataType: DataType;
  let member1: MemberVariable;
  let member2: MemberVariable;
  let members: Array<MemberVariable>;
  let pathSegment1: PathSegment;
  let pathSegment2: PathSegment;
  let primaryCode: PrimaryCode;
  let entityDef: EntityDefinition;

  beforeEach(() => {
    parentType = DataType.getInstance("ns3", "Base.Type", "/tmp");
    memberType1 = DataType.getInstance("ns2", "memberTypeName1", "/tmp");
    memberType2 = DataType.getInstance("ns2", "memberTypeName2", "/tmp");
    extraType = DataType.getInstance("ns3", "ExtraType", "/tmp");
    imports = new EntityImports([memberType1, memberType2]);
    metadata = new EntityMetadata(
      "ns4",
      "Data.Type",
      "ns3.Base.Type",
      "primary.code.path"
    );
    dataType = DataType.getInstance("ns4", "Data.Type", "/tmp");
    member1 = new MemberVariable(memberType1, "varName1", false);
    member2 = new MemberVariable(memberType2, "varName2", true);
    members = [member1, member2];
    pathSegment1 = new PathSegment(memberType1, true, "foo");
    pathSegment2 = new PathSegment(memberType2, false, "bar");
    primaryCode = new PrimaryCode([pathSegment1, pathSegment2], [dataType]);
    entityDef = new EntityDefinition(
      metadata,
      dataType,
      parentType,
      members,
      imports,
      primaryCode,
      "some_collection"
    );
  });

  describe("constructor", () => {
    it("should initialize EntityDefinition variables", () => {
      expect(entityDef.metadata).toBe(metadata);
      expect(entityDef.dataType).toBe(dataType);
      expect(entityDef.parentDataType).toBe(parentType);
      expect(entityDef.memberVariables).toBe(members);
      expect(entityDef.imports).toBe(imports);
      expect(entityDef.primaryCode).toBe(primaryCode);
      expect(entityDef.collectionName).toBe("some_collection");
    });

    it("should default collectionName to null", () => {
      entityDef = new EntityDefinition(
        metadata,
        dataType,
        parentType,
        members,
        imports,
        primaryCode
      );
      expect(entityDef.metadata).toBe(metadata);
      expect(entityDef.dataType).toBe(dataType);
      expect(entityDef.parentDataType).toBe(parentType);
      expect(entityDef.memberVariables).toBe(members);
      expect(entityDef.imports).toBe(imports);
      expect(entityDef.primaryCode).toBe(primaryCode);
      expect(entityDef.collectionName).toBeNull();
    });
  });

  describe("#addImport()", () => {
    it("should add a new import", () => {
      const result = entityDef.addImport(extraType);
      expect(result).not.toBe(entityDef);
      expect(result.imports.dataTypes).toStrictEqual([
        extraType,
        memberType1,
        memberType2,
      ]);
    });
  });

  describe("#removeImports()", () => {
    it("should remove the specified imports", () => {
      const predicate = new IsDataTypePredicate("ns2", "memberTypeName2");
      const result = entityDef.removeImports(predicate);
      expect(result).not.toBe(entityDef);
      expect(result.imports.dataTypes).toStrictEqual([memberType1]);
    });
  });

  describe("#addMemberVariable()", () => {
    it("should add a new MemberVariable to the array", () => {
      const extraMember = new MemberVariable(extraType, "extraVar");
      const result = entityDef.addMemberVariable(extraMember);
      expect(result).not.toBe(entityDef);
      expect(result.memberVariables).toStrictEqual([
        member1,
        member2,
        extraMember,
      ]);
    });
  });

  describe("#removeMemberVariables()", () => {
    it("should remove MemberVariables that match the given predicate", () => {
      const predicate = new MemberVariableByNamePredicate(member1.variableName);
      const result = entityDef.removeMemberVariables(predicate);
      expect(result).not.toBe(entityDef);
      expect(result.memberVariables).toStrictEqual([member2]);
    });
  });

  describe("#transformMemberVariables()", () => {
    it("should execute transformer on all MemberVariables", () => {
      const noOpTransformer = new NOPTransformer<MemberVariable>();
      const transformSpy = jest.spyOn(noOpTransformer, "transform");

      const result = entityDef.transformMemberVariables(noOpTransformer);
      expect(result).not.toBe(entityDef);
      expect(transformSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("setPrimaryCode()", () => {
    it("should return a cloned copy with the new primaryCode", () => {
      const newPathSegment: PathSegment = new PathSegment(
        parentType,
        false,
        "newPath"
      );
      const newPrimaryCode = new PrimaryCode([newPathSegment], [dataType]);
      const result = entityDef.setPrimaryCode(newPrimaryCode);
      expect(result).not.toBe(entityDef);
      expect(result.primaryCode).not.toBeArrayOfSize(1);
      expect(result.primaryCode?.pathSegments[0]).toBe(newPathSegment);
    });
  });

  describe("#setCollectionName()", () => {
    it("should return a cloned value containing the new collectionName", () => {
      const result = entityDef.setCollectionName("newName");
      expect(result).not.toBe(entityDef);
      expect(result.collectionName).toBe("newName");
    });
  });

  describe("clone()", () => {
    let original: EntityDefinition;

    beforeEach(() => {
      original = new EntityDefinition(
        metadata,
        dataType,
        parentType,
        members,
        imports,
        primaryCode
      );
    });

    it("should create a deep copy of the original", () => {
      const result = original.clone();
      expect(result).not.toBe(original);
      expect(result).toStrictEqual(original);
      expect(result.metadata).not.toBe(metadata);
      expect(result.metadata.originalTypeName).toBe(metadata.originalTypeName);
      expect(result.dataType).toBe(dataType);
      expect(result.parentDataType).toBe(parentType);
      expect(result.memberVariables).not.toBe(members);
      expect(result.memberVariables).toBeArrayOfSize(2);
      expect(result.memberVariables[0].variableName).toBe(
        members[0].variableName
      );

      expect(result.imports).not.toBe(imports);
      expect(result.imports.dataTypes).toBeArrayOfSize(2);
      expect(result.imports.dataTypes[0].typeName).toBe(
        imports.dataTypes[0].typeName
      );
    });

    it("should allow passing a custom metadata", () => {
      const newMetadata: EntityMetadata = new EntityMetadata(
        "newNs",
        "newOgType",
        "newParent"
      );
      const result = original.clone({ metadata: newMetadata });
      expect(result.metadata).toBe(newMetadata);
    });

    it("should allow passing a custom dataType", () => {
      const newDataType: DataType = DataType.getInstance(
        "newNs",
        "newType",
        "/tmp/newBase"
      );
      const result = original.clone({ dataType: newDataType });
      expect(result.dataType).toBe(newDataType);
    });

    it("should allow passing a custom parentType", () => {
      const newParentType: DataType = DataType.getInstance(
        "newNs",
        "newParent",
        "/tmp/newBase"
      );
      const result = original.clone({ parentDataType: newParentType });
      expect(result.parentDataType).toBe(newParentType);
    });

    it("should allow passing a null parentType", () => {
      const result = original.clone({ parentDataType: null });
      expect(result.parentDataType).toBeNull();
    });

    it("should allow passing custom members", () => {
      const newMembers = [member2];
      const result = original.clone({ memberVariables: newMembers });
      expect(result.memberVariables).toBe(newMembers);
    });

    it("should allow passing empty members", () => {
      const result = original.clone({ memberVariables: [] });
      expect(result.memberVariables).toStrictEqual([]);
    });

    it("should allow passing a custom import set", () => {
      const newImports = new EntityImports([memberType2]);
      const result = original.clone({ imports: newImports });
      expect(result.imports).toBe(newImports);
    });

    it("should allow passing a PrimaryCode", () => {
      const newPathSegment: PathSegment = new PathSegment(
        parentType,
        false,
        "newPath"
      );
      const newPrimaryCode = new PrimaryCode([newPathSegment], [dataType]);
      const result = original.clone({ primaryCode: newPrimaryCode });
      expect(result.primaryCode).not.toBeArrayOfSize(1);
      expect(result.primaryCode?.pathSegments[0]).toBe(newPathSegment);
    });

    it("should allow passing a custom collection name", () => {
      const result = original.clone({ collectionName: "newCollectionName" });
      expect(result.collectionName).toBe("newCollectionName");
    });

    it("should allow passing a null collection name", () => {
      const result = original.clone({ collectionName: null });
      expect(result.collectionName).toBeNull();
    });
  });

  describe("createEntityDefinition", () => {
    let element1: Element;
    let element2: Element;
    let elements: Array<Element>;
    let typeInfo: TypeInfo;
    let baseDir: FilePath;

    beforeEach(() => {
      element1 = new SimpleElement("varName1", "ns2", "memberTypeName1");
      element2 = new ListElement("varName2", "ns2", "memberTypeName2");
      elements = [element1, element2];
      typeInfo = new TypeInfo(
        "Data.Type",
        "ns4",
        "Base.Type",
        "ns3",
        elements,
        "primary.code.path"
      );
      baseDir = FilePath.getInstance("/tmp");
    });

    it("should create an EntityDefinition with a string file path parameter", () => {
      const result = EntityDefinition.createEntityDefinition(typeInfo, "/tmp");
      expect(result).toBeDefined();
    });

    it("should create an EntityDefinition with a FilePath object parameter", () => {
      const result = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      expect(result).toBeDefined();
    });

    it("should initialize the entity's metadata correctly", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { metadata: result } = entity;
      expect(result.namespace).toBe(metadata.namespace);
      expect(result.originalTypeName).toBe(metadata.originalTypeName);
      expect(result.parentTypeName).toBe(metadata.parentTypeName);
      expect(result.primaryCodePath).toBe(metadata.primaryCodePath);
    });

    it("should initialize the entity's DataType correctly", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { dataType: result } = entity;
      expect(result.namespace).toBe(dataType.namespace);
      expect(result.typeName).toBe(dataType.typeName);
      expect(result.normalizedName).toBe(dataType.normalizedName);
      expect(result.path).toBe(dataType.path);
    });

    it("should handle null parent DataType", () => {
      typeInfo = new TypeInfo("Data.Type", "ns4", null, null, elements);
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { parentDataType, metadata: metaResult } = entity;
      expect(parentDataType).toBeNull();
      expect(metaResult.parentTypeName).toBe("");
    });

    it("should initialize the entity's parent DataType correctly", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { parentDataType } = entity;
      expect(parentDataType).toBeDefined();
      const castResult = parentDataType as DataType;
      expect(castResult.namespace).toBe(parentType.namespace);
      expect(castResult.typeName).toBe(parentType.typeName);
      expect(castResult.normalizedName).toBe(parentType.normalizedName);
      expect(castResult.path).toBe(parentType.path);
    });

    it("should initialize the entity's member variables correctly", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { memberVariables } = entity;
      expect(memberVariables).toBeArrayOfSize(2);
      const [m1, m2] = memberVariables;

      expect(m1.dataType).toBe(memberType1);
      expect(m1.variableName).toBe(member1.variableName);
      expect(m1.isArray).toBe(member1.isArray);

      expect(m2.dataType).toBe(memberType2);
      expect(m2.variableName).toBe(member2.variableName);
      expect(m2.isArray).toBe(member2.isArray);
    });

    it("should initialize the entity's imports correctly", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      const { imports: resultImports } = entity;
      expect(resultImports).toBeDefined();
      expect(resultImports.dataTypes).toBeArrayOfSize(3);
      const [importType1, importType2, importType3] = resultImports.dataTypes;
      expect(importType1).toBe(parentType);
      expect(importType2).toBe(memberType1);
      expect(importType3).toBe(memberType2);
    });

    it("should set the primaryCode to null for now", () => {
      const entity = EntityDefinition.createEntityDefinition(typeInfo, baseDir);
      expect(entity.primaryCode).toBeNull();
    });
  });
});
