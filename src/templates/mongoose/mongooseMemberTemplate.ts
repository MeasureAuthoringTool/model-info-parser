export default "{{prefixVariableName  member.variableName}}: {{#if member.isArray}}[{{/if}}{{# if member.dataType.systemType}}{{# getMongooseSystemType member.dataType.typeName }}{{/ getMongooseSystemType }}{{ else }}{{ member.dataType.normalizedName }}Schema{{/if}}{{#if member.isArray}}]{{/if}}";