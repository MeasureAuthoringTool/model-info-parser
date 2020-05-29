import { mongoidPrimitiveTypes } from '../../model/dataTypes/primitiveDataTypes';

export function getMongoidPrimitive(type: string): string {
  return mongoidPrimitiveTypes[type];
}

export function removeNamespace(typeName: string): string {
  const parts = typeName.split('.');
  return parts.length === 2? parts[1] : parts[0];
}
