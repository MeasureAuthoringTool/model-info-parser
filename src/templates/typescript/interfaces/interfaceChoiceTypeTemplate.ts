export default `{{# each member.choiceTypes }}
{{# if this.systemType }}
{{ ../variableName}}{{ trimInterfaceName this.normalizedName}}?: {{ getTypeScriptPrimitive this.normalizedName }};
{{ else }}
{{ ../variableName}}{{ trimInterfaceName this.normalizedName}}?: {{ this.normalizedName }};
{{# if this.primitive }}
_{{ ../variableName}}{{ trimInterfaceName this.normalizedName}}?: IElement;
{{/ if }}
{{/ if }}
{{# unless @last }}

{{/ unless }}
{{ else }}
{{# if this.dataType.systemType }}
{{ member.variableName}}?: {{ getTypeScriptPrimitive member.dataType.normalizedName }};
{{ else }}
{{ member.variableName}}?: {{ member.dataType.normalizedName }};
{{/ if }}
{{/ each ~}}`;
