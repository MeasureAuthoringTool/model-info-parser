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
  return primitiveTypeNames.includes(name);
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
