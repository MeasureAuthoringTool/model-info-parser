export default `public static parse(value: {{ memberVariables.0.dataType.normalizedName }}): {{ dataType.normalizedName }} {
  const newType: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}();
  newType.{{ memberVariables.0.variableName }} = {{ memberVariables.0.variableName }};
  return new {{ dataType.normalizedName }}();
}`;
