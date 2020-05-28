import { normalizeTypeName } from "../src/utils";

describe('utils', () => {
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

    test("it strips whitespace from names", () => {
      expect(normalizeTypeName("Foo Bar")).toBe("FooBar");
      expect(normalizeTypeName(" Foo   Bar ")).toBe("FooBar");
      expect(normalizeTypeName("\t Foo \n Bar ")).toBe("FooBar");
    });
  });
});


