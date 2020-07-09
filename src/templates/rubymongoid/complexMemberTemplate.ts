export default "{{#if member.dataType.systemType}}field :{{ prefixVariableName member.variableName }}, " +
  "type: {{#getMongoidPrimitive member.dataType.typeName}}{{/getMongoidPrimitive}}" +
  "{{else}}{{ member.relationshipType }} :{{ prefixVariableName member.variableName }}, " +
  "class_name: '{{member.dataType.namespace}}::{{ member.dataType.normalizedName }}'" +
  "{{#unless member.bidirectional }}, inverse_of: nil{{/unless }}{{/if}}";
