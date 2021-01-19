export default `
  if (json.{{ variableName }} !== undefined) {
  {{# if dataType.systemType }}
    newInstance.{{ variableName }} = json.{{ variableName }};
  {{ else }}
  {{# if dataType.primitive }}
  {{# if isArray }}
    newInstance.{{ variableName }} = json.{{ variableName }}.map((x, i) => {{ dataType.normalizedName }}.parsePrimitive(x, json._{{ variableName }}?.[i]));
  {{ else }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parsePrimitive(json.{{ variableName }}, json._{{ variableName }});
  {{/ if }}
  {{ else }}
  {{# if isArray }}
    newInstance.{{ variableName }} = json.{{ variableName }}.map((x) => {{ dataType.normalizedName }}.parse(x));
  {{ else }}
    newInstance.{{ variableName }} = {{ dataType.normalizedName }}.parse(json.{{ variableName }});
  {{/ if }}
  {{/ if }}
  {{/ if }}
  }`;
