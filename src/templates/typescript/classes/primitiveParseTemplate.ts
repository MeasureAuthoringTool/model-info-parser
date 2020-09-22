export default `public static parsePrimitive(
  {{# if this.parentDataType.primitive }}
  value: Parameters<typeof {{ this.parentDataType.normalizedName }}.parsePrimitive>[0],
  extension?: Parameters<typeof {{ this.parentDataType.normalizedName }}.parsePrimitive>[1],
  {{ else }}
  value: {{ getTypeScriptPrimitive memberVariables.0.dataType.normalizedName }},
  extension?: IElement | null,
  {{/ if }}
  providedInstance: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}()
): {{ dataType.normalizedName }} {
  {{# if this.parentDataType.primitive }}
    return {{ parentDataType.normalizedName }}.parsePrimitive(value, extension, providedInstance);
  {{ else }}
    let newInstance: {{ dataType.normalizedName }};

    if (extension) {
      newInstance = {{ parentDataType.normalizedName }}.parse(extension, providedInstance);
    } else {
      newInstance = providedInstance;
    }
  
    newInstance.{{ memberVariables.0.variableName }} = {{ memberVariables.0.variableName }};
    
    return newInstance;
  {{/ if }}
}
`;
