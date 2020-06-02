export const source = `field :{{member.variableName}}, type: {{#if member.isArray}}Array{{else}}{{#getMongoidPrimitive member.dataType.normalizedName}}{{/getMongoidPrimitive}}{{/if}} # primitive
    {{#if member.isArray}}embeds_many{{else}}embeds_one{{/if}} :_{{member.variableName}}, class_name: 'Extension'`;
