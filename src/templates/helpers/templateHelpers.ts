import _ from "lodash";
import Handlebars, { HelperOptions } from "handlebars";
import { reservedWords } from "../../constants";
import { mongoidPrimitiveTypes } from "../../model/dataTypes/primitiveDataTypes";
import MemberVariable from "../../model/dataTypes/MemberVariable";
import DataType from "../../model/dataTypes/DataType";

export function getMongoidPrimitive(type: string): string {
  return mongoidPrimitiveTypes[_.lowerFirst(type)];
}

Handlebars.registerHelper("getMongoidPrimitive", getMongoidPrimitive);

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
  "prefixVariableName",
  (variableName: string): string => {
    if (reservedWords.includes(variableName)) {
      return `_${variableName}`;
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

Handlebars.registerHelper("getRobyDoc", function getRobyDoc(
  dataType: DataType
): string {
  const snakeCaseType = _.snakeCase(dataType.normalizedName);
  const namespace = _.toLower(dataType.namespace);
  return `${namespace}/${snakeCaseType}.rb`;
});

export default Handlebars;
