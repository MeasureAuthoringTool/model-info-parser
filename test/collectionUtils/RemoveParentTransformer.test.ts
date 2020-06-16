import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import RemoveParentTransformer from "../../src/collectionUtils/RemoveParentTransformer";

describe("RemoveParentTransformer", () => {
  const transformer = new RemoveParentTransformer();
  let entityBuilder: EntityDefinitionBuilder;
  let entity: EntityDefinition;
  let noParentEntity: EntityDefinition;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entity = entityBuilder.buildEntityDefinition();

    entityBuilder.parentType = null;
    noParentEntity = entityBuilder.buildEntityDefinition();
  });

  it("should return the same EntityDefinition instance if no parent exists", () => {
    expect(noParentEntity.parentDataType).toBeNull();
    const result = transformer.transform(noParentEntity);
    expect(result).toBe(noParentEntity);
    expect(noParentEntity.parentDataType).toBe(null);
  });

  it("should return a copy of the EntityDefinition with no parent if parent exists", () => {
    expect(entity.parentDataType).not.toBeNull();
    const result = transformer.transform(entity);
    expect(result).not.toBe(entity);
    expect(entity.parentDataType).not.toBeNull();
    expect(result.parentDataType).toBe(null);
  });
});
