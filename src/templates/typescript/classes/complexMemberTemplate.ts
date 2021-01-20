export default `{{# each member.choiceTypes ~}}
  {{~# if @first ~}}
    @FhirChoice(
  {{~/ if ~}}
  {{~# if systemType ~}}
    "System{{ getTypeScriptType normalizedName }}"
  {{~ else ~}}
    "{{ normalizedName }}"
  {{~/ if ~}}
  {{~# unless @last }}, {{/ unless ~}}
{{ else ~}}
  {{~# if member.isArray ~}}
    @FhirList(
  {{~ else ~}}
    @FhirField(
  {{~/ if ~}}
  {{~# if dataType.systemType ~}}
    "System{{ getTypeScriptType dataType.normalizedName }}"
  {{~ else ~}}
    "{{ dataType.normalizedName }}"
  {{~/ if }}
{{/ each }})
public {{ member.variableName }}?: {{# if member.isArray }}Array<{{> choiceType member=member }}>{{ else }}{{> choiceType member=member }}{{/ if }};`;
