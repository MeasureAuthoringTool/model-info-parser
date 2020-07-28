export default `{{# if member.isArray ~}}
{{# if member.dataType.systemType }}
{{ member.variableName}}?: Array<{{ getTypeScriptPrimitive member.dataType.normalizedName }}>;
{{ else }}
{{ member.variableName}}?: Array<{{ member.dataType.normalizedName }}>;
{{/ if }}
{{~ else ~}}
{{> interfaceChoiceType member=member }}{{/ if }}`;
