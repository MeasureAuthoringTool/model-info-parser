import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import SetPrimaryCodeTypeTransformer from "../../src/collectionUtils/SetPrimaryCodeTypeTransformer";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";
import EntityMetadata from "../../src/model/dataTypes/EntityMetadata";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import DataType from "../../src/model/dataTypes/DataType";
import EntityImports from "../../src/model/dataTypes/EntityImports";

describe("SetPrimaryCodeTypeTransformer", () => {
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
  let transformer: SetPrimaryCodeTypeTransformer;

  function buildEntity(primaryCodePath: string | null): void {
    metadata = new EntityMetadata("ns", "TypeName", "parent", primaryCodePath);
    memberVar = new MemberVariable(memberType, "var1", false);
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = mainType;
    entityBuilder.imports = new EntityImports([]);
    entityBuilder.metadata = metadata;
    entityBuilder.memberVariables = [memberVar];
    entityBuilder.primaryCodeType = null;
    entityDef = entityBuilder.buildEntityDefinition();

    // Build up the definition of the type referenced by the MemberVariable
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.dataType = memberType;
    entityBuilder.memberVariables = [new MemberVariable(nestedType, "var2", false)];
    memberDefinition = entityBuilder.buildEntityDefinition();

    entityCollection = new EntityCollection([entityDef, memberDefinition], baseDir);
    transformer = new SetPrimaryCodeTypeTransformer(entityCollection);
  }

  it("should handle an empty primaryCodePath", () => {
    buildEntity(null);
    const result = transformer.transform(entityDef);
    expect(result).toBe(entityDef);
    expect(result.primaryCodeType).toBeNull();
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
    entityCollection = new EntityCollection([newEntity, memberDefinition], baseDir);
    transformer = new SetPrimaryCodeTypeTransformer(entityCollection);
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
    expect(result.primaryCodeType).not.toBeNull();
    expect(result.primaryCodeType?.dataType).toBe(memberType);
    expect(result.primaryCodeType?.isArray).toBeFalse();
    expect(result.primaryCodeType?.path).toBe("var1");
  });

  it("should handle simple array types", () => {
    buildEntity("var1");
    entityDef = entityDef.clone({
      memberVariables: [new MemberVariable(memberType, "var1", true)]
    });
    entityCollection = new EntityCollection([entityDef, memberDefinition], baseDir);
    transformer = new SetPrimaryCodeTypeTransformer(entityCollection);
    const result = transformer.transform(entityDef);
    expect(result.primaryCodeType?.dataType).toBe(memberType);
    expect(result.primaryCodeType?.isArray).toBeTrue();
    expect(result.primaryCodeType?.path).toBe("var1?.[0]");
  });

  it("should handle simple nested paths", () => {
    buildEntity("var1.var2");
    const result = transformer.transform(entityDef);
    expect(result.primaryCodeType?.dataType).toBe(nestedType);
    expect(result.primaryCodeType?.isArray).toBeFalse()
    expect(result.primaryCodeType?.path).toBe("var1?.var2");
  });
});
