export default `field :{{ member.variableName }}, type: {{# if member.isArray }}Array{{ else }}{{# getMongoidPrimitive member.dataType.typeName }}{{/ getMongoidPrimitive }}{{/ if }}`;
