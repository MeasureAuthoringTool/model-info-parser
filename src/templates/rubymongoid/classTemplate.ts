import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `module {{ dataType.namespace }}
  # {{# getRobyDoc dataType}}{{/ getRobyDoc}}
  class {{ dataType.normalizedName }}{{# if parentDataType }} < {{ parentDataType.normalizedName }}{{/if}}
    include Mongoid::Document
    {{#each memberVariables}}
    {{> mongoidComplexMember member=this}}

    {{/each}}
    {{# hasReservedKeywords memberVariables }}
    
    def as_json(*args)
      res = super
      {{# each memberVariables }}
      {{# isReservedKeyword this.variableName }}
      res['{{ this.variableName }}'] = res.delete('_{{ this.variableName }}')
      {{/ isReservedKeyword }}
      {{/ each }}
      res
    end
    {{/ hasReservedKeywords }}

    def self.transform_json(json_hash{{~# isPrimitiveType this.dataType ~}}, extension_hash{{~/ isPrimitiveType ~}}, target = {{ dataType.normalizedName }}.new)
    {{!--
      If we're transforming a primitive type 'foo', we also need to get the 'id' and 'extension'
      values from the '_foo' attributes and set them accordingly                
    --}}
    {{# isPrimitiveType this.dataType }}
      result = target
      unless extension_hash.nil?
        result['fhirId'] = extension_hash['id']
        result['extension'] = extension_hash['extension'].map { |ext| Extension.transform_json(ext) }
      end
    {{ else }}
    {{# if parentDataType }}
      result = self.superclass.transform_json(json_hash, target)
    {{ else }}
      result = target
    {{/ if }}
    {{/ isPrimitiveType ~}}

    {{!--
      If this is a primitive type, the json_hash isn't really a hash, it's the value
    --}}
    {{# isPrimitiveType this.dataType }}
      result['value'] = json_hash
    {{~ else ~}}

    {{!--
      For non-primitive types, loop over each member variable and add the conversion logic from the Measure JSON to 
      the Mongo JSON we're using internally
    --}}
    {{# each memberVariables }}

    {{~!--
      If we're looking at a system type, there is no conversion necessary    
    --}}
    {{# isSystemType this.dataType }}
      {{# ifEquals this.variableName 'id'}}
      result['fhirId'] = json_hash['id'] unless json_hash['id'].nil?
      {{ else }}
      {{~!-- do nothing for fhirId --}}
      {{# ifEquals this.variableName 'fhirId' }}
      {{ else }}
      result['{{ prefixVariableName this.variableName }}'] = json_hash['{{this.variableName}}'] unless json_hash['{{ this.variableName }}'].nil?
      {{/ ifEquals }}  
    {{/ ifEquals }}    
    {{!--
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
      result['{{ prefixVariableName this.variableName }}'] = json_hash['{{this.variableName}}'].each_with_index.map do |var, i|
        extension_hash = json_hash['_{{this.variableName}}'] && json_hash['_{{this.variableName}}'][i]
        {{ this.dataType.normalizedName }}.transform_json(var, extension_hash)
      end unless json_hash['{{ this.variableName }}'].nil?
    {{ else }}
      result['{{ prefixVariableName this.variableName }}'] = json_hash['{{this.variableName}}'].map { |var| {{this.dataType.normalizedName}}.transform_json(var) } unless json_hash['{{ this.variableName }}'].nil?
    {{/ isPrimitiveType }}
    {{!--
      If it's not an array, we can transform just the single element
    --}}
    {{ else }}
      {{> transformMember variableName=this.variableName className=this.dataType.normalizedName primitive=this.dataType.primitive}}
      
    {{/ if }}
    {{/ isSystemType }}
    {{~/ each }}
    {{~/ isPrimitiveType }}

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
