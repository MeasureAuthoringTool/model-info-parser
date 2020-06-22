import { normalizeElementTypeName, normalizeTypeName } from "../src/utils";
import { convertPrimitiveName } from "../src/model/dataTypes/primitiveDataTypes";

describe('utils', () => {
  describe('normalizeElementTypeName()', () => {
    test("it throws an error on empty string", () => {
      expect(() => {
        normalizeElementTypeName("");
      }).toThrowError("Invalid elementType encountered: ");
    });

    test("it throws an error on string with no period", () => {
      expect(() => {
        normalizeElementTypeName("foo");
      }).toThrowError("Invalid elementType encountered: foo");
    });

    test("it handles scenarios with only 1 period", () => {
      expect(normalizeElementTypeName("foo.bar")).toStrictEqual(["foo", "bar"]);
      expect(normalizeElementTypeName("foo.")).toStrictEqual(["foo", ""]);
      expect(normalizeElementTypeName(".bar")).toStrictEqual(["", "bar"]);
    });

    test("it handles scenarios with multiple periods", () => {
      expect(normalizeElementTypeName("foo.bar.baz")).toStrictEqual(["foo", "barbaz"]);
      expect(normalizeElementTypeName("foo.bar.baz.bot")).toStrictEqual(["foo", "barbazbot"]);
    });

    test("it converts primitive type names to their proper name", () => {
      expect(normalizeElementTypeName("FHIR.instant")).toStrictEqual(["FHIR", "instant"]);
      expect(normalizeElementTypeName("bar.base64Binary")).toStrictEqual(["bar", "base64Binary"]);
    });
  });

  describe("normalizeTypeName()", () => {
    test("it handles empty string", () => {
      expect(normalizeTypeName("")).toBe("");
    });

    test("names without whitespace or periods remain unchanged", () => {
      expect(normalizeTypeName("FooBar")).toBe("FooBar");
    });

    test("it strips periods from names", () => {
      expect(normalizeTypeName("Foo.Bar")).toBe("FooBar");
      expect(normalizeTypeName(".Foo...Bar.")).toBe("FooBar");
    });

    test("it strips underscores from names", () => {
      expect(normalizeTypeName("Foo_Bar")).toBe("FooBar");
      expect(normalizeTypeName("_Foo__Bar_")).toBe("FooBar");
    });

    test("it strips whitespace from names", () => {
      expect(normalizeTypeName("Foo Bar")).toBe("FooBar");
      expect(normalizeTypeName(" Foo   Bar ")).toBe("FooBar");
      expect(normalizeTypeName("\t Foo \n Bar ")).toBe("FooBar");
    });

    test("converts primitive type names to their proper name", () => {
      expect(convertPrimitiveName("dateTime")).toBe("PrimitiveDateTime");
      expect(convertPrimitiveName("positiveInt")).toBe("PrimitivePositiveInt");
    });
  });
});


