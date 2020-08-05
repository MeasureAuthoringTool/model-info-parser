import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import SetParentTransformer from "../../src/collectionUtils/SetParentTransformer";
import SystemBoolean from "../../src/model/dataTypes/system/SystemBoolean";

describe("SetParentTransformer", () => {
  let nullTransformer: SetParentTransformer;
  let booleanTransformer: SetParentTransformer;
  let entityBuilder: EntityDefinitionBuilder;
  let entity: EntityDefinition;
  let noParentEntity: EntityDefinition;

  beforeEach(() => {
    nullTransformer = new SetParentTransformer(null);
    booleanTransformer = new SetParentTransformer(SystemBoolean);

    entityBuilder = new EntityDefinitionBuilder();
    entity = entityBuilder.buildEntityDefinition();

    entityBuilder.parentType = null;
    noParentEntity = entityBuilder.buildEntityDefinition();
  });

  it("should return the same EntityDefinition instance if parent and target parent are both null", () => {
    expect(noParentEntity.parentDataType).toBeNull();
    const result = nullTransformer.transform(noParentEntity);
    expect(result).toBe(noParentEntity);
    expect(noParentEntity.parentDataType).toBeNull();
  });

  it("should return the same EntityDefinition instance if parent and target parent are same instance", () => {
    entityBuilder = new EntityDefinitionBuilder();
    entityBuilder.parentType = SystemBoolean;
    entity = entityBuilder.buildEntityDefinition();

    expect(entity.parentDataType).toBe(SystemBoolean);
    const result = booleanTransformer.transform(entity);
    expect(result).toBe(entity);
    expect(entity.parentDataType).toBe(SystemBoolean);
  });

  it("should return a copy of the EntityDefinition with null parent", () => {
    expect(entity.parentDataType).not.toBeNull();
    const result = nullTransformer.transform(entity);
    expect(result).not.toBe(entity);
    expect(entity.parentDataType).not.toBeNull();
    expect(result.parentDataType).toBeNull();
  });

  it("should return a new instance with a new parent", () => {
    expect(entity.parentDataType).not.toBeNull();
    expect(entity.parentDataType).not.toBe(SystemBoolean);

    const result = booleanTransformer.transform(entity);

    expect(result).not.toBe(entity);
    expect(entity.parentDataType).not.toBe(SystemBoolean);
    expect(result.parentDataType).toBe(SystemBoolean);
  });
});
