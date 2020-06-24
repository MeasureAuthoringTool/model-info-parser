import {getMongoidPrimitive} from "../../../src/templates/helpers/templateHelpers";
import {getMongoosePrimitive} from "../../../src/templates/mongoose/templateHelpers";

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

  // describe("getMongoosePrimitive()", () => {
  //   test("Should return equivalent mongoose compatible primitive", () => {
  //     expect(getMongoosePrimitive("base64Binary")).toEqual("String");
  //     expect(getMongoosePrimitive("boolean")).toEqual("Boolean");
  //     expect(getMongoosePrimitive("canonical")).toEqual("String");
  //     expect(getMongoosePrimitive("code")).toEqual("String");
  //     expect(getMongoosePrimitive("date")).toEqual("Date");
  //     expect(getMongoosePrimitive("dateTime")).toEqual("DateTime");
  //     expect(getMongoosePrimitive("decimal")).toEqual("BigDecimal");
  //     expect(getMongoosePrimitive("id")).toEqual("String");
  //     expect(getMongoosePrimitive("instant")).toEqual("DateTime");
  //     expect(getMongoosePrimitive("integer")).toEqual("Integer");
  //     expect(getMongoosePrimitive("markdown")).toEqual("String");
  //     expect(getMongoosePrimitive("oid")).toEqual("String");
  //     expect(getMongoosePrimitive("positiveInt")).toEqual("Integer");
  //     expect(getMongoosePrimitive("question")).toEqual("String");
  //     expect(getMongoosePrimitive("string")).toEqual("String");
  //     expect(getMongoosePrimitive("time")).toEqual("Time");
  //     expect(getMongoosePrimitive("unsignedInt")).toEqual("Integer");
  //     expect(getMongoosePrimitive("uri")).toEqual("String");
  //     expect(getMongoosePrimitive("url")).toEqual("String");
  //     expect(getMongoosePrimitive("uuid")).toEqual("String");
  //     expect(getMongoosePrimitive("xhtml")).toEqual("String");
  //   });
  // });
});
