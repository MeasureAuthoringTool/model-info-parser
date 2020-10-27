import IsPrimitiveEntityDefinitionPredicate from "../../src/collectionUtils/IsPrimitiveEntityDefinitionPredicate";
import DataType from "../../src/model/dataTypes/DataType";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";

describe("IsPrimitiveEntityDefinitionPredicate", () => {
  let primitiveEntity: EntityDefinition;
  let nonPrimitiveEntity: EntityDefinition;
  let builder: EntityDefinitionBuilder;

  beforeEach(() => {
    const primitiveType = DataType.getInstance("FHIR", "string", "/tmp");
    const nonPrimitiveType = DataType.getInstance("FHIR", "Type2", "/tmp");

    builder = new EntityDefinitionBuilder();
    builder.dataType = primitiveType;
    primitiveEntity = builder.buildEntityDefinition();

    builder = new EntityDefinitionBuilder();
    builder.dataType = nonPrimitiveType;
    nonPrimitiveEntity = builder.buildEntityDefinition();
  });

  it("should return true if the EntityDefinition is primitive", () => {
    const predicate1 = new IsPrimitiveEntityDefinitionPredicate();
    expect(predicate1.evaluate(primitiveEntity)).toBeTrue();
    expect(predicate1.evaluate(nonPrimitiveEntity)).toBeFalse();
  });
});
