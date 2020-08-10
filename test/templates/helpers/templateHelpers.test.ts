import Handlebars, {
  getMongoidPrimitive,
  getTypeScriptPrimitive,
  getTypeScriptInterfacePrimitive,
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

  describe("getTypeScriptPrimitive()", () => {
    it("should return equivalent TypeScript compatible primitive type", () => {
      expect(getTypeScriptPrimitive("base64Binary")).toEqual("string");
      expect(getTypeScriptPrimitive("boolean")).toEqual("boolean");
      expect(getTypeScriptPrimitive("canonical")).toEqual("string");
      expect(getTypeScriptPrimitive("code")).toEqual("string");
      expect(getTypeScriptPrimitive("date")).toEqual("string");
      expect(getTypeScriptPrimitive("dateTime")).toEqual("string");
      expect(getTypeScriptPrimitive("decimal")).toEqual("number");
      expect(getTypeScriptPrimitive("id")).toEqual("string");
      expect(getTypeScriptPrimitive("instant")).toEqual("string");
      expect(getTypeScriptPrimitive("integer")).toEqual("number");
      expect(getTypeScriptPrimitive("markdown")).toEqual("string");
      expect(getTypeScriptPrimitive("oid")).toEqual("string");
      expect(getTypeScriptPrimitive("positiveInt")).toEqual("number");
      expect(getTypeScriptPrimitive("question")).toEqual("string");
      expect(getTypeScriptPrimitive("string")).toEqual("string");
      expect(getTypeScriptPrimitive("time")).toEqual("string");
      expect(getTypeScriptPrimitive("unsignedInt")).toEqual("number");
      expect(getTypeScriptPrimitive("uri")).toEqual("string");
      expect(getTypeScriptPrimitive("url")).toEqual("string");
      expect(getTypeScriptPrimitive("uuid")).toEqual("string");
      expect(getTypeScriptPrimitive("xhtml")).toEqual("string");
    });
  });

  describe("getTypeScriptInterfacePrimitive()", () => {
    it("should return equivalent TypeScript compatible primitive type", () => {
      expect(getTypeScriptInterfacePrimitive("IPrimitiveBase64Binary")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveBoolean")).toEqual(
        "boolean"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveCanonical")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveCode")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveDate")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveDateTime")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveDecimal")).toEqual(
        "number"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveId")).toEqual("string");
      expect(getTypeScriptInterfacePrimitive("IPrimitiveInstant")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveInteger")).toEqual(
        "number"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveMarkdown")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveOid")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitivePositiveInt")).toEqual(
        "number"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveQuestion")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveString")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveTime")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveUnsignedInt")).toEqual(
        "number"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveUri")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveUrl")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveUuid")).toEqual(
        "string"
      );
      expect(getTypeScriptInterfacePrimitive("IPrimitiveXhtml")).toEqual(
        "string"
      );
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

  describe("toModelVariableName()", () => {
    it("should update reserved keywords with and leave non-reserved keywords alone", () => {
      const source = "hey {{ toModelVariableName this }}";
      const template = Handlebars.compile(source);

      expect(template("someVar")).toBe("hey someVar");
      expect(template("validated")).toBe("hey validated_local");
      expect(template("collection")).toBe("hey collection_local");
      expect(template("class")).toBe("hey class_local");
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
      systemType = DataType.getInstance("System", "String", "/tmp");
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

  describe("ifEquals", () => {
    const resource = { variableName: "id" };
    const nonResource = { variableName: "text" };
    let template: Handlebars.TemplateDelegate;

    beforeEach(() => {
      const source =
        "{{# ifEquals this.variableName 'id'}}fhirId{{ else }}text{{/ ifEquals }}";
      template = Handlebars.compile(source);
    });

    it("should render the truthy condition if the variableName is 'id'", () => {
      expect(template(resource)).toBe("fhirId");
      expect(template(nonResource)).toBe("text");
    });
  });

  describe("getRobyDoc", () => {
    it("should return namespace/datatype.rb string", () => {
      const accountType = DataType.getInstance("FHIR", "Account", "/tmp");
      const accountCoverageType = DataType.getInstance(
        "FHIR",
        "AccountCoverage",
        "/tmp"
      );

      const source = "{{# getRobyDoc this}}{{/ getRobyDoc}}";
      const template = Handlebars.compile(source);

      expect(template(accountType)).toBe("fhir/account.rb");
      expect(template(accountCoverageType)).toBe("fhir/account_coverage.rb");
    });
  });

  describe("jsonChoiceName", () => {
    it("should produce the json choice name from the variable name and type", () => {
      const source = "hey {{ jsonChoiceName this.varName this.typeName }}";
      const template = Handlebars.compile(source);

      expect(
        template({
          varName: "var",
          typeName: "type",
        })
      ).toBe("hey varType");
    });
  });

  describe("trimInterfaceName", () => {
    it("should trim the 'I' and 'Primitive' prefixes from an interface type name", () => {
      const source =
        "hey {{ trimInterfaceName name1 }} {{ trimInterfaceName name2 }} {{ trimInterfaceName name3 }} {{ trimInterfaceName name4 }}";
      const template = Handlebars.compile(source);

      expect(
        template({
          name1: "TypeName",
          name2: "ITypeName",
          name3: "PrimitiveName",
          name4: "IPrimitiveName",
        })
      ).toBe("hey TypeName TypeName Name Name");
    });
  });

  describe("trimPrimitiveName", () => {
    it("should trim the 'IPrimitive' and 'Primitive' prefixes a type name", () => {
      const source =
        "hey {{ trimPrimitiveName name1 }} {{ trimPrimitiveName name2 }} {{ trimPrimitiveName name3 }} {{ trimPrimitiveName name4 }}";
      const template = Handlebars.compile(source);

      expect(
        template({
          name1: "TypeName",
          name2: "ITypeName",
          name3: "PrimitiveName",
          name4: "IPrimitiveName",
        })
      ).toBe("hey TypeName ITypeName Name Name");
    });
  });
});
