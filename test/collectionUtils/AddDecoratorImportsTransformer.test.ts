import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import DataType from "../../src/model/dataTypes/DataType";
import AddDecoratorImportsTransformer from "../../src/collectionUtils/AddDecoratorImportsTransformer";
import FilePath from "../../src/model/dataTypes/FilePath";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import EntityImports from "../../src/model/dataTypes/EntityImports";

describe("AddDecoratorImportsTransformer", () => {
  let baseDir: FilePath;
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let fieldMember: MemberVariable;
  let arrayMember: MemberVariable;
  let choiceMember: MemberVariable;
  let transformer: AddDecoratorImportsTransformer;

  beforeEach(() => {
    baseDir = FilePath.getInstance("/tmp");
    transformer = new AddDecoratorImportsTransformer(baseDir);

    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.imports = new EntityImports([]);

    const fieldMemberType = DataType.getInstance("ns1", "fieldMember", "/tmp");
    const arrayMemberType = DataType.getInstance("ns1", "arrayMember", "/tmp");
    const choiceMemberType = DataType.getInstance(
      "ns1",
      "choiceMember",
      "/tmp"
    );
    fieldMember = new MemberVariable(fieldMemberType, "fieldVar", false);
    arrayMember = new MemberVariable(arrayMemberType, "arrayVar", true);
    choiceMember = new MemberVariable(
      choiceMemberType,
      "choiceVar",
      false,
      undefined,
      false,
      [fieldMemberType, arrayMemberType]
    );
  });

  it("should return a new instance", () => {
    entityBuilder.memberVariables = [];
    entityDef = entityBuilder.buildEntityDefinition();
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(0);
  });

  it("should add the FhirField import", () => {
    entityBuilder.memberVariables = [fieldMember];
    entityDef = entityBuilder.buildEntityDefinition();

    const result = transformer.transform(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].normalizedName).toBe("FhirField");
  });

  it("should add the FhirList import", () => {
    entityBuilder.memberVariables = [arrayMember];
    entityDef = entityBuilder.buildEntityDefinition();

    const result = transformer.transform(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].normalizedName).toBe("FhirList");
  });

  it("should add the FhirChoice import", () => {
    entityBuilder.memberVariables = [choiceMember];
    entityDef = entityBuilder.buildEntityDefinition();

    const result = transformer.transform(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(1);
    expect(result.imports.dataTypes[0].normalizedName).toBe("FhirChoice");
  });

  it("should add all 3 imports", () => {
    entityBuilder.memberVariables = [fieldMember, arrayMember, choiceMember];
    entityDef = entityBuilder.buildEntityDefinition();

    const result = transformer.transform(entityDef);
    expect(result.imports.dataTypes).toBeArrayOfSize(3);
    expect(result.imports.dataTypes[0].normalizedName).toBe("FhirChoice");
    expect(result.imports.dataTypes[1].normalizedName).toBe("FhirField");
    expect(result.imports.dataTypes[2].normalizedName).toBe("FhirList");
  });
});
