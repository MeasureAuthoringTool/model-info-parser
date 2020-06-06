import {
  getMongoidPrimitive,
  removeNamespace,
} from "../../../src/templates/helpers/templateHelpers";

describe("templateHelpers", () => {
  describe("getMongoidPrimitive()", () => {
    test("Should return equivalent mongoid compatible primitive", () => {
      expect(getMongoidPrimitive("base64Binary")).toEqual("String");
      expect(getMongoidPrimitive("boolean")).toEqual("Boolean");
      expect(getMongoidPrimitive("canonical")).toEqual("String");
      expect(getMongoidPrimitive("code")).toEqual("String");
      expect(getMongoidPrimitive("date")).toEqual("Date");
      expect(getMongoidPrimitive("dateTime")).toEqual("DateTime");
      expect(getMongoidPrimitive("decimal")).toEqual("BigDecimal");
      expect(getMongoidPrimitive("id")).toEqual("String");
      expect(getMongoidPrimitive("instant")).toEqual("DateTime");
      expect(getMongoidPrimitive("integer")).toEqual("Integer");
      expect(getMongoidPrimitive("markdown")).toEqual("String");
      expect(getMongoidPrimitive("oid")).toEqual("String");
      expect(getMongoidPrimitive("positiveInt")).toEqual("Integer");
      expect(getMongoidPrimitive("question")).toEqual("String");
      expect(getMongoidPrimitive("string")).toEqual("String");
      expect(getMongoidPrimitive("time")).toEqual("Time");
      expect(getMongoidPrimitive("unsignedInt")).toEqual("Integer");
      expect(getMongoidPrimitive("uri")).toEqual("String");
      expect(getMongoidPrimitive("url")).toEqual("String");
      expect(getMongoidPrimitive("uuid")).toEqual("String");
      expect(getMongoidPrimitive("xhtml")).toEqual("String");
    });
  });

  describe("removeNamespace()", () => {
    test("Should return type without namespace if type is qualified with namespace", () => {
      expect(removeNamespace("FHIR.Resource")).toEqual("Resource");
      expect(removeNamespace("DomainResource")).toEqual("DomainResource");
    });
  });
});
