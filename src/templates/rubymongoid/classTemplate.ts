import Handlebars from './registerPartials';
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `module {{ dataType.namespace }}
  # {{ dataType.namespace }}/{{ dataType.normalizedName }}.rb
  class {{ dataType.normalizedName }}{{# if parentDataType }} < {{ parentDataType.normalizedName }}{{/if}}
    include Mongoid::Document
    field :typeName, type: String, default: '{{ dataType.normalizedName }}'
    {{#each memberVariables}}
    {{> mongoidComplexMember member=this}}
    
    {{/each}}
  end
end
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  memberVariables: Array<MemberVariable>;
}

export default Handlebars.compile<TemplateContext>(source);
