export const source =
  "{{#if member.isArray}}embeds_many{{else}}embeds_one{{/if}} :{{member.variableName}}, " +
  "class_name: '{{member.dataType.normalizedName}}'";
