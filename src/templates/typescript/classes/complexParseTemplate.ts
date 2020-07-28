export default `public static parse(
  json: I{{ dataType.normalizedName }},
  providedInstance: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}()
): {{ dataType.normalizedName }} {
{{# if this.parentDataType }}
  const newInstance: {{ this.dataType.normalizedName }} = {{ this.parentDataType.normalizedName }}.parse(json, providedInstance);
{{ else }}
  const newInstance: {{ this.dataType.normalizedName }} = providedInstance;
{{/ if }}
{{# each memberVariables }}
{{# each choiceTypes }}
{{> parseChoiceMember variableName=../variableName dataType=this }}
{{ else }}
{{> parseSingleMember variableName=this.variableName dataType=this.dataType isArray=this.isArray }}
{{/ each }}
{{/ each }}

  return newInstance;
}
`;
