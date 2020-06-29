import {
  eq,
  getMongoosePrimitive,
  isMongooseSchemaFunctionRequired,
  isMongooseSchemaFunctionIdRequired
} from "../../../src/templates/helpers/templateHelpers";

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

  describe("isMongooseSchemaFunctionRequired", () => {
    test("positive", () => {
      expect(isMongooseSchemaFunctionRequired("DomainResource")).toBeTrue();
      expect(isMongooseSchemaFunctionRequired("Resource")).toBeTrue();
      expect(isMongooseSchemaFunctionRequired("BackboneElement")).toBeTrue();
      expect(isMongooseSchemaFunctionRequired("Element")).toBeTrue();
      expect(isMongooseSchemaFunctionRequired("Quantity")).toBeTrue();
      expect(isMongooseSchemaFunctionRequired("ElementDefinition")).toBeTrue();
    });
    test("negative", () => {
      expect(isMongooseSchemaFunctionRequired("NotDomainResource")).toBeFalse();
    });
  });

  describe("isMongooseSchemaFunctionIdRequired", () => {
    test("positive", () => {
      expect(isMongooseSchemaFunctionIdRequired("Resource")).toBeTrue();
      expect(isMongooseSchemaFunctionIdRequired("Element")).toBeTrue();
    });
    test("negative", () => {
      expect(isMongooseSchemaFunctionIdRequired("SomethingElse")).toBeFalse();
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
