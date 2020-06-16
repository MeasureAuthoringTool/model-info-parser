import { getMongoidPrimitive } from "../../../src/templates/helpers/templateHelpers";

describe("templateHelpers", () => {
  describe("getMongoidPrimitive()", () => {
    test("Should return equivalent mongoid compatible primitive", () => {
      expect(getMongoidPrimitive("String")).toEqual("String");
      expect(getMongoidPrimitive("Boolean")).toEqual("Boolean");
      expect(getMongoidPrimitive("Date")).toEqual("Date");
      expect(getMongoidPrimitive("DateTime")).toEqual("DateTime");
      expect(getMongoidPrimitive("Decimal")).toEqual("BigDecimal");
      expect(getMongoidPrimitive("Integer")).toEqual("Integer");
      expect(getMongoidPrimitive("Time")).toEqual("Time");
    });
  });
});
