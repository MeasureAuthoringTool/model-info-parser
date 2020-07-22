export default `{{> interfaceMember member=this }}
_{{ member.variableName }}?: {{# if member.isArray }}Array<IExtension>;
{{~ else ~}}IExtension;{{/ if }}`;
