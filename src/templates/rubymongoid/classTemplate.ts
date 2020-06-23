import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `module {{ dataType.namespace }}
  class {{ dataType.normalizedName }}{{# if parentDataType }} < {{ parentDataType.normalizedName }}{{/if}}
    include Mongoid::Document
    field :typeName, type: String, default: '{{ dataType.normalizedName }}'
    {{#each memberVariables}}
    {{> mongoidComplexMember member=this}}
    
    {{/each}}
    {{# hasReservedKeywords memberVariables }}
    
    def as_json(*args)
      res = super
      {{# each memberVariables }}
      {{# isReservedKeyword this.variableName }}
      res["{{ this.variableName }}"] = res.delete("_{{ this.variableName }}")
      {{/ isReservedKeyword }}
      {{/ each }}
      res
    end
    {{/ hasReservedKeywords }}

    def self.transform_json(json_hash)
      result = Hash.new
      {{# each memberVariables }}
      result["{{ prefixVariableName this.variableName }}"] = {{this.dataType.normalizedName}}.transform_json(json_hash["{{this.variableName}}"])
      {{/ each }}
      result
    end
  end
end
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  memberVariables: Array<MemberVariable>;
}

export default Handlebars.compile<TemplateContext>(source);
