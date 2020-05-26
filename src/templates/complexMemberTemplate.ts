export const source = 'public {{member.variableName}}: ' +
  `{{#if member.isArray}}Array<{{member.dataType.normalizedName}}>{{else}}{{member.dataType.normalizedName}}{{/if}};`;
