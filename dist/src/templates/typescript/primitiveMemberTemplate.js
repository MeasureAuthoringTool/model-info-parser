"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = `public {{member.variableName}}: {{#if member.isArray}}Array<{{member.dataType.normalizedName}}>{{else}}{{member.dataType.normalizedName}}{{/if}}; // primitive
  public _{{member.variableName}}: {{#if member.isArray}}Array<Extension>{{else}}Extension{{/if}};`;
//# sourceMappingURL=primitiveMemberTemplate.js.map