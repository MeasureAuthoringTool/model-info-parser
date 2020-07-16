import { normalizeTypeName } from "../../utils";
import { primitiveTypeCheck, convertPrimitiveName } from "./primitiveDataTypes";
import FilePath from "./FilePath";

/**
 * DataTypes contain high-level metadata about a type being generated.
 * They are implemented using a singleton pattern for easy comparison.
 * Each unique DataType instance is cached by its absolute path.
 */
export default class DataType {
  private static cache: { [key: string]: DataType } = {};

  // Overloaded getInstance method
  public static getInstance(
    namespace: string,
    typeName: string,
    baseDir: string
  ): DataType;

  public static getInstance(
    namespace: string,
    typeName: string,
    baseDir: FilePath
  ): DataType;

  public static getInstance(
    namespace: string,
    typeName: string,
    baseDirIn: FilePath | string
  ): DataType {
    let baseDir: FilePath;
    if (baseDirIn instanceof FilePath) {
      baseDir = baseDirIn;
    } else {
      baseDir = FilePath.getInstance(baseDirIn);
    }

    if (baseDir.isRelative()) {
      throw new Error(
        `Cannot create DataType for relative path "${baseDir.value}"`
      );
    }

    const systemType: boolean = namespace === "System";

    if (systemType) {
      return DataType.parseSystemTypes(typeName);
    }

    let normalizedName: string = systemType
      ? typeName
      : normalizeTypeName(typeName);
    const primitive: boolean = systemType
      ? false
      : primitiveTypeCheck(typeName);
    normalizedName = primitive
      ? convertPrimitiveName(normalizedName)
      : normalizedName;

    const fullPath = FilePath.getInstance(
      `${baseDir.value}/${namespace}/${normalizedName}`
    );
    const existingDataType = DataType.cache[fullPath.value];

    if (existingDataType) {
      return existingDataType;
    }

    const newDataType = new DataType(
      namespace,
      typeName,
      fullPath,
      systemType,
      normalizedName,
      primitive
    );
    DataType.cache[fullPath.value] = newDataType;
    return newDataType;
  }

  private static parseSystemTypes(typeName: string): DataType {
    let systemTypeName;

    switch (typeName) {
      case "Boolean":
        systemTypeName = "boolean";
        break;
      case "Date":
        systemTypeName = "Date";
        break;
      case "Decimal":
        // TODO this should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
        // See https://www.hl7.org/fhir/json.html
        systemTypeName = "number";
        break;
      case "DateTime":
        systemTypeName = "Date";
        break;
      case "Integer":
        // TODO this should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
        // See https://www.hl7.org/fhir/json.html
        systemTypeName = "number";
        break;
      case "String":
        systemTypeName = "string";
        break;
      case "Time":
        systemTypeName = "Date";
        break;
      default:
        throw new Error(`Unrecognized System type: ${typeName}`);
    }

    const fullPath = FilePath.getInstance(`${__dirname}/system/${typeName}`);

    const existingDataType = DataType.cache[fullPath.value];

    if (existingDataType) {
      return existingDataType;
    }

    const newSystemType = new DataType(
      "System",
      systemTypeName,
      fullPath,
      true,
      systemTypeName,
      false
    );

    DataType.cache[fullPath.value] = newSystemType;

    return newSystemType;
  }

  private constructor(
    public readonly namespace: string,
    public readonly typeName: string,
    public readonly path: FilePath,
    public readonly systemType: boolean,
    public readonly normalizedName: string,
    public readonly primitive: boolean
  ) {}
}
