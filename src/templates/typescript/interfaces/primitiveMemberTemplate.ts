export const source =
  `{{ member.variableName }}?: {{# if member.isArray }}Array<{{# unless member.dataType.systemType }}I{{/ unless }}{{ member.dataType.normalizedName }}>;
{{~ else ~}}{{# unless member.dataType.systemType }}I{{/ unless }}{{ member.dataType.normalizedName }};{{/ if }}
_{{ member.variableName }}?: {{# if member.isArray }}Array<IExtension>;
{{~ else ~}}IExtension;{{/ if }}`;
