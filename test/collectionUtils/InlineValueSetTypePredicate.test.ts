import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import InlineValueSetTypePredicate from "../../src/collectionUtils/InlineValueSetTypePredicate";
import DataType from "../../src/model/dataTypes/DataType";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";

describe("InlineValueSetTypePredicate", () => {
  let predicate: InlineValueSetTypePredicate;
  let entityDefinitionBuilder: EntityDefinitionBuilder;
  let entity: EntityDefinition;
  let elementType: DataType;
  let otherType: DataType;
  let wrongNs: DataType;
  let systemStringType: DataType;
  let systemDateType: DataType;
  let valueMember: MemberVariable;
  let wrongNameMember: MemberVariable;
  let wrongTypeMember: MemberVariable;
  let wrongSystemTypeMember: MemberVariable;

  beforeEach(() => {
    predicate = new InlineValueSetTypePredicate();

    elementType = DataType.getInstance("FHIR", "Element", "/tmp");
    otherType = DataType.getInstance("WrongNS", "Element", "/tmp");
    wrongNs = DataType.getInstance("FHIR", "OtherType", "/tmp");
    systemStringType = DataType.getInstance("System", "String", "/tmp");
    systemDateType = DataType.getInstance("System", "Date", "/tmp");

    entityDefinitionBuilder = new EntityDefinitionBuilder();
    valueMember = new MemberVariable(systemStringType, "value");
    wrongNameMember = new MemberVariable(systemStringType, "notValue");
    wrongTypeMember = new MemberVariable(wrongNs, "value");
    wrongSystemTypeMember = new MemberVariable(systemDateType, "value");
    entityDefinitionBuilder.parentType = elementType;
    entityDefinitionBuilder.memberVariables = [valueMember];
  });

  it("should return true if entity extends FHIR.Element and has single value member", () => {
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeTrue();
  });

  it("should return false if entity is already primitive", () => {
    entityDefinitionBuilder.dataType = DataType.getInstance(
      "FHIR",
      "string",
      "/tmp"
    );
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });

  it("should return false if entity has no parent type", () => {
    entityDefinitionBuilder.parentType = null;
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });

  it("should return false if entity's parent type is not FHIR.Element", () => {
    entityDefinitionBuilder.parentType = wrongNs;
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();

    entityDefinitionBuilder.parentType = otherType;
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });

  it("should return false if entity has more than one member variable", () => {
    entityDefinitionBuilder.memberVariables = [valueMember, wrongNameMember];
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });

  it("should return false if entity's member is not named 'value'", () => {
    entityDefinitionBuilder.memberVariables = [wrongNameMember];
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });

  it("should return false if entity's member a System.String", () => {
    entityDefinitionBuilder.memberVariables = [wrongTypeMember];
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();

    entityDefinitionBuilder.memberVariables = [wrongSystemTypeMember];
    entity = entityDefinitionBuilder.buildEntityDefinition();
    expect(predicate.evaluate(entity)).toBeFalse();
  });
});
