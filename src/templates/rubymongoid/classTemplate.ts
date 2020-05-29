import IDataType from "../../model/dataTypes/IDataType";
import Element from "../../model/Element";
import Handlebars from "./registerPartials";

export const source = `module {{namespace}}
  class {{name}}{{#if baseFhirType}} < {{#removeNamespace baseFhirType }}{{/removeNamespace}}{{/if}}
    include Mongoid::Document {{this.testthis}}
    field :typeName, type: String, default: '{{name}}'
    {{#each memberVariables}}
    {{#if this.dataType.primitive}}{{> primitiveMember member=this}}{{else}}{{> complexMember member=this}}{{/if}}
    {{/each}}
  end
end
`;

export interface ITemplateContext {
  distinctTypes: Array<IDataType>;
  name: string;
  namespace: string;
  elements: Array<Element>;
}

export default Handlebars.compile<ITemplateContext>(source);
