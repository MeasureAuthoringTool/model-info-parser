import {
  normalizeElementTypeName,
  normalizeTypeName,
  jsonChoiceName,
} from "../src/utils";
import { convertPrimitiveName } from "../src/model/dataTypes/primitiveDataTypes";

describe("utils", () => {
  describe("normalizeElementTypeName()", () => {
    it("throws an error on empty string", () => {
      expect(() => {
        normalizeElementTypeName("");
      }).toThrowError("Invalid elementType encountered: ");
    });

    it("throws an error on string with no period", () => {
      expect(() => {
        normalizeElementTypeName("foo");
      }).toThrowError("Invalid elementType encountered: foo");
    });

    it("handles scenarios with only 1 period", () => {
      expect(normalizeElementTypeName("foo.bar")).toStrictEqual(["foo", "bar"]);
      expect(normalizeElementTypeName("foo.")).toStrictEqual(["foo", ""]);
      expect(normalizeElementTypeName(".bar")).toStrictEqual(["", "bar"]);
    });

    it("handles scenarios with multiple periods", () => {
      expect(normalizeElementTypeName("foo.bar.baz")).toStrictEqual([
        "foo",
        "barbaz",
      ]);
      expect(normalizeElementTypeName("foo.bar.baz.bot")).toStrictEqual([
        "foo",
        "barbazbot",
      ]);
    });

    it("converts primitive type names to their proper name", () => {
      expect(normalizeElementTypeName("FHIR.instant")).toStrictEqual([
        "FHIR",
        "instant",
      ]);
      expect(normalizeElementTypeName("bar.base64Binary")).toStrictEqual([
        "bar",
        "base64Binary",
      ]);
    });
  });

  describe("normalizeTypeName()", () => {
    it("handles empty string", () => {
      expect(normalizeTypeName("")).toBe("");
    });

    it("names without whitespace or periods remain unchanged", () => {
      expect(normalizeTypeName("FooBar")).toBe("FooBar");
    });

    it("strips periods from names", () => {
      expect(normalizeTypeName("Foo.Bar")).toBe("FooBar");
      expect(normalizeTypeName(".Foo...Bar.")).toBe("FooBar");
    });

    it("strips underscores from names", () => {
      expect(normalizeTypeName("Foo_Bar")).toBe("FooBar");
      expect(normalizeTypeName("_Foo__Bar_")).toBe("FooBar");
    });

    it("strips whitespace from names", () => {
      expect(normalizeTypeName("Foo Bar")).toBe("FooBar");
      expect(normalizeTypeName(" Foo   Bar ")).toBe("FooBar");
      expect(normalizeTypeName("\t Foo \n Bar ")).toBe("FooBar");
    });

    it("converts primitive type names to their proper name", () => {
      expect(convertPrimitiveName("dateTime")).toBe("PrimitiveDateTime");
      expect(convertPrimitiveName("positiveInt")).toBe("PrimitivePositiveInt");
    });
  });

  describe("jsonChoiceName", () => {
    it("should combine variable name and DataType typeName", () => {
      expect(jsonChoiceName("foo", "Type")).toBe("fooType");
    });

    it("should capitalize lowercase type names", () => {
      expect(jsonChoiceName("foo", "type")).toBe("fooType");
    });

    it("should normalize odd type names", () => {
      expect(jsonChoiceName("foo", "odd type.name_")).toBe("fooOddtypename");
    });

    it("should convert SimpleQuantity types to Quantity", () => {
      expect(jsonChoiceName("foo", "SimpleQuantity")).toBe("fooQuantity");
      expect(jsonChoiceName("foo", "Simple")).toBe("fooSimple");
      expect(jsonChoiceName("foo", "Quantity")).toBe("fooQuantity");
    });
  });
});
