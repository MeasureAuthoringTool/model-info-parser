import Handlebars from "./registerPartials";

export const source = `const mongoose = require('mongoose/browser');

{{!-- Import and export all schema files --}}
{{#each names}}
module.exports.{{ this }}Schema = require('./fhir/{{ this }}.js').{{ this }}Schema;
{{/each}}

{{!-- Create and export models --}}
{{#each names}}
module.exports.{{ this }} = mongoose.model('{{ this }}', module.exports.{{ this }}Schema);
{{/each}}
`;

export interface TemplateContext {
  names: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
