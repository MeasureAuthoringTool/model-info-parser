import Handlebars from "./registerPartials";

export const source = `{{#each names}}
{{# if (isMongooseSchemaFunctionRequired this) }}
module.exports.{{ this }}SchemaFunction = require('./fhir/{{ this }}.js').{{ this }}SchemaFunction;
{{/ if}}
module.exports.{{ this }}Schema = require('./fhir/{{ this }}.js').{{ this }}Schema;
module.exports.{{ this }} = require('./fhir/{{ this }}.js').{{ this }};
{{/each}}
`;

export interface TemplateContext {
  names: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
