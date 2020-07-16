export default "{{ member.variableName }}?: " +
  "{{# if member.isArray }}Array<{{> choiceType member=member }}>{{ else }}{{> choiceType member=member }}{{/ if }};";
