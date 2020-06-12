import DataType from "./DataType";
import SystemBoolean from "./system/SystemBoolean";
import SystemDate from "./system/SystemDate";
import SystemDateTime from "./system/SystemDateTime";
import SystemDecimal from "./system/SystemDecimal";
import SystemInteger from "./system/SystemInteger";
import SystemString from "./system/SystemString";
import SystemTime from "./system/SystemTime";
import FilePath from "./FilePath";

function parseDataType(
  ns: string,
  normalizedTypeName: string,
  baseDir: string
): DataType;
function parseDataType(
  ns: string,
  normalizedTypeName: string,
  baseDir: FilePath
): DataType;
function parseDataType(
  ns: string,
  normalizedTypeName: string,
  baseDirIn: FilePath | string
): DataType {
  let baseDir: FilePath;
  if (baseDirIn instanceof FilePath) {
    baseDir = baseDirIn;
  } else {
    baseDir = FilePath.getInstance(baseDirIn);
  }

  if (ns === "FHIR") {
    return DataType.getInstance(ns, normalizedTypeName, baseDir);
  }

  if (ns !== "System") {
    throw new Error(`Unexpected namespace: ${ns}`);
  }

  // Handle the "System" namespace types
  switch (normalizedTypeName) {
    case "Boolean":
      return SystemBoolean;
    case "Date":
      return SystemDate;
    case "Decimal":
      return SystemDecimal;
    case "DateTime":
      return SystemDateTime;
    case "Integer":
      return SystemInteger;
    case "String":
      return SystemString;
    case "Time":
      return SystemTime;
    default:
      throw new Error(`Unrecognized System type: ${normalizedTypeName}`);
  }
}

export default parseDataType;
