export const source = `public {{member.variableName}}: {{#if member.isArray}}Array<{{member.dataType.normalizedName}}>{{else}}{{member.dataType.normalizedName}}{{/if}}; // primitive
  public _{{member.variableName}}: {{#if member.isArray}}Array<Extension>{{else}}Extension{{/if}};`;
