import {
  eq,
  getMongooseSystemType,
  isMongooseSchemaFunctionRequired,
  isMongooseSchemaFunctionIdRequired,
} from "../../../src/templates/helpers/templateHelpers";

describe("templateMongooseHelpers", () => {
  describe("getMongoosePrimitive()", () => {
    test("Should return equivalent mongoose compatible primitive", () => {
      expect(getMongooseSystemType("base64Binary")).toEqual("String");
      expect(getMongooseSystemType("boolean")).toEqual("Boolean");
      expect(getMongooseSystemType("canonical")).toEqual("String");
      expect(getMongooseSystemType("code")).toEqual("String");
      expect(getMongooseSystemType("date")).toEqual("Date");
      expect(getMongooseSystemType("dateTime")).toEqual("Date");
      expect(getMongooseSystemType("decimal")).toEqual("Number");
      expect(getMongooseSystemType("id")).toEqual("String");
      expect(getMongooseSystemType("instant")).toEqual("Date");
      expect(getMongooseSystemType("integer")).toEqual("Number");
      expect(getMongooseSystemType("markdown")).toEqual("String");
      expect(getMongooseSystemType("oid")).toEqual("String");
      expect(getMongooseSystemType("positiveInt")).toEqual("Number");
      expect(getMongooseSystemType("question")).toEqual("String");
      expect(getMongooseSystemType("string")).toEqual("String");
      expect(getMongooseSystemType("time")).toEqual("Date");
      expect(getMongooseSystemType("unsignedInt")).toEqual("Number");
      expect(getMongooseSystemType("uri")).toEqual("String");
      expect(getMongooseSystemType("url")).toEqual("String");
      expect(getMongooseSystemType("uuid")).toEqual("String");
      expect(getMongooseSystemType("xhtml")).toEqual("String");
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
