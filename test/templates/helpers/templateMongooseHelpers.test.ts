import {
  eq,
  getMongoosePrimitive,
  isSchemaFunctionIdRequired,
  isSchemaFunctionRequired,
} from "../../../src/templates/mongoose/templateHelpers";

describe("templateMongooseHelpers", () => {
  describe("getMongoosePrimitive()", () => {
    test("Should return equivalent mongoose compatible primitive", () => {
      expect(getMongoosePrimitive("base64Binary")).toEqual("String");
      expect(getMongoosePrimitive("boolean")).toEqual("Boolean");
      expect(getMongoosePrimitive("canonical")).toEqual("String");
      expect(getMongoosePrimitive("code")).toEqual("String");
      expect(getMongoosePrimitive("date")).toEqual("Date");
      expect(getMongoosePrimitive("dateTime")).toEqual("Date");
      expect(getMongoosePrimitive("decimal")).toEqual("Number");
      expect(getMongoosePrimitive("id")).toEqual("String");
      expect(getMongoosePrimitive("instant")).toEqual("Date");
      expect(getMongoosePrimitive("integer")).toEqual("Number");
      expect(getMongoosePrimitive("markdown")).toEqual("String");
      expect(getMongoosePrimitive("oid")).toEqual("String");
      expect(getMongoosePrimitive("positiveInt")).toEqual("Number");
      expect(getMongoosePrimitive("question")).toEqual("String");
      expect(getMongoosePrimitive("string")).toEqual("String");
      expect(getMongoosePrimitive("time")).toEqual("Date");
      expect(getMongoosePrimitive("unsignedInt")).toEqual("Number");
      expect(getMongoosePrimitive("uri")).toEqual("String");
      expect(getMongoosePrimitive("url")).toEqual("String");
      expect(getMongoosePrimitive("uuid")).toEqual("String");
      expect(getMongoosePrimitive("xhtml")).toEqual("String");
    });
  });

  describe("isSchemaFunctionRequired", () => {
    test("positive", () => {
      expect(isSchemaFunctionRequired("DomainResource")).toBeTrue();
      expect(isSchemaFunctionRequired("Resource")).toBeTrue();
      expect(isSchemaFunctionRequired("BackboneElement")).toBeTrue();
      expect(isSchemaFunctionRequired("Element")).toBeTrue();
      expect(isSchemaFunctionRequired("Quantity")).toBeTrue();
      expect(isSchemaFunctionRequired("ElementDefinition")).toBeTrue();
    });
    test("negative", () => {
      expect(isSchemaFunctionRequired("NotDomainResource")).toBeFalse();
    });
  });

  describe("isSchemaFunctionIdRequired", () => {
    test("positive", () => {
      expect(isSchemaFunctionIdRequired("Resource")).toBeTrue();
      expect(isSchemaFunctionIdRequired("Element")).toBeTrue();
    });
    test("negative", () => {
      expect(isSchemaFunctionRequired("SomethingElse")).toBeFalse();
    });
  });

  describe("eq", () => {
    test("positive", () => {
      expect(eq("one", "one")).toBeTrue();
      expect(eq("two", "two")).toBeTrue();
    });
    test("negative", () => {
      expect(eq("one", "One")).toBeFalse();
      expect(eq("one", "two")).toBeFalse();
    });
  });
});
