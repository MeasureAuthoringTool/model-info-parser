import _ from "lodash";
import ComplexDataType from "./ComplexDataType";
import IDataType from "./IDataType";
import MemberVariable from "./MemberVariable";

/**
 * We use this to remove the type being declared from the list of things to import.
 * This is necessary since some classes reference themselves as member variables
 */
export function typeMatch(
  type: IDataType,
  normalizedName: string,
  namespace: string
) {
  return type.namespace === namespace && type.normalizedName === normalizedName;
}

/**
 * Removes a DataType with the specified name and namespace from the Array of DataTypes
 * @param input
 * @param normalizedName
 * @param namespace
 */
export function filterDataTypeArray(
  input: Array<IDataType>,
  normalizedName: string,
  namespace: string
): Array<IDataType> {
  return input.filter((dataType) => {
    return !typeMatch(dataType, normalizedName, namespace);
  });
}

/**
 * Sort an Array of DataTypes by their normalized name (case-insensitive)
 */
export function sortDataTypes(input: Array<IDataType>): Array<IDataType> {
  return input.sort((t1: IDataType, t2: IDataType): number => {
    const name1 = t1.normalizedName.toUpperCase();
    const name2 = t2.normalizedName.toUpperCase();

    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}

export function removeDuplicateDataTypes(
  input: Array<IDataType>
): Array<IDataType> {
  const initial: Array<IDataType> = [];

  return input.reduce((accumulator, currentType) => {
    if (!currentType.systemType && !_.find(accumulator, currentType)) {
      accumulator.push(currentType);
    }
    return accumulator;
  }, initial);
}

/**
 * This safely adds a DataType to a list of DataTypes while ensuring that no duplicates are added,
 * the type doing the imports is not added to itself, and that the result is sorted
 */
export function safeAddTypeImport(
  dataTypes: Array<IDataType>,
  typeToAdd: IDataType,
  normalizedName: string,
  namespace: string
): Array<IDataType> {
  // Add new type to the list of data types
  dataTypes.push(typeToAdd);

  // Filter the class we're looking at from the list of imports (prevent self-referencing member variable)
  dataTypes = filterDataTypeArray(dataTypes, normalizedName, namespace);

  // Remove any duplicates
  dataTypes = removeDuplicateDataTypes(dataTypes);

  // sort the result
  dataTypes = sortDataTypes(dataTypes);

  return dataTypes;
}

export default function distinctDataTypes(
  input: Array<MemberVariable>,
  baseDataType: IDataType | null,
  normalizedName: string,
  namespace: string
): Array<IDataType> {
  // Collect all DataTypes from member variables
  let allDataTypes: Array<IDataType> = input.reduce(
    (accumulator: Array<IDataType>, currentMemberVar) => {
      accumulator.push(currentMemberVar.dataType);
      return accumulator;
    },
    []
  );

  // Add the base data type to the list, if necessary
  if (baseDataType && !baseDataType.systemType) {
    allDataTypes.push(baseDataType);
  }

  // Filter out the type whose members we're looking at (self-referencing members)
  allDataTypes = filterDataTypeArray(allDataTypes, normalizedName, namespace);

  // Remove any duplicates
  allDataTypes = removeDuplicateDataTypes(allDataTypes);

  allDataTypes = sortDataTypes(allDataTypes);

  return allDataTypes;
}
