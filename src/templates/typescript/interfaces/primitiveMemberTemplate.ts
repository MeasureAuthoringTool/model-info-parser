export default `{{> interfaceMember member=this }}
_{{ member.variableName }}?: {{# if member.isArray }}Array<IElement>;
{{~ else }}IElement;{{/ if }}
`;
