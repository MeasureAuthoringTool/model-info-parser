import _ from "lodash";
import DataType from "./DataType";
import MemberVariable from "./MemberVariable";

/**
 * Removes a DataType with the specified path from the Array of DataTypes
 * @param input array of DataTypes to filter
 * @param excluded the DataType to remove
 */
export function filterDataTypeArray(
  input: Array<DataType>,
  excluded: DataType
): Array<DataType> {
  return input.filter((dataType) => dataType !== excluded);
}

/**
 * Sort an Array of DataTypes by their normalized name (case-insensitive)
 */
export function sortDataTypes(input: Array<DataType>): Array<DataType> {
  return input.sort((t1: DataType, t2: DataType): number => {
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
  input: Array<DataType>
): Array<DataType> {
  const initial: Array<DataType> = [];

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
  dataTypesIn: Array<DataType>,
  typeToAdd: DataType,
  owningType: DataType
): Array<DataType> {
  let dataTypes = [...dataTypesIn];
  // Add new type to the list of data types
  dataTypes.push(typeToAdd);

  // Filter the class we're looking at from the list of imports (prevent self-referencing member variable)
  dataTypes = filterDataTypeArray(dataTypes, owningType);

  // Remove any duplicates
  dataTypes = removeDuplicateDataTypes(dataTypes);

  // sort the result
  dataTypes = sortDataTypes(dataTypes);

  return dataTypes;
}

export default function distinctDataTypes(
  input: Array<MemberVariable>,
  baseDataType: DataType | null,
  owningType: DataType
): Array<DataType> {
  // Collect all DataTypes from member variables
  let allDataTypes: Array<DataType> = input.map((value) => value.dataType);

  // Add the base data type to the list, if necessary
  if (baseDataType && !baseDataType.systemType) {
    allDataTypes.push(baseDataType);
  }

  // Filter out the type whose members we're looking at (self-referencing members)
  allDataTypes = filterDataTypeArray(allDataTypes, owningType);

  // Remove any duplicates
  allDataTypes = removeDuplicateDataTypes(allDataTypes);

  // Sort results
  allDataTypes = sortDataTypes(allDataTypes);

  return allDataTypes;
}
