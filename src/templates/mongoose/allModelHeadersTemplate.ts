import Handlebars from "./registerPartials";

export const source = `const mongoose = require('mongoose/browser');

{{#each names}}
module.exports.{{ this }}Schema = new mongoose.Schema({});
{{/each}}
`;

export interface TemplateContext {
  names: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
