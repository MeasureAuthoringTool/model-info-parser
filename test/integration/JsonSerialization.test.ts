import {
  Bundle,
  BundleEntry,
  Coding,
  Extension,
  KitchenSink,
  PrimitiveBoolean,
  PrimitiveCode,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUri,
  ResourceChild,
} from "../fixture/generatedTypeScript/fhir";

describe("Testing the JSON serialization logic of a generated class", () => {
  it("should serialize a simple object", () => {
    const input = new Coding();
    input.version = new PrimitiveString();
    input.version.value = "versionX";
    input.system = new PrimitiveUri(); // no value set
    input.code = undefined; // explicitly set to undefined
    // display and userSelected are undefined implicitly

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "version": "versionX"
}`);
  });

  it("should serialize primitive extensions", () => {
    const input = new Coding();
    input.version = new PrimitiveString();
    input.version.value = "versionX";
    input.version.id = "versionId";

    const extension = new Extension();
    extension.value = PrimitiveString.parsePrimitive("extensionValue");
    extension.url = PrimitiveUri.parsePrimitive("someUrl");

    input.version.extension = [extension];

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "version": "versionX",
  "_version": {
    "id": "versionId",
    "extension": [
      {
        "url": "someUrl",
        "valueString": "extensionValue"
      }
    ]
  }
}`);
  });

  it("should serialize arrays of complex objects", () => {
    const input = new KitchenSink();
    input.system = "systemString";

    const coding1 = new Coding();
    coding1.code = PrimitiveCode.parsePrimitive("code1");

    const coding2 = new Coding();
    coding2.code = PrimitiveCode.parsePrimitive("code2");

    input.coding = [coding1, coding2];

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "system": "systemString",
  "coding": [
    {
      "code": "code1"
    },
    {
      "code": "code2"
    }
  ]
}`);
  });

  it("should serialize arrays with no primitive extensions", () => {
    const input = new KitchenSink();

    const time1 = PrimitiveTime.parsePrimitive("time1");
    const time2 = PrimitiveTime.parsePrimitive("time2");

    input.times = [time1, time2];

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "times": [
    "time1",
    "time2"
  ]
}`);
  });

  it("should serialize arrays with primitive extensions", () => {
    const input = new KitchenSink();

    const time1 = PrimitiveTime.parsePrimitive("time1");
    const time2 = PrimitiveTime.parsePrimitive("time2");

    const extension = new Extension();
    extension.value = PrimitiveString.parsePrimitive("extensionValue");
    extension.url = PrimitiveUri.parsePrimitive("someUrl");

    time2.extension = [extension];
    time2.id = "time2Id";

    input.times = [time1, time2];

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "times": [
    "time1",
    "time2"
  ],
  "_times": [
    null,
    {
      "id": "time2Id",
      "extension": [
        {
          "url": "someUrl",
          "valueString": "extensionValue"
        }
      ]
    }
  ]
}`);
  });

  it("should serialize Resource subtypes", () => {
    const input: BundleEntry = new BundleEntry();
    const resourceChild = new ResourceChild();
    resourceChild.resourceType = "ResourceChild";
    resourceChild.boolVal = PrimitiveBoolean.parsePrimitive(true);
    input.resource = resourceChild;

    const result = JSON.stringify(input, null, 2);
    expect(result).toBe(`{
  "resource": {
    "resourceType": "ResourceChild",
    "boolVal": true
  }
}`);
  });

  it("should initialize Bundle's resource type by default", () => {
    const resource: Bundle = new Bundle();
    expect(resource.resourceType).toEqual("Bundle");
  });

  it("should initialize ResourceChild's resource type by default", () => {
    const resource: ResourceChild = new ResourceChild();
    expect(resource.resourceType).toEqual("ResourceChild");
  });
});
