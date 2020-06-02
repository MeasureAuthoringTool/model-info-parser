import ComplexDataType from "./ComplexDataType";
import IDataType from "./IDataType";
import SystemBoolean from "./system/SystemBoolean";
import SystemDate from "./system/SystemDate";
import SystemDateTime from "./system/SystemDateTime";
import SystemDecimal from "./system/SystemDecimal";
import SystemInteger from "./system/SystemInteger";
import SystemString from "./system/SystemString";
import SystemTime from "./system/SystemTime";

export default function parseDataType(
  ns: string,
  normalizedTypeName: string
): IDataType {
  if (ns === "FHIR") {
    return new ComplexDataType(ns, normalizedTypeName);
  }

  if (ns !== "System") {
    throw new Error(`Unexpected namespace: ${ns}`);
  }

  // Handle the "System" namespace types
  switch (normalizedTypeName) {
    case "Boolean":
      return new SystemBoolean();
    case "Date":
      return new SystemDate();
    case "Decimal":
      return new SystemDecimal();
    case "DateTime":
      return new SystemDateTime();
    case "Integer":
      return new SystemInteger();
    case "String":
      return new SystemString();
    case "Time":
      return new SystemTime();
    default:
      throw new Error(`Unrecognized System type: ${normalizedTypeName}`);
  }
}
