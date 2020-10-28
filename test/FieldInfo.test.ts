import {
  CodeableConcept,
  Coding,
  Extension,
  KitchenSink,
  PrimitiveBoolean,
  PrimitiveCanonical,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUrl,
} from "./fixture/generatedTypeScript/fhir";

describe("generated fieldInfo properties", () => {
  const { fieldInfo } = KitchenSink;

  it("should have a fully-populated array", () => {
    expect(fieldInfo).toBeArrayOfSize(9);
  });

  it("should inherit the fields from the parent type", () => {
    expect(fieldInfo[0].fieldName).toBe("id");
    expect(fieldInfo[0].isArray).toBeFalse();
    expect(fieldInfo[0].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[0].fieldType[0]).toBe(String);

    expect(fieldInfo[1].fieldName).toBe("extension");
    expect(fieldInfo[1].isArray).toBeTrue();
    expect(fieldInfo[1].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[1].fieldType[0]).toBe(Extension);
  });

  it("should include its own properties", () => {
    expect(fieldInfo[2].fieldName).toBe("system");
    expect(fieldInfo[2].isArray).toBeFalse();
    expect(fieldInfo[2].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[2].fieldType[0]).toBe(String);

    expect(fieldInfo[3].fieldName).toBe("url");
    expect(fieldInfo[3].isArray).toBeFalse();
    expect(fieldInfo[3].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[3].fieldType[0]).toBe(PrimitiveUrl);

    expect(fieldInfo[4].fieldName).toBe("version");
    expect(fieldInfo[4].isArray).toBeFalse();
    expect(fieldInfo[4].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[4].fieldType[0]).toBe(PrimitiveString);

    expect(fieldInfo[5].fieldName).toBe("singleCode");
    expect(fieldInfo[5].isArray).toBeFalse();
    expect(fieldInfo[5].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[5].fieldType[0]).toBe(CodeableConcept);

    expect(fieldInfo[6].fieldName).toBe("coding");
    expect(fieldInfo[6].isArray).toBeTrue();
    expect(fieldInfo[6].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[6].fieldType[0]).toBe(Coding);

    expect(fieldInfo[7].fieldName).toBe("times");
    expect(fieldInfo[7].isArray).toBeTrue();
    expect(fieldInfo[7].fieldType).toBeArrayOfSize(1);
    expect(fieldInfo[7].fieldType[0]).toBe(PrimitiveTime);

    expect(fieldInfo[8].fieldName).toBe("options");
    expect(fieldInfo[8].isArray).toBeFalse();
    expect(fieldInfo[8].fieldType).toBeArrayOfSize(3);
    expect(fieldInfo[8].fieldType[0]).toBe(PrimitiveBoolean);
    expect(fieldInfo[8].fieldType[1]).toBe(PrimitiveCanonical);
    expect(fieldInfo[8].fieldType[2]).toBe(Coding);
  });
});
