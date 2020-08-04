export default `
  if (json.{{ variableName }}{{ trimInterfaceName dataType.normalizedName}}) {
  {{# if dataType.systemType }}
    newInstance.{{ variableName }} = json.{{ variableName }}{{ trimInterfaceName dataType.normalizedName}};
  {{ else }}
  {{# if dataType.primitive }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parsePrimitive(json.{{ variableName }}{{ trimInterfaceName dataType.normalizedName}}, json._{{ variableName }}{{ trimInterfaceName dataType.normalizedName}});
  {{ else }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parse(json.{{ variableName }}{{ trimInterfaceName dataType.normalizedName}});
  {{/ if }}
  {{/ if }}
  }`;
