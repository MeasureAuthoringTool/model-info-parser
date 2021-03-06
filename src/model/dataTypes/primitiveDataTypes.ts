import _ from "lodash";

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

/**
 * This is a mapping of FHIR primitives to their respective JSON representations
 */
export const typeScriptPrimitiveTypes: { [key: string]: string } = {
  base64Binary: "string",
  boolean: "boolean",
  canonical: "string",
  code: "string",
  date: "string",
  dateTime: "string",
  decimal: "number",
  id: "string",
  instant: "string",
  integer: "number",
  markdown: "string",
  oid: "string",
  positiveInt: "number",
  question: "string",
  string: "string",
  time: "string",
  unsignedInt: "number",
  uri: "string",
  url: "string",
  uuid: "string",
  xhtml: "string",
};

export const mongoidPrimitiveTypes: { [name: string]: string } = {
  base64Binary: "String",
  boolean: "Boolean",
  canonical: "String",
  code: "String",
  date: "String",
  dateTime: "String",
  decimal: "BigDecimal",
  id: "String",
  instant: "String",
  integer: "Integer",
  markdown: "String",
  oid: "String",
  positiveInt: "Integer",
  question: "String",
  string: "String",
  time: "String",
  unsignedInt: "Integer",
  uri: "String",
  url: "String",
  uuid: "String",
  xhtml: "String",
};

export const mongoosePrimitiveTypes: { [name: string]: string } = {
  base64Binary: "String",
  boolean: "Boolean",
  canonical: "String",
  code: "String",
  date: "String",
  dateTime: "String",
  decimal: "Number",
  id: "String",
  instant: "String",
  integer: "Number",
  markdown: "String",
  oid: "String",
  positiveInt: "Number",
  question: "String",
  string: "String",
  time: "String",
  unsignedInt: "Number",
  uri: "String",
  url: "String",
  uuid: "String",
  xhtml: "String",
};

export function convertPrimitiveName(name: string): string {
  if (primitiveTypeNames.includes(name)) {
    const upperName = _.upperFirst(name);
    return `Primitive${upperName}`;
  }
  return name;
}

export function primitiveTypeCheck(name: string): boolean {
  const convertedName = convertPrimitiveName(name);

  const convertedNames: Array<string> = primitiveTypeNames.map((x) =>
    convertPrimitiveName(x)
  );

  const convertedInterfaceNames: Array<string> = primitiveTypeNames.map(
    (x) => `I${convertPrimitiveName(x)}`
  );

  return (
    convertedNames.includes(convertedName) ||
    convertedInterfaceNames.includes(name)
  );
}
