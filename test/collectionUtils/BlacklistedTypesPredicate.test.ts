import BlacklistedTypesPredicate from "../../src/collectionUtils/BlacklistedTypesPredicate";
import DataType from "../../src/model/dataTypes/DataType";

describe("BlacklistedTypesPredicate", () => {
  it("should return true if the DataType matches a blacklisted type", () => {
    const predicate = BlacklistedTypesPredicate.INSTANCE;
    const blacklistedType = DataType.getInstance(
      "FHIR",
      "allowedUnits",
      "/tmp"
    );
    const regularDataType = DataType.getInstance("FHIR", "Account", "/tmp");
    expect(predicate.evaluate(regularDataType)).toBeFalse();
    expect(predicate.evaluate(blacklistedType)).toBeTrue();
  });
});
