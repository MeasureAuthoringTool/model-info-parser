import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `module {{ dataType.namespace }}
  # {{# getRobyDoc dataType}}{{/ getRobyDoc}}
  class {{ dataType.normalizedName }}{{# if parentDataType }} < {{ parentDataType.normalizedName }}{{/if}}
    include Mongoid::Document
    {{#each memberVariables}}
    {{# each this.choiceTypes }}
    {{> mongoidComplexMember variableName=( jsonChoiceName ../variableName this.typeName ) bidirectional=../bidirectional dataType=this relationshipType=../relationshipType }}
    
    {{ else }}
    {{> mongoidComplexMember variableName=( toModelVariableName this.variableName) bidirectional=this.bidirectional dataType=this.dataType relationshipType=this.relationshipType }}
    
    {{/ each }}
    {{/each}}
{{# if (eq dataType.normalizedName "Resource") }}

    def initialize(attrs = nil)
      super(attrs)
      self.resourceType = self.class.name.split("::")[1].to_s
    end   
{{/ if }}
{{# if (eq dataType.normalizedName "Extension") }}

  def self.serializePrimitiveExtension(primitive)
    result = nil
    unless primitive.fhirId.nil? || primitive.extension.nil?
      result = Hash.new
      result['id'] = primitive.fhirId
      result['extension'] = primitive.extension.map { |x| x.as_json() }
    end
    result
  end

  def self.serializePrimitiveExtensionArray(primitives)
    result = primitives.map{ |p|  Extension.serializePrimitiveExtension(p) }
    result.compact
    if (result.empty?) 
      return nil
    end
    result
  end
{{/ if }}
    
    def as_json(*args)
      result = {{# if parentDataType ~}}
        super
      {{~ else ~}}
        Hash.new
      {{~/ if }}
      
      {{# each memberVariables }}      
        {{# each choiceTypes }}
      unless self.{{ jsonChoiceName ../variableName this.typeName }}.nil?
        result['{{ jsonChoiceName ../variableName this.typeName }}'] = self.{{ jsonChoiceName ../variableName this.typeName }}
            {{~# unless systemType ~}}
              {{~# if primitive ~}}
                .value                
              {{~ else ~}}
                .as_json(*args)                
              {{~/ if ~}}
            {{~/ unless }}
                        
          {{# if primitive }}
        serialized = Extension.serializePrimitiveExtension(self.{{ jsonChoiceName ../variableName this.typeName }}) 
        result['_{{ jsonChoiceName ../variableName this.typeName }}'] = serialized unless serialized.nil?
          {{/ if }}
      end          
        {{ else }}        
      unless self.{{ toModelVariableName variableName }}.nil? {{# if isArray}} || !self.{{ toModelVariableName variableName }}.any? {{/ if}}
        result['{{ variableName }}'] = self.{{ toModelVariableName variableName }}
            {{~# unless dataType.systemType ~}}
              {{~# if isArray ~}}
                {{~# if dataType.primitive ~}}
                  .compact().map{ |x| x.value } 
                {{~ else ~}}
                  .map{ |x| x.as_json(*args) }
                {{~/ if ~}}
              {{~ else ~}}
                {{~# if dataType.primitive ~}}
                  .value
                {{~ else ~}}
                  .as_json(*args)
                {{~/ if ~}}
              {{~/ if ~}}
            {{~/ unless }}

          {{# if dataType.primitive }}
          {{# if isArray }}
        serialized = Extension.serializePrimitiveExtensionArray(self.{{ toModelVariableName variableName }})                              
        result['_{{ variableName }}'] = serialized unless serialized.nil? || !serialized.any?
          {{ else }}
        serialized = Extension.serializePrimitiveExtension(self.{{ toModelVariableName variableName }})            
        result['_{{ variableName }}'] = serialized unless serialized.nil?
          {{/ if }}
          {{/ if }}
      end
        {{/ each }}
        {{/ each }}
      {{!--
        Drop default id
      --}}           
      result.delete('id')
      {{!--
        Handle fhirId
      --}}      
      unless self.fhirId.nil?
        result['id'] = self.fhirId
        result.delete('fhirId')
      end  
      result
    end

    def self.transform_json(json_hash{{~# isPrimitiveType this.dataType ~}}, extension_hash{{~/ isPrimitiveType ~}}, target = {{ dataType.normalizedName }}.new)
    {{!--
    --}}
    {{# if (eq dataType.normalizedName "Resource") }}
      if 'Resource' == target.class.name.split('::').last && 'Resource' != json_hash['resourceType']
        return Object.const_get('FHIR::' + json_hash['resourceType']).transform_json(json_hash)
      end
    {{/ if }}
    
    {{!--
      If we're transforming a primitive type 'foo', we also need to get the 'id' and 'extension'
      values from the '_foo' attributes and set them accordingly                
    --}}
    {{# isPrimitiveType this.dataType }}
      result = target
      unless extension_hash.nil?
        result['fhirId'] = extension_hash['id'] unless extension_hash['id'].nil?
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
      result['{{ toModelVariableName this.variableName }}'] = json_hash['{{this.variableName}}'] unless json_hash['{{ this.variableName }}'].nil?
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
      result['{{ toModelVariableName this.variableName }}'] = json_hash['{{this.variableName}}'].each_with_index.map do |var, i|
        extension_hash = json_hash['_{{this.variableName}}'] && json_hash['_{{this.variableName}}'][i]
        {{ this.dataType.normalizedName }}.transform_json(var, extension_hash)
      end unless json_hash['{{ this.variableName }}'].nil?
    {{ else }}
      result['{{ toModelVariableName this.variableName }}'] = json_hash['{{this.variableName}}'].map { |var| {{this.dataType.normalizedName}}.transform_json(var) } unless json_hash['{{ this.variableName }}'].nil?
    {{/ isPrimitiveType }}
    {{!--
      If it's not an array, we can transform just the single element
    --}}
    {{ else }}
    {{# each this.choiceTypes }}
      {{> transformMember variableName=../variableName className=this.normalizedName primitive=this.primitive choiceType=this.typeName }}

    {{ else }}
      {{> transformMember variableName=this.variableName className=this.dataType.normalizedName primitive=this.dataType.primitive}}

    {{/ each }}
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
