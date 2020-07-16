export default `{{# each member.choiceTypes ~}}
{{# if @index }} | {{/ if~}}
{{ this.normalizedName }}
{{~ else ~}}
{{ member.dataType.normalizedName }}
{{~/ each }}`;
