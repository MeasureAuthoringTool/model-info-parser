export default "{{# if member.dataType.systemType }}{{> mongoidSystemMember member=member }}" +
  "{{ else }}{{ member.relationshipType }} :{{ member.variableName }}, " +
  "class_name: '{{ member.dataType.normalizedName }}'{{/ if }}" +
  "{{# unless member.bidirectional }}, inverse_of: nil{{/ unless }}";
