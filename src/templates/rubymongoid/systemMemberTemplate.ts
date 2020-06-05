export const source = `field :{{member.variableName}}, type: {{#if member.isArray}}Array{{else}}{{#getMongoidPrimitive member.dataType.normalizedName}}{{/getMongoidPrimitive}}{{/if}}`;
