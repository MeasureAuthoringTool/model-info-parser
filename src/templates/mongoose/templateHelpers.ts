import {mongoosePrimitiveTypes} from '../../model/dataTypes/primitiveDataTypes';
import DataType from "../../model/dataTypes/DataType";

export function getMongoosePrimitive(type: DataType): string {
  // TODO: this is a workaround for the typeName holding a normalized name instead of an original name
  const typeName = type.typeName.replace("Primitive", "").toLowerCase();
  return mongoosePrimitiveTypes[typeName] || typeName;
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


