import Handlebars, {
  getMongoidPrimitive,
} from "../../../src/templates/helpers/templateHelpers";
import MemberVariable from "../../../src/model/dataTypes/MemberVariable";
import DataType from "../../../src/model/dataTypes/DataType";

describe("templateHelpers", () => {
  describe("getMongoidPrimitive()", () => {
    it("should return equivalent mongoid compatible primitive", () => {
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

  describe("isReservedKeyword()", () => {
    it("should not interfere with basic templates", () => {
      const template = Handlebars.compile("hello");
      expect(template({})).toBe("hello");
    });

    it("should execute the falsy condition if input is not a reserved keyword", () => {
      const input = "somethingNotReserved";
      const source =
        "{{# isReservedKeyword this }}reserved{{ else }}not reserved{{/ isReservedKeyword }}";
      const template = Handlebars.compile(source);
      expect(template(input)).toBe("not reserved");
    });

    it("should execute the truthy condition if input is a reserved keyword", () => {
      const source =
        "{{# isReservedKeyword this }}reserved{{ else }}not reserved{{/ isReservedKeyword }}";
      const template = Handlebars.compile(source);
      expect(template("validated")).toBe("reserved");
      expect(template("collection")).toBe("reserved");
    });
  });

  describe("prefixVariableName()", () => {
    it("should prefix reserved keywords with an underscore and leave non-reserved keywords alone", () => {
      const source = "hey {{ prefixVariableName this }}";
      const template = Handlebars.compile(source);

      expect(template("someVar")).toBe("hey someVar");
      expect(template("validated")).toBe("hey _validated");
      expect(template("collection")).toBe("hey _collection");
    });
  });

  describe("hasReservedKeywords()", () => {
    let regularMember: MemberVariable;
    let validatedMember: MemberVariable;
    let collectionMember: MemberVariable;
    let template: Handlebars.TemplateDelegate;

    beforeEach(() => {
      const dataType = DataType.getInstance("ns", "type1", "/tmp");
      regularMember = new MemberVariable(dataType, "not reserved");
      validatedMember = new MemberVariable(dataType, "validated");
      collectionMember = new MemberVariable(dataType, "collection");

      const source =
        "{{# hasReservedKeywords this }}reserved{{ else }}not reserved{{/ hasReservedKeywords }}";
      template = Handlebars.compile(source);
    });

    it("should render the truthy condition if member has a member with reserved keyword", () => {
      expect(template([regularMember])).toBe("not reserved");
      expect(template([validatedMember])).toBe("reserved");
      expect(template([collectionMember])).toBe("reserved");
    });
  });

  describe("isPrimitiveType", () => {
    let primitiveType: DataType;
    let nonPrimitiveType: DataType;
    let template: Handlebars.TemplateDelegate;

    beforeEach(() => {
      primitiveType = DataType.getInstance("FHIR", "string", "/tmp");
      nonPrimitiveType = DataType.getInstance("ns", "type1", "/tmp");

      const source =
        "{{# isPrimitiveType this }}primitive{{ else }}not primitive{{/ isPrimitiveType }}";
      template = Handlebars.compile(source);
    });

    it("should render the truthy condition if DataType is primitive", () => {
      expect(template(nonPrimitiveType)).toBe("not primitive");
      expect(template(primitiveType)).toBe("primitive");
    });
  });

  describe("isSystemType", () => {
    let systemType: DataType;
    let nonSystemType: DataType;
    let template: Handlebars.TemplateDelegate;

    beforeEach(() => {
      systemType = DataType.getInstance("System", "string", "/tmp");
      nonSystemType = DataType.getInstance("ns", "type1", "/tmp");

      const source =
        "{{# isSystemType this }}system{{ else }}not system{{/ isSystemType }}";
      template = Handlebars.compile(source);
    });

    it("should render the truthy condition if DataType is system", () => {
      expect(template(nonSystemType)).toBe("not system");
      expect(template(systemType)).toBe("system");
    });
  });

  describe("getRobyDoc", () => {
    it("should return namespace/datatype.rb string", () => {
      const accountType = DataType.getInstance("FHIR", "Account", "/tmp");
      const accountCoverageType = DataType.getInstance("FHIR", "AccountCoverage", "/tmp");

      const source = "{{# getRobyDoc this}}{{/ getRobyDoc}}";
      const template = Handlebars.compile(source);

      expect(template(accountType)).toBe("fhir/account.rb");
      expect(template(accountCoverageType)).toBe("fhir/account_coverage.rb");
    });
  });
});
