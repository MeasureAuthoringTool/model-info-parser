export default `
  if (json.{{ variableName }}{{ trimPrimitiveName dataType.normalizedName}}) {
  {{# if dataType.systemType }}
    newInstance.{{ variableName }} = json.{{ variableName }}{{ trimPrimitiveName dataType.normalizedName}};
  {{ else }}
  {{# if dataType.primitive }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parsePrimitive(json.{{ variableName }}{{ trimPrimitiveName dataType.normalizedName}}, json._{{ variableName }}{{ trimPrimitiveName dataType.normalizedName}});
  {{ else }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parse(json.{{ variableName }}{{ trimPrimitiveName dataType.normalizedName}});
  {{/ if }}
  {{/ if }}
  }`;
