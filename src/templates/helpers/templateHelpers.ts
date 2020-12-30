import _ from "lodash";
import Handlebars, { HelperOptions } from "handlebars";
import { reservedWords } from "../../constants";
import {
  mongoidPrimitiveTypes,
  mongoosePrimitiveTypes,
  typeScriptPrimitiveTypes,
} from "../../model/dataTypes/primitiveDataTypes";
import MemberVariable from "../../model/dataTypes/MemberVariable";
import DataType from "../../model/dataTypes/DataType";
import { jsonChoiceName } from "../../utils";

export function trimInterfaceName(typeName: string): string {
  if (typeName.startsWith("IPrimitive")) {
    return typeName.slice(10);
  }
  if (typeName.startsWith("Primitive")) {
    return typeName.slice(9);
  }
  if (typeName.startsWith("I")) {
    return typeName.slice(1);
  }
  return typeName;
}

export function getTypeScriptPrimitive(type: string): string {
  return typeScriptPrimitiveTypes[_.lowerFirst(type)];
}

export function getTypeScriptType(type: string): string {
  return _.upperFirst(getTypeScriptPrimitive(type));
}

export function getTypeScriptInterfacePrimitive(type: string): string {
  const trimmedName = trimInterfaceName(type);
  return typeScriptPrimitiveTypes[_.lowerFirst(trimmedName)];
}

export function getMongoidPrimitive(type: string): string {
  return mongoidPrimitiveTypes[_.lowerFirst(type)];
}

Handlebars.registerHelper("getMongoidPrimitive", getMongoidPrimitive);

Handlebars.registerHelper("getTypeScriptPrimitive", getTypeScriptPrimitive);

Handlebars.registerHelper("getTypeScriptType", getTypeScriptType);

Handlebars.registerHelper("isReservedKeyword", function isReserved(
  this: Handlebars.TemplateDelegate<string>,
  token: string,
  options: HelperOptions
): string {
  if (reservedWords.includes(token)) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper(
  "toModelVariableName",
  (variableName: string): string => {
    if (reservedWords.includes(variableName)) {
      return `${variableName}_local`;
    }
    return variableName;
  }
);

Handlebars.registerHelper("hasReservedKeywords", function isReserved(
  this: Handlebars.TemplateDelegate<string>,
  members: Array<MemberVariable>,
  options: HelperOptions
): string {
  const found = members.find((member) =>
    reservedWords.includes(member.variableName)
  );

  if (found) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("isPrimitiveType", function isPrimitive(
  this: Handlebars.TemplateDelegate<string>,
  dataType: DataType,
  options: HelperOptions
): string {
  if (dataType.primitive) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("isSystemType", function isSystem(
  this: Handlebars.TemplateDelegate<string>,
  dataType: DataType,
  options: HelperOptions
): string {
  if (dataType.systemType) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("getRobyDoc", (dataType: DataType): string => {
  const snakeCaseType = _.snakeCase(dataType.normalizedName);
  const namespace = _.toLower(dataType.namespace);
  return `${namespace}/${snakeCaseType}.rb`;
});

Handlebars.registerHelper("ifEquals", function ifEquals(
  this: Handlebars.TemplateDelegate<boolean>,
  a: string,
  b: string,
  options: HelperOptions
): string {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("ifLessThanEqual", function ifEquals(
  this: Handlebars.TemplateDelegate<boolean>,
  a: string,
  b: string,
  options: HelperOptions
): string {
  if (a <= b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

export function getMongooseSystemType(typeName: string): string {
  return mongoosePrimitiveTypes[_.lowerFirst(typeName)];
}

Handlebars.registerHelper("getMongooseSystemType", getMongooseSystemType);

const schemaFunctionRequired = new Set([
  "DomainResource",
  "PrimitiveUri",
  "PrimitiveInteger",
  "PrimitiveString",
  "Resource",
  "BackboneElement",
  "Element",
  "Quantity",
  "ElementDefinition",
]);

export function isMongooseSchemaFunctionRequired(type: string): boolean {
  return schemaFunctionRequired.has(type);
}

Handlebars.registerHelper(
  "isMongooseSchemaFunctionRequired",
  isMongooseSchemaFunctionRequired
);

export function isMongooseSchemaFunctionIdRequired(type: string): boolean {
  return type === "Resource" || type === "Element";
}

Handlebars.registerHelper(
  "isMongooseSchemaFunctionIdRequired",
  isMongooseSchemaFunctionIdRequired
);

export function eq(arg1: string, arg2: string): boolean {
  return arg1 === arg2;
}

Handlebars.registerHelper("eq", eq);

Handlebars.registerHelper(
  "jsonChoiceName",
  (variableName: string, typeName: string): string =>
    jsonChoiceName(variableName, typeName)
);

Handlebars.registerHelper("trimInterfaceName", (typeName: string): string =>
  trimInterfaceName(typeName)
);

Handlebars.registerHelper("trimPrimitiveName", (typeName: string): string => {
  if (typeName.startsWith("IPrimitive")) {
    return typeName.slice(10);
  }
  if (typeName.startsWith("Primitive")) {
    return typeName.slice(9);
  }
  return typeName;
});

export default Handlebars;
