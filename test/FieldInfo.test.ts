import {
  getFieldInfo,
  KitchenSink,
  PrimitiveString,
} from "./fixture/generatedTypeScript/fhir";

describe("generated fieldInfo properties", () => {
  const { fieldInfo } = KitchenSink;

  it("should have a fully-populated array", () => {
    expect(fieldInfo).toBeArrayOfSize(9);
  });

  it("should inherit the fields from the parent type", () => {
    expect(fieldInfo[0].fieldName).toBe("id");
    expect(fieldInfo[0].isArray).toBeFalse();
    expect(fieldInfo[0].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[0].fieldTypeNames[0]).toBe("SystemString");

    expect(fieldInfo[1].fieldName).toBe("extension");
    expect(fieldInfo[1].isArray).toBeTrue();
    expect(fieldInfo[1].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[1].fieldTypeNames[0]).toBe("Extension");
  });

  it("should include its own properties", () => {
    expect(fieldInfo[2].fieldName).toBe("system");
    expect(fieldInfo[2].isArray).toBeFalse();
    expect(fieldInfo[2].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[2].fieldTypeNames[0]).toBe("SystemString");

    expect(fieldInfo[3].fieldName).toBe("url");
    expect(fieldInfo[3].isArray).toBeFalse();
    expect(fieldInfo[3].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[3].fieldTypeNames[0]).toBe("PrimitiveUrl");

    expect(fieldInfo[4].fieldName).toBe("version");
    expect(fieldInfo[4].isArray).toBeFalse();
    expect(fieldInfo[4].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[4].fieldTypeNames[0]).toBe("PrimitiveString");

    expect(fieldInfo[5].fieldName).toBe("singleCode");
    expect(fieldInfo[5].isArray).toBeFalse();
    expect(fieldInfo[5].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[5].fieldTypeNames[0]).toBe("CodeableConcept");

    expect(fieldInfo[6].fieldName).toBe("coding");
    expect(fieldInfo[6].isArray).toBeTrue();
    expect(fieldInfo[6].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[6].fieldTypeNames[0]).toBe("Coding");

    expect(fieldInfo[7].fieldName).toBe("times");
    expect(fieldInfo[7].isArray).toBeTrue();
    expect(fieldInfo[7].fieldTypeNames).toBeArrayOfSize(1);
    expect(fieldInfo[7].fieldTypeNames[0]).toBe("PrimitiveTime");

    expect(fieldInfo[8].fieldName).toBe("options");
    expect(fieldInfo[8].isArray).toBeFalse();
    expect(fieldInfo[8].fieldTypeNames).toBeArrayOfSize(3);
    expect(fieldInfo[8].fieldTypeNames[0]).toBe("PrimitiveBoolean");
    expect(fieldInfo[8].fieldTypeNames[1]).toBe("PrimitiveCanonical");
    expect(fieldInfo[8].fieldTypeNames[2]).toBe("Coding");
  });
});

describe("Decorators", () => {
  it("should allow metadata to be collected from FHIR types", () => {
    const kitchenSink = new KitchenSink();
    kitchenSink.version = PrimitiveString.parsePrimitive("The Version");

    expect(KitchenSink.fieldList).toBeArrayOfSize(9);
    expect(KitchenSink.fieldList[0]).toBe("id");
    const idInfo = getFieldInfo(kitchenSink, "id");
    expect(idInfo?.fieldName).toBe("id");
    expect(idInfo?.fieldTypeNames).toStrictEqual(["SystemString"]);
    expect(idInfo?.isArray).toBeFalse();

    expect(KitchenSink.parentType).toBeDefined();
    expect(KitchenSink.parentType?.typeName).toBe("Element");

    expect(KitchenSink.fieldInfo).toBeArrayOfSize(9);
  });
});

describe("fhirTypeRef", () => {
  it("should dynamically retrieve an object's FHIR type at runtime", () => {
    const sink = new KitchenSink();
    expect(sink.fhirTypeRef).toBe(KitchenSink);
  });
});
