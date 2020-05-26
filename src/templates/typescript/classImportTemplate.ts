export const source = `{{#if distinctTypes}}
{{#each distinctTypes}}
import {{this.normalizedName}} from "../{{this.namespace}}/{{this.normalizedName}}";
{{/each}}

{{/if}}`;
