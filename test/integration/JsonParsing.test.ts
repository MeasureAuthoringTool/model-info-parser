import {
  PrimitiveUri,
  IElement,
  IExtension,
  Extension,
  isPrimitiveBoolean,
  IKitchenSink,
  KitchenSink,
  PrimitiveTime, Coding,
} from "../fixture/generatedTypeScript/fhir";

describe("Testing the Parsing logic of a generated class", () => {
  function assertExtension(extensions?: Array<Extension>): void {
    expect(extensions).toBeArrayOfSize(1);
    const [extension] = extensions as Array<Extension>;
    expect(isPrimitiveBoolean(extension.value)).toBeTrue();
    if (isPrimitiveBoolean(extension.value)) {
      expect(extension.value.value).toBeTrue();
    }
  }

  it("should work around any circular dependencies", () => {
    const element: IElement = { id: "val" };
    expect(element.id).toBe("val");

    const extension: IExtension = { valueString: "valString" };
    expect(extension.valueString).toBe("valString");
  });

  it("should parse primitive JSON", () => {
    const uri = PrimitiveUri.parsePrimitive("someVal");
    expect(uri.value).toBe("someVal");
  });

  it("should parse primitive JSON with extensions", () => {
    const extension: IElement = {
      id: "extensionId",
      extension: [
        {
          id: "idOfExtension",
          url: "someUrl",
          valueBoolean: true,
        },
      ],
    };

    const uri = PrimitiveUri.parsePrimitive("someVal", extension);
    expect(uri.value).toBe("someVal");
    expect(uri.id).toBe("extensionId");
    expect(uri.extension).toBeDefined();
    assertExtension(uri.extension);
    const extensionArray = uri.extension as Array<Extension>;
    const [extensionResult] = extensionArray;

    expect(extensionResult.url?.value).toBe("someUrl");
    expect(extensionResult.id).toBe("idOfExtension");
    expect(extensionResult.value).toBeDefined();

    expect(isPrimitiveBoolean(extensionResult.value)).toBeTrue();
    if (isPrimitiveBoolean(extensionResult.value)) {
      expect(extensionResult.value.value).toBeTrue();
    }
  });

  it("should parse complex FHIR JSON", () => {
    const json: IKitchenSink = {
      system: "123",
      url: "http://something",
      times: ["time1", "time2"],
      singleCode: {
        text: "someCode"
      },
      coding: [{
        version: "theVersion"
      }]
    };

    const result = KitchenSink.parse(json);
    expect(result).toBeDefined();
    expect(result.system).toBe("123");
    expect(result.url?.value).toBe("http://something");
    expect(result.times).toBeArrayOfSize(2);
    const [time1, time2] = result.times as Array<PrimitiveTime>;
    expect(time1.value).toBe("time1");
    expect(time2.value).toBe("time2");
    expect(result.singleCode?.text?.value).toBe("someCode");
    expect(result.coding).toBeArrayOfSize(1);
    const [coding1] = result.coding as Array<Coding>;
    expect(coding1.version?.value).toBe("theVersion");
  });

  it("should handle primitive extensions", () => {
    const json: IKitchenSink = {
      url: "http://something",
      _url: {
        id: "urlId",
        extension: [
          {
            valueBoolean: true,
          },
        ],
      },
      times: ["time1", "time2"],
      _times: [
        null,
        {
          id: "time2Id",
          extension: [
            {
              valueBoolean: true,
            },
          ],
        },
      ],
    };

    const result = KitchenSink.parse(json);

    expect(result.url?.value).toBe("http://something");
    expect(result.url?.id).toBe("urlId");
    assertExtension(result.url?.extension);
    expect(result.times).toBeArrayOfSize(2);
    const [time1, time2] = result.times as Array<PrimitiveTime>;
    expect(time1.value).toBe("time1");
    expect(time2.value).toBe("time2");
    expect(time1.id).toBeUndefined();
    expect(time2.id).toBe("time2Id");
    assertExtension(time2.extension);
  });
});
