export default "{{#if dataType.systemType}}field :{{ variableName }}, " +
  "type: {{#getMongoidPrimitive dataType.typeName}}{{/getMongoidPrimitive}}" +
  "{{else}}{{ relationshipType }} :{{ variableName }}, " +
  "class_name: '{{ dataType.namespace }}::{{ dataType.normalizedName }}'" +
  "{{#unless bidirectional }}, inverse_of: nil{{/unless }}{{/if}}";
