export function normalizeTypeName(typeName: string): string {
  const regex = /[._\s]*/gi;
  return typeName.replace(regex, "");
}

export function normalizeElementTypeName(
  elementType: string
): [string, string] {
  const periodIndex = elementType.indexOf(".");

  if (periodIndex === -1) {
    throw new Error(`Invalid elementType encountered: ${elementType}`);
  }

  const namespace = elementType.substring(0, periodIndex);
  let typeName = elementType.substring(periodIndex, elementType.length);

  typeName = normalizeTypeName(typeName);
  return [namespace, typeName];
}
