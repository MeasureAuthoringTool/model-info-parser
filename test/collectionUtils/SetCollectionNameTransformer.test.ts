import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import SetCollectionNameTransformer from "../../src/collectionUtils/SetCollectionNameTransformer";

describe("SetCollectionNameTransformer", () => {
  const newCollectionName = "new_col_name";
  const transformer = new SetCollectionNameTransformer(newCollectionName);
  let entityBuilder: EntityDefinitionBuilder;
  let entity: EntityDefinition;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entity = entityBuilder.buildEntityDefinition();
  });

  it("should return a copy of the EntityDefinition with the collectionName set to the specified value", () => {
    expect(entity.collectionName).toBeNull();
    const result = transformer.transform(entity);
    expect(result).not.toBe(entity);
    expect(result.collectionName).not.toBeNull();
    expect(result.collectionName).toBe(newCollectionName);
  });
});
