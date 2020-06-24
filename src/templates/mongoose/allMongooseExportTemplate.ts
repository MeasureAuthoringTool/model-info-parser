import Handlebars from './registerPartials';
import DataType from "../../model/dataTypes/DataType";

export const source = `{{#each dataTypes}}
module.exports.{{this.normalizedName}} = require('./fhir/{{this.normalizedName}}.js').{{this.normalizedName}};
module.exports.{{this.normalizedName}}Schema = require('./fhir/{{this.normalizedName}}.js').{{this.normalizedName}}Schema;
{{/each}}
`;

export interface TemplateContext {
  dataTypes: Array<DataType>;
}

export default Handlebars.compile<TemplateContext>(source);
