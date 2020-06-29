import FilePath from "../../../src/model/dataTypes/FilePath";

describe("FilePath", () => {
  describe("getInstance()", () => {
    it("should initialize the path value", () => {
      expect(FilePath.getInstance("localFile.txt").value).toBe("localFile.txt");
    });

    it("should normalize .. and . segments of the path", () => {
      const file1 = FilePath.getInstance("../../baseDir/one/.././");
      expect(file1.value).toBe("../../baseDir/");
    });

    it("should normalize empty string to . (current working directory", () => {
      const file1 = FilePath.getInstance("");
      expect(file1.value).toBe(".");
    });

    it("should return the same instance of the FilePath for 2 separate invocations", () => {
      const file1 = FilePath.getInstance("/someString.txt");
      const file2 = FilePath.getInstance("/subdir/../someString.txt");
      expect(file1).toBe(file2);
    });

    it("should detect a change in case sensitivity and throw an Error", () => {
      expect(() => {
        FilePath.getInstance("someString.txt");
        FilePath.getInstance("SomeString.txt");
      }).toThrow(
        'FilePath "SomeString.txt" cannot overwrite equivalent file "someString.txt"'
      );
    });
  });

  describe("sortFilePaths()", () => {
    it("should handle an empty array", () => {
      expect(FilePath.sortFilePaths([])).toBeArrayOfSize(0);
    });

    it("should return the same instance", () => {
      const arr = [FilePath.getInstance("./same")];
      expect(FilePath.sortFilePaths(arr)).toBe(arr);
    });

    it("should handle duplicates", () => {
      const arr = [
        FilePath.getInstance("./same"),
        FilePath.getInstance("./same"),
      ];
      expect(FilePath.sortFilePaths(arr)).toBe(arr);
    });

    it("should sort a mixed up array", () => {
      const alpha = FilePath.getInstance("./alpha");
      const bravo = FilePath.getInstance("./Bravo");
      const charlie = FilePath.getInstance("./charlie");
      const arr = [alpha, charlie, bravo];
      expect(FilePath.sortFilePaths(arr)).toStrictEqual([
        alpha,
        bravo,
        charlie,
      ]);
    });
  });

  describe("isAbsolute()", () => {
    it("should return false for relative paths", () => {
      const file = FilePath.getInstance("somedir/someString.txt");
      expect(file.isAbsolute()).toBeFalse();
    });

    it("should return true for absolute paths", () => {
      const file = FilePath.getInstance("/somedir/someString.txt");
      expect(file.isAbsolute()).toBeTrue();
    });
  });

  describe("isRelative()", () => {
    it("should return true for relative paths", () => {
      const file = FilePath.getInstance("somedir/someString.txt");
      expect(file.isRelative()).toBeTrue();
    });

    it("should return true for absolute paths", () => {
      const file = FilePath.getInstance("/somedir/someString.txt");
      expect(file.isRelative()).toBeFalse();
    });
  });

  describe("toString()", () => {
    it("should use the value as its toString() representation", () => {
      const file1 = FilePath.getInstance("baseDir/subdir");
      expect(file1.toString()).toBe("baseDir/subdir");
    });
  });

  describe("join()", () => {
    it("should handle empty parameter array", () => {
      const file1 = FilePath.getInstance("baseDir");
      const result = file1.join();
      expect(result.value).toBe("baseDir");
    });

    it("should join two simple paths into one", () => {
      const file1 = FilePath.getInstance("baseDir");
      const file2 = FilePath.getInstance("subdir");
      const result = file1.join(file2);
      expect(result.value).toBe("baseDir/subdir");
    });

    it("should join three simple paths into one", () => {
      const file1 = FilePath.getInstance("baseDir");
      const file2 = FilePath.getInstance("subdir");
      const file3 = FilePath.getInstance("file.txt");
      const result = file1.join(file2, file3);
      expect(result.value).toBe("baseDir/subdir/file.txt");
    });

    it("should handle trailing and preceding separators gracefully", () => {
      const file1 = FilePath.getInstance("baseDir/");
      const file2 = FilePath.getInstance("/subdir/");
      const result = file1.join(file2);
      expect(result.value).toBe("baseDir/subdir/");
    });

    it("should normalize .. and . segments of the path", () => {
      const file1 = FilePath.getInstance("baseDir/one/.././");
      const file2 = FilePath.getInstance("/subdir//./two/../");
      const result = file1.join(file2);
      expect(result.value).toBe("baseDir/subdir/");
    });
  });

  describe("relativeTo()", () => {
    it("should throw an error if base path is not absolute", () => {
      expect(() => {
        const file1 = FilePath.getInstance("file1");
        const file2 = FilePath.getInstance("/subdir");
        file1.relativeTo(file2);
      }).toThrow('File path "file1" is not absolute');
    });

    it("should throw an error if destination path is not absolute", () => {
      expect(() => {
        const file1 = FilePath.getInstance("/subdir");
        const file2 = FilePath.getInstance("subdir/file2.xml");
        file1.relativeTo(file2);
      }).toThrow('File path "subdir/file2.xml" is not absolute');
    });

    it("should accept a path parameter, and return a new representation of the destination relative to the base", () => {
      const file1 = FilePath.getInstance("/baseDir/subdir/namespace");
      const file2 = FilePath.getInstance("/baseDir/subdir/filename.txt");
      const result = file1.relativeTo(file2);
      expect(result.value).toBe("../filename.txt");
    });
  });
});
