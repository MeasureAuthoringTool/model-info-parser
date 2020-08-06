export default `{{!--
  Expects the following parameters:
   variableName - required
   className - required
   choiceType - optional
   primitive - optional

  For complex types, this will emit something like:
  
  result['address'] = Address.transform_json(json_hash['address'])
  
  for primitive types, it passes an extra parameter:
   
  result['name'] = PrimitiveString.transform_json(json_hash['name'], json_hash['_name']) unless json_hash['name'].nil?
--~}}
{{~!--
  If a choiceType is specified, use it. Otherwise default to: 
  json_hash['{{ variableName }}'
--~}}
{{~# if choiceType ~}}
  result['{{ jsonChoiceName variableName choiceType }}'] = {{ className }}.transform_json(json_hash['{{ jsonChoiceName variableName choiceType }}']
{{~ else ~}}
  result['{{ prefixVariableName variableName }}'] = {{ className }}.transform_json(json_hash['{{ variableName }}']
{{~/ if ~}}

{{~!--
  Here we may need to append an additional parameter containing the JSON extension data
  stored in the '_foo' attribute 
--}}
{{~# if primitive ~}}
  {{~# if choiceType ~}}
    , json_hash['_{{ jsonChoiceName variableName choiceType }}']
  {{~ else ~}}
    , json_hash['_{{ variableName }}']
  {{~/ if ~}}
{{~/ if ~}}
{{~# if choiceType ~}}
  ) unless json_hash['{{ jsonChoiceName variableName choiceType }}'].nil?
{{~ else ~}}
  ) unless json_hash['{{ variableName }}'].nil?
{{~/ if ~}}
`;
