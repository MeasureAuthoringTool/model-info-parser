import "jest-extended";
import HasParentPredicate from "../../src/collectionUtils/HasParentPredicate";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";

describe("HasParentPredicate", () => {
  let hasParentEntity: EntityDefinition;
  let noParentEntity: EntityDefinition;
  let builder: EntityDefinitionBuilder;

  beforeEach(() => {
    builder = new EntityDefinitionBuilder();
    hasParentEntity = builder.buildEntityDefinition();

    builder = new EntityDefinitionBuilder();
    builder.parentType = null;
    noParentEntity = builder.buildEntityDefinition();
  });

  it("should return true if the EntityDefinition has no parent", () => {
    const predicate = new HasParentPredicate();
    expect(predicate.evaluate(hasParentEntity)).toBeTrue();
    expect(predicate.evaluate(noParentEntity)).toBeFalse();
  });
});
