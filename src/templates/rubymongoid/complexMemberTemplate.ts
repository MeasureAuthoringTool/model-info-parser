export default "{{ member.relationshipType }} :{{ member.variableName }}, " +
  "class_name: '{{ member.dataType.normalizedName }}'" +
  "{{# unless member.bidirectional }}, inverse_of: nil{{/ unless }}";
