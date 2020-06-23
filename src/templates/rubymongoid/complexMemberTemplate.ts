export default "{{# isSystemType member.dataType }}" +
  "{{> mongoidSystemMember member=member }}" +
  "{{ else }}" +
  "{{ member.relationshipType }} :{{ prefixVariableName member.variableName }}, class_name: '{{ member.dataType.normalizedName }}'" +
  "{{/ isSystemType }}" +
  "{{# unless member.bidirectional }}, inverse_of: nil{{/ unless }}";
