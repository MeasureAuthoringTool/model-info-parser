import _ from "lodash";
import { mongoidPrimitiveTypes } from '../../model/dataTypes/primitiveDataTypes';

// eslint-disable-next-line import/prefer-default-export
export function getMongoidPrimitive(type: string): string {
  return mongoidPrimitiveTypes[_.lowerFirst(type)];
}
