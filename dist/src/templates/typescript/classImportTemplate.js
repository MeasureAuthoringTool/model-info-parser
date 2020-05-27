"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = `{{#if distinctTypes}}
{{#each distinctTypes}}
import {{this.normalizedName}} from "../{{this.namespace}}/{{this.normalizedName}}";
{{/each}}

{{/if}}`;
//# sourceMappingURL=classImportTemplate.js.map