import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import Element from "../../model/Element";

export const source = `{{> classImport dataType=this}}
export default class {{name}}{{#if baseDataType}} extends {{baseDataType.typeName}}{{/if}} {
  static readonly baseType: string = "{{baseFhirType}}";
  static readonly namespace: string = "{{namespace}}";
  static readonly typeName: string = "{{fhirName}}";
  
  {{#each memberVariables}}
  {{#if this.dataType.primitive}}{{> primitiveMember member=this}}{{else}}{{> complexMember member=this}}{{/if}}
  {{/each}}
}
`;

export interface TemplateContext {
  distinctTypes: Array<DataType>;
  name: string;
  namespace: string;
  elements: Array<Element>;
}

export default Handlebars.compile<TemplateContext>(source);
