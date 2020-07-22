export default "public {{ member.variableName }}?: " +
  "{{# if member.isArray }}Array<{{> choiceType member=member }}>{{ else }}{{> choiceType member=member }}{{/ if }};";
