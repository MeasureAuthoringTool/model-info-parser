import { allTypeNames, lookupType } from "./fixture/generatedTypeScript/fhir";

describe("lookupType", () => {
  it("Should load all types without circular dependency issues", () => {
    expect(allTypeNames.length).toBeGreaterThan(0);
    allTypeNames.forEach((typeName) => {
      const typeReference = lookupType(typeName);
      if (!typeReference) {
        throw new Error(`Type ${typeName} not found`);
      }
      expect(typeReference.namespace).toBe("FHIR");
    });
  });
});
