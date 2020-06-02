import { convertPrimitiveName } from "./model/dataTypes/primitiveDataTypes";

export function normalizeElementTypeName(
  elementType: string
): [string, string] {
  const periodIndex = elementType.indexOf(".");

  if (periodIndex === -1) {
    throw new Error(`Invalid elementType encountered: ${elementType}`);
  }

  const ns = elementType.substring(0, periodIndex);
  let name = elementType.substring(periodIndex, elementType.length);

  name = normalizeTypeName(name);
  return [ns, name];
}

export function normalizeTypeName(typeName: string): string {
  const regex = /[\._\s]*/gi;
  const name = typeName.replace(regex, "");
  return convertPrimitiveName(name);
}
