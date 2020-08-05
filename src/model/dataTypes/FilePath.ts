import { posix as path } from "path";

/**
 * Instances of this class represent a path in the filesystem.
 * FilePath instances are immutable, and each unique path is stored as a singleton
 * in a cache. FilePath instances cannot be created normally: they must be created
 * or retrieved via the static #FilePath.getInstance() method.
 */
export default class FilePath {
  private static cache: { [key: string]: FilePath } = {};

  public readonly value: string;

  private constructor(value: string) {
    this.value = path.normalize(value);
  }

  public static getInstance(value: string): FilePath {
    // Create a new instance, even though we may not use this one
    const newInstance = new FilePath(value);
    const { value: normalizedValue } = newInstance;

    // Cache by lowercased file path
    const key = normalizedValue.toLowerCase();

    // Return cached value if possible
    const cachedFile = FilePath.cache[key];
    if (cachedFile) {
      // if the cached value and the incoming value are different, that means the cached file and this
      // new file have the same name, but different capitalization
      if (cachedFile.value !== normalizedValue) {
        throw new Error(
          `FilePath "${normalizedValue}" cannot overwrite equivalent file "${cachedFile.value}"`
        );
      }

      return cachedFile;
    }

    // Add the new instance to the cache and return it
    FilePath.cache[key] = newInstance;
    return newInstance;
  }

  public static sortFilePaths(filePaths: Array<FilePath>): Array<FilePath> {
    return filePaths.sort((a, b) => {
      const valueA = a.value.toLowerCase();
      const valueB = b.value.toLowerCase();

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });
  }

  public isAbsolute(): boolean {
    return path.isAbsolute(this.value);
  }

  public isRelative(): boolean {
    return !path.isAbsolute(this.value);
  }

  public join(...paths: Array<FilePath>): FilePath {
    const pathSegments = paths.map((currentPath) => currentPath.value);
    const joinedValue = path.join(this.value, ...pathSegments);
    const normalizedValue = path.normalize(joinedValue);
    return new FilePath(normalizedValue);
  }

  public relativeTo(destination: FilePath): FilePath {
    if (!this.isAbsolute()) {
      throw new Error(`File path "${this.value}" is not absolute`);
    }

    if (!destination.isAbsolute()) {
      throw new Error(`File path "${destination.value}" is not absolute`);
    }
    const newPathValue = path.relative(this.value, destination.value);
    return new FilePath(newPathValue);
  }

  public toString(): string {
    return this.value;
  }
}
