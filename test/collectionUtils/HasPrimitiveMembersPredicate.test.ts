import "jest-extended";
import HasPrimitiveMembersPredicate from "../../src/collectionUtils/HasPrimitiveMembersPredicate";
import DataType from "../../src/model/dataTypes/DataType";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";

describe("HasPrimitiveMembersPredicate", () => {
  let primitiveEntity: EntityDefinition;
  let nonPrimitiveEntity: EntityDefinition;
  let builder: EntityDefinitionBuilder;

  beforeEach(() => {
    const primitiveType = DataType.getInstance("FHIR", "string", "/tmp");
    const nonPrimitiveType = DataType.getInstance("FHIR", "Type2", "/tmp");

    const primitiveMember = new MemberVariable(
      primitiveType,
      "primitiveMember"
    );
    const nonPrimitiveMember = new MemberVariable(
      nonPrimitiveType,
      "nonPrimitiveMember"
    );

    builder = new EntityDefinitionBuilder();
    builder.memberVariables = [nonPrimitiveMember, primitiveMember];
    primitiveEntity = builder.buildEntityDefinition();

    builder = new EntityDefinitionBuilder();
    builder.memberVariables = [nonPrimitiveMember, nonPrimitiveMember];
    nonPrimitiveEntity = builder.buildEntityDefinition();
  });

  it("should return true if the EntityDefinition has a primitive member", () => {
    const predicate1 = new HasPrimitiveMembersPredicate();
    expect(predicate1.evaluate(primitiveEntity)).toBeTrue();
    expect(predicate1.evaluate(nonPrimitiveEntity)).toBeFalse();
  });
});
