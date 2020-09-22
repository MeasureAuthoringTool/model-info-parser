import {
  KitchenSink,
  PrimitiveUrl,
  CodeableConcept,
  PrimitiveString,
  Coding,
  PrimitiveCode,
  PrimitiveTime,
  PrimitiveBoolean,
  IElement,
} from "../fixture/generatedTypeScript/fhir";

describe("Test cloning of the generated classes", () => {
  let sink: KitchenSink;

  beforeEach(() => {
    sink = new KitchenSink();
    sink.system = "theSystem";
    sink.url = PrimitiveUrl.parsePrimitive("theUrl");
    sink.singleCode = new CodeableConcept();
    sink.singleCode.text = PrimitiveString.parsePrimitive("theCode");
    const coding1 = new Coding();
    coding1.code = PrimitiveCode.parsePrimitive("code1");
    const coding2 = new Coding();
    coding2.code = PrimitiveCode.parsePrimitive("code2");
    sink.coding = [coding1, coding2];
    sink.times = [
      PrimitiveTime.parsePrimitive("time1"),
      PrimitiveTime.parsePrimitive("time2"),
    ];
    sink.options = PrimitiveBoolean.parsePrimitive(false);
  });

  it("should create a new object, identical to the original", () => {
    const newSink = sink.clone();
    expect(newSink).not.toBe(sink);
    expect(newSink).toEqual(sink);
  });

  it("should clone primitive objects", () => {
    const extension: IElement = {
      id: "theId",
      extension: [
        {
          valueBoolean: false,
        },
      ],
    };

    const original = PrimitiveBoolean.parsePrimitive(false, extension);

    const clone = original.clone();

    expect(clone.value).toBeFalse();
    expect(clone.id).toBe("theId");
    expect(clone.extension).toBeArrayOfSize(1);
    if (clone.extension) {
      const extensionResult = clone.extension[0];
      if (PrimitiveBoolean.isPrimitiveBoolean(extensionResult.value)) {
        expect(extensionResult.value.value).toBeFalse();
      } else {
        expect.fail("Extension is wrong type");
      }
    }
  });
});
