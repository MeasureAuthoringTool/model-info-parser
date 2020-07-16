export default `{{# each member.choiceTypes ~}}
{{# if @index }} | {{/ if~}}
{{~# if this.systemType ~}}
{{ getTypeScriptPrimitive this.normalizedName }}
{{~ else ~}}
{{ this.normalizedName }}
{{~/ if ~}}
{{~ else ~}}
{{~# if this.dataType.systemType ~}}
{{ getTypeScriptPrimitive member.dataType.normalizedName }}
{{~ else ~}}
{{ member.dataType.normalizedName }}
{{~/ if ~}}
{{~/ each }}`;
