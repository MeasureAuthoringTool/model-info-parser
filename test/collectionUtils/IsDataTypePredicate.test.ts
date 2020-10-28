import IsDataTypePredicate from "../../src/collectionUtils/IsDataTypePredicate";
import DataType from "../../src/model/dataTypes/DataType";

describe("IsDataTypePredicate", () => {
  let dt1: DataType;
  let dt2: DataType;
  let dt3: DataType;

  beforeEach(() => {
    dt1 = DataType.getInstance("FHIR", "Type1", "/tmp");
    dt2 = DataType.getInstance("Core", "Type2", "/tmp");
    dt3 = DataType.getInstance("Other", "Type3", "/tmp");
  });

  it("should return true if the DataType has the matching namespace and typeName", () => {
    const predicate1 = new IsDataTypePredicate("FHIR", "Type1");
    expect(predicate1.evaluate(dt1)).toBeTrue();
    expect(predicate1.evaluate(dt2)).toBeFalse();
    expect(predicate1.evaluate(dt3)).toBeFalse();

    const predicate2 = new IsDataTypePredicate("Core", "Type2");
    expect(predicate2.evaluate(dt1)).toBeFalse();
    expect(predicate2.evaluate(dt2)).toBeTrue();
    expect(predicate2.evaluate(dt3)).toBeFalse();
  });
});
