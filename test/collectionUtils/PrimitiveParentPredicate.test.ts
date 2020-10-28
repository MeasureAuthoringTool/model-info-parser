import PrimitiveParentPredicate from "../../src/collectionUtils/PrimitiveParentPredicate";
import DataType from "../../src/model/dataTypes/DataType";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";

describe("PrimitiveParentPredicate", () => {
  let primitiveParentEntity: EntityDefinition;
  let nonPrimitiveParentEntity: EntityDefinition;
  let noParentEntity: EntityDefinition;
  let builder: EntityDefinitionBuilder;

  beforeEach(() => {
    const primitiveType = DataType.getInstance("FHIR", "string", "/tmp");
    const nonPrimitiveType = DataType.getInstance("FHIR", "Type2", "/tmp");

    builder = new EntityDefinitionBuilder();
    builder.parentType = primitiveType;
    primitiveParentEntity = builder.buildEntityDefinition();

    builder = new EntityDefinitionBuilder();
    builder.parentType = nonPrimitiveType;
    nonPrimitiveParentEntity = builder.buildEntityDefinition();

    builder = new EntityDefinitionBuilder();
    builder.parentType = null;
    noParentEntity = builder.buildEntityDefinition();
  });

  it("should return true if the EntityDefinition is primitive", () => {
    const predicate1 = new PrimitiveParentPredicate();
    expect(predicate1.evaluate(primitiveParentEntity)).toBeTrue();
    expect(predicate1.evaluate(nonPrimitiveParentEntity)).toBeFalse();
    expect(predicate1.evaluate(noParentEntity)).toBeFalse();
  });
});
