export const source = `{{# if memberVariables }}
public static parse{{ name }}({{ memberVariables.0.variableName }}: {{ memberVariables.0.dataType.normalizedName }}): {{ name }} {
  const newType: {{ name }} = new {{ name }}();
  newType.{{ memberVariables.0.variableName }} = {{ memberVariables.0.variableName }};
  return new {{ name }}();
}
{{/ if }}`;
