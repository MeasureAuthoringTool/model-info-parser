import _ from "lodash";
import IDataType from "./IDataType";

export const primitiveTypeNames = [
  "base64Binary",
  "boolean",
  "canonical",
  "code",
  "date",
  "dateTime",
  "decimal",
  "id",
  "instant",
  "integer",
  "markdown",
  "oid",
  "positiveInt",
  "question", // not on documentation page
  "string",
  "time",
  "unsignedInt",
  "uri",
  "url",
  "uuid",
  "xhtml", // not on documentation page
];

export function primitiveTypeCheck(name: string): boolean {
  const convertedName = convertPrimitiveName(name);

  const convertedNameArray: Array<string> = primitiveTypeNames.map(x => convertPrimitiveName(x));

  return convertedNameArray.includes(convertedName);
}

/**
 * Checks if any of the specified types are primitive
 * @param distinctTypes
 * @returns true if any of the provided types are primitive
 */
export function containsPrimitive(distinctTypes: Array<IDataType>): boolean {
  const firstPrimitive = distinctTypes.find((type) =>
    primitiveTypeCheck(type.typeName)
  );
  return !!firstPrimitive;
}

export function convertPrimitiveName(name: string): string {
  if (primitiveTypeNames.includes(name)) {
    const upperName = _.upperFirst(name);
    return `Primitive${upperName}`;
  }
  return name;
}
