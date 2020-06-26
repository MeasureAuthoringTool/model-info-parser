import _ from "lodash";
import {mongoosePrimitiveTypes} from "../../model/dataTypes/primitiveDataTypes";

export function getMongoosePrimitive(typeName: string): string {
  return mongoosePrimitiveTypes[_.lowerFirst(typeName)];
}

const schemaFunctionRequired = new Set(['DomainResource', 'Resource', 'BackboneElement', 'Element', 'Quantity', 'ElementDefinition']);

export function isSchemaFunctionRequired(type: string): boolean {
  return schemaFunctionRequired.has(type);
}

export function isSchemaFunctionIdRequired(type: string): boolean {
  return type === 'Resource' || type === 'Element';
}

export function eq(arg1: string, arg2: string): boolean {
  return arg1 === arg2;
}


