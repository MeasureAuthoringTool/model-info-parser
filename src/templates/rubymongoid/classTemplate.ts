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

    def self.transform_json(json_hash{{~# isPrimitiveType this.dataType ~}}, extension_hash{{~/ isPrimitiveType ~}})
      result = Hash.new
    {{!--
      If we're transforming a primitive type "foo", we also need to get the "id" and "extension"
      values from the "_foo" attributes and set them accordingly                
    --}}
    {{# isPrimitiveType this.dataType }}
      unless extension_hash.nil?
        result["id"] = extension_hash["id"]
        result["extension"] = extension_hash["extension"].map { |ext| Extension.transform_json(ext) }
      end
    {{/ isPrimitiveType ~}}

    {{!--
      Loop over each member variable and add the conversion logic from the Measure JSON to 
      the Mongo JSON we're using internally
    --}}
    {{# each memberVariables }}

    {{~!--
      If we're looking at a system type, there is no conversion necessary    
    --}}
    {{# isSystemType this.dataType }}
      result["{{ prefixVariableName this.variableName }}"] = json_hash["{{this.variableName}}"]
      
    {{~!--
      Dealing with a non-system type, so we have to convert    
    --}}
    {{ else }}
    
    {{~!--
      If it's an array, we have to transform each element in the array before assigning it
    --}}
    {{# if this.isArray }}
    {{!--
      Primitive arrays are even trickier, as the extension data is stored in a separate array
    --}}
    {{# isPrimitiveType this.dataType }}
      result["{{ prefixVariableName this.variableName }}"] = json_hash["{{this.variableName}}"].each_with_index.map do |var,i|
        {{ this.dataType.normalizedName }}.transform_json(var, json_hash["_{{this.variableName}}"][i])
      end 
    
      {{> transformMember variableName=this.variableName className=this.dataType.normalizedName }}
      
    {{ else }}
      result["{{ prefixVariableName this.variableName }}"] = json_hash["{{this.variableName}}"].map { |var| {{this.dataType.normalizedName}}.transform_json(var) }
    {{/ isPrimitiveType }}
    {{!--
      If it's not an array, we can transform just the single element
    --}}
    {{ else }}
      {{> transformMember variableName=this.variableName className=this.dataType.normalizedName primitive=this.dataType.primitive}}
      
    {{/ if }}
    {{/ isSystemType }}
    {{~/ each }}

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
