import DataType from "./DataType";
import ComplexDataType from "./ComplexDataType";
import SystemBoolean from "./system/SystemBoolean";
import SystemDate from "./system/SystemDate";
import SystemDateTime from "./system/SystemDateTime";
import SystemDecimal from "./system/SystemDecimal";
import SystemInteger from "./system/SystemInteger";
import SystemString from "./system/SystemString";
import SystemTime from "./system/SystemTime";

export default function parseDataType(ns, normalizedTypeName): DataType {
  if (ns === "FHIR") {
    // We treat "FHIR.string" and "FHIR.boolean" differently because they are reserved TS keywords.
    // The other "system" types get generated as type aliases. E.g. "FHIR.integer" is just an alias to "number"
    switch (normalizedTypeName) {
      case "string":
        return new SystemString();
      case "boolean":
        return new SystemBoolean();
      default:
        return new ComplexDataType(ns, normalizedTypeName);
    }
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
