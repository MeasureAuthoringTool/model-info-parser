export default `
  if (json.{{ variableName }} !== undefined) {
  {{# if dataType.systemType }}
    newInstance.{{ variableName }} = json.{{ variableName }};
  {{ else }}
  {{# if dataType.primitive }}
  {{# if isArray }}
    newInstance.{{ variableName }} = json.{{ variableName }}.map((x, i) => {
      const ext = json._{{ variableName }} && json._{{ variableName }}[i];
      return {{ dataType.normalizedName }}.parsePrimitive(x, ext);
    });
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
