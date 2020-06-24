export default `{{!--
  Expects the following parameters:
   variableName - required
   className - required
   param1 - optional
   param2 - optional
   primitive - optional

  For complex types, this will emit something like:
  
  result['address'] = Address.transform_json(json_hash['address'])
  
  for primitive types, it passes an extra parameter:
   
  result['name'] = PrimitiveString.transform_json(json_hash['name'], json_hash['_name'])
--~}}

result['{{ prefixVariableName variableName }}'] = {{ className }}.transform_json(
{{~!--
  If a param1 is specified, use it. Otherwise default to: 
  json_hash['{{variableName}}'
--~}}
{{~# if param1 ~}}
  {{ param1 }}
{{~ else ~}}
  json_hash['{{variableName}}']
{{~/ if ~}}

{{~!--
  Here we may need to append an additional parameter containing the JSON extension data
  stored in the '_foo' attribute 
--}}
{{~# if primitive ~}}
  , json_hash['_{{variableName}}']
{{~/ if ~}}

{{~!--
  If a second parameter is specified, we don't assume we know its format. We just append it
--}}
{{~# if param2 ~}}
  , {{ param2 }}
{{~/ if ~}}
)`;
