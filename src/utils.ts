export function normalizeElementTypeName(elementType): [string, string] {
  const tokens = elementType.split(/\./);

  if (tokens.length < 2) {
    throw new Error(`Invalid elementType encountered: ${elementType}`);
  }
  const [ns, ...typeArr] = tokens;
  const name = typeArr.reduce(
    (accumulator, currentToken) => accumulator + currentToken,
    ""
  );
  return [ns, name];
}

export function normalizeTypeName(typeName): string {
  const regex = /[\.\s]*/gi;
  return typeName.replace(regex, "");
}
