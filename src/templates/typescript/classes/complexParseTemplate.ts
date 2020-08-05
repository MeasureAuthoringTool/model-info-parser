export default `public static parse(
  json: I{{ dataType.normalizedName }},
  providedInstance: {{ dataType.normalizedName }} = new {{ dataType.normalizedName }}()
): {{ dataType.normalizedName }} {
{{# if this.parentDataType }}
  const newInstance: {{ this.dataType.normalizedName }} = {{ this.parentDataType.normalizedName }}.parse(json, providedInstance);
{{ else }}
  const newInstance: {{ this.dataType.normalizedName }} = providedInstance;
{{/ if }}
{{# if (eq dataType.normalizedName "Resource") }}

    // If not invoked by a child class
    if (
      Resource.isResource(newInstance) &&
      json.resourceType &&
      json.resourceType !== "Resource"
    ) {
      const resourceSubclass: typeof Resource | undefined = lookupResourceType(
        json.resourceType
      );
      if (resourceSubclass) {
        return resourceSubclass.parse(json);
      }
    }
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
