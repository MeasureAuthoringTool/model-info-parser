import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import IsDataTypePredicate from "../../src/collectionUtils/IsDataTypePredicate";
import DataType from "../../src/model/dataTypes/DataType";
import RemoveImportsTransformer from "../../src/collectionUtils/RemoveImportsTransformer";

describe("RemoveImportsTransformer", () => {
  let entityBuilder: EntityDefinitionBuilder;
  let entityDef: EntityDefinition;
  let import1: DataType;
  let import2: DataType;

  beforeEach(() => {
    entityBuilder = new EntityDefinitionBuilder();
    entityDef = entityBuilder.buildEntityDefinition();
    [import1, import2] = entityDef.imports.dataTypes;
  });

  it("should remove the specified imports and return a new EntityDefinition", () => {
    const predicate = new IsDataTypePredicate(
      import1.namespace,
      import1.typeName
    );
    const transformer = new RemoveImportsTransformer(predicate);
    const result = transformer.transform(entityDef);
    expect(result).not.toBe(entityDef);
    expect(result.imports.dataTypes).toStrictEqual([import2]);
  });
});
