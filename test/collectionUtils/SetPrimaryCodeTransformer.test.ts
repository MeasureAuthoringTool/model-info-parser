import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import SetPrimaryCodeTransformer from "../../src/collectionUtils/SetPrimaryCodeTransformer";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import EntityMetadata from "../../src/model/dataTypes/EntityMetadata";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import DataType from "../../src/model/dataTypes/DataType";
import EntityImports from "../../src/model/dataTypes/EntityImports";

describe("SetPrimaryCodeTransformer", () => {
  const baseDir = FilePath.getInstance("/tmp");
  const mainType = DataType.getInstance("ns", "MainType", baseDir);
  const memberType = DataType.getInstance("ns", "MemberType", baseDir);
  const nestedType = DataType.getInstance("ns", "NestedType", baseDir);
  let metadata: EntityMetadata;
  let memberVar: MemberVariable;
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let memberDefinition: EntityDefinition;
  let entityCollection: EntityCollection;
  let transformer: SetPrimaryCodeTransformer;

  function buildEntity(primaryCodePath: string | null): void {
    metadata = new EntityMetadata("ns", "TypeName", "parent", primaryCodePath);
    memberVar = new MemberVariable(memberType, "var1", false);
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = mainType;
    entityBuilder.imports = new EntityImports([]);
    entityBuilder.metadata = metadata;
    entityBuilder.memberVariables = [memberVar];
    entityBuilder.primaryCode = null;
    entityDef = entityBuilder.buildEntityDefinition();

    // Build up the definition of the type referenced by the MemberVariable
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = memberType;
    entityBuilder.memberVariables = [
      new MemberVariable(nestedType, "var2", false),
    ];
    memberDefinition = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection(
      [entityDef, memberDefinition],
      baseDir
    );
    transformer = new SetPrimaryCodeTransformer(entityCollection);
  }

  it("should handle an empty primaryCodePath", () => {
    buildEntity(null);
    const result = transformer.transform(entityDef);
    expect(result).toBe(entityDef);
    expect(result.primaryCode).toBeNull();
  });

  it("should throw an error if no member with that name exists", () => {
    buildEntity("notFound");
    expect(() => {
      transformer.transform(entityDef);
    }).toThrow("The path 'notFound' cannot be found on ns.TypeName");
  });

  it("should throw an error if multiple members with specified name exist", () => {
    buildEntity("var1");
    const newEntity = entityDef.addMemberVariable(memberVar);
    entityCollection = new EntityCollection(
      [newEntity, memberDefinition],
      baseDir
    );
    transformer = new SetPrimaryCodeTransformer(entityCollection);
    expect(() => {
      transformer.transform(newEntity);
    }).toThrow("The path 'var1' resolves to multiple locations on ns.TypeName");
  });

  it("should add an import to the primary code type", () => {
    buildEntity("var1");
    const result = transformer.transform(entityDef);
    expect(result.imports.dataTypes.length).toBe(1);
    expect(result.imports.dataTypes[0]).toBe(memberType);
  });

  it("should return the datatype of the member referenced in the primaryCodePath metadata", () => {
    buildEntity("var1");
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.primaryCode?.pathSegments).toBeArrayOfSize(1);
    expect(result.primaryCode?.pathSegments[0].dataType).toBe(memberType);
    expect(result.primaryCode?.pathSegments[0].isArray).toBeFalse();
    expect(result.primaryCode?.pathSegments[0].path).toBe("var1");
  });

  it("should handle simple array types", () => {
    buildEntity("var1");
    entityDef = entityDef.clone({
      memberVariables: [new MemberVariable(memberType, "var1", true)],
    });
    entityCollection = new EntityCollection(
      [entityDef, memberDefinition],
      baseDir
    );
    transformer = new SetPrimaryCodeTransformer(entityCollection);
    const result = transformer.transform(entityDef);
    expect(result.primaryCode?.pathSegments).toBeArrayOfSize(1);
    expect(result.primaryCode?.pathSegments[0].dataType).toBe(memberType);
    expect(result.primaryCode?.pathSegments[0].isArray).toBeTrue();
    expect(result.primaryCode?.pathSegments[0].path).toBe("var1");
  });

  it("should handle simple nested paths", () => {
    buildEntity("var1.var2");
    const result = transformer.transform(entityDef);
    expect(result.primaryCode?.pathSegments).toBeArrayOfSize(2);
    expect(result.primaryCode?.pathSegments[0].dataType).toBe(memberType);
    expect(result.primaryCode?.pathSegments[0].isArray).toBeFalse();
    expect(result.primaryCode?.pathSegments[0].path).toBe("var1");
    expect(result.primaryCode?.pathSegments[1].dataType).toBe(nestedType);
    expect(result.primaryCode?.pathSegments[1].isArray).toBeFalse();
    expect(result.primaryCode?.pathSegments[1].path).toBe("var2");
  });

  describe("choice types", () => {
    const typeType = DataType.getInstance("ns", "Type", baseDir);
    let choiceMember: MemberVariable;

    beforeEach(() => {
      buildEntity("var1");
      choiceMember = new MemberVariable(
        typeType,
        "var1",
        false,
        undefined,
        undefined,
        [memberType, nestedType]
      );
      entityDef = entityDef.clone({ memberVariables: [choiceMember] });

      entityCollection = new EntityCollection(
        [entityDef, memberDefinition],
        baseDir
      );
      transformer = new SetPrimaryCodeTransformer(entityCollection);
    });

    it("should handle choice type MemberVariables", () => {
      const result = transformer.transform(entityDef);
      const { primaryCode } = result;
      expect(primaryCode?.returnType).toBeArrayOfSize(2);
      expect(primaryCode?.returnType[0]).toBe(memberType);
      expect(primaryCode?.returnType[1]).toBe(nestedType);
      expect(primaryCode?.pathSegments).toBeArrayOfSize(1);
      expect(primaryCode?.pathSegments[0].dataType).toBe(typeType);
      expect(primaryCode?.pathSegments[0].isArray).toBeFalse()
      expect(primaryCode?.pathSegments[0].path).toBe("var1");
    });
  });
});
