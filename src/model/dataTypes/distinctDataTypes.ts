import _ from "lodash";
import MemberVariable from "./MemberVariable";
import DataType from "./DataType";
import { containsPrimitive } from "./primitiveDataTypes";
import ComplexDataType from "./ComplexDataType";

// We use this to remove the type being declared from the list of things to import
// Some classes reference themselves as member variables
function typeMatch(type: DataType, normalizedName: string, namespace: string) {
  return type.namespace === namespace && type.normalizedName === normalizedName;
}

export default function distinctDataTypes(
  input: Array<MemberVariable>,
  baseDataType: DataType | null,
  normalizedName: string,
  namespace: string
): Array<DataType> {
  const initial: Array<DataType> = [];

  if (baseDataType && !baseDataType.systemType) {
    initial.push(baseDataType);
  }

  const allDataTypes: Array<DataType> = input.reduce(
    (accumulator, currentMemberVar) => {
      accumulator.push(currentMemberVar.dataType);
      return accumulator;
    },
    []
  );

  const result = allDataTypes.reduce((accumulator, currentType) => {
    if (
      !currentType.systemType &&
      !typeMatch(currentType, normalizedName, namespace) &&
      !_.find(accumulator, currentType)
    ) {
      accumulator.push(currentType);
    }
    return accumulator;
  }, initial);

  // We need to check if any of the members are primitives. If so, we should add the Extension to the list of imports
  // (unless we're looking at Extension, itself, or it's already been added)
  if (
    normalizedName !== "Extension" &&
    containsPrimitive(allDataTypes) &&
    !result.find((type) => type.typeName === "Extension")
  ) {
    result.push(new ComplexDataType("FHIR", "Extension"));
  }

  return result;
}
