export default `public static parse(value: {{# if memberVariables.0.dataType.systemType ~}}
{{ getTypeScriptPrimitive memberVariables.0.dataType.normalizedName }}
{{~ else ~}}
{{ memberVariables.0.dataType.normalizedName }}
{{~/ if ~}}
): {{ dataType.normalizedName }} {
  const newType: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}();
  newType.{{ memberVariables.0.variableName }} = {{ memberVariables.0.variableName }};
  return new {{ dataType.normalizedName }}();
}
`;
