export default `{{# if memberVariables }}
public static parse{{ dataType.normalizedName }}({{ memberVariables.0.variableName }}: {{ memberVariables.0.dataType.normalizedName }}): {{ dataType.normalizedName }} {
  const newType: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}();
  newType.{{ memberVariables.0.variableName }} = {{ memberVariables.0.variableName }};
  return new {{ dataType.normalizedName }}();
}
{{/ if }}`;
