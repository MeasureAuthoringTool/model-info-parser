import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `const mongoose = require('mongoose/browser');
{{!-- Imports --}}
{{# each imports}}
{{# if this.systemType}}
{{else if this.primitive}}
{{else}}
const { {{ this.normalizedName }}Schema } = require('./{{ this.normalizedName }}');
{{!-- Import parent as SchemaFunction --}}
{{# if (eq this.normalizedName @root.parentDataType.normalizedName) }}
const { {{ @root.parentDataType.normalizedName }}SchemaFunction } = require('./{{ @root.parentDataType.normalizedName }}');
{{/if}}
{{/if}}
{{/each}}

const [Schema] = [mongoose.Schema];

const [Number, String, Boolean] = [
  mongoose.Schema.Types.Number,
  mongoose.Schema.Types.String,
  mongoose.Schema.Types.Boolean,
];

const {{ dataType.normalizedName }}Schema = {{# if parentDataType }}{{ parentDataType.normalizedName }}SchemaFunction{{ else }}new Schema{{/if}}({
{{# each memberVariables}}
  {{> mongooseMember member=this}},
{{/each}}  
  fhirTitle: { type: String, default: '{{ dataType.normalizedName }}' },
});

class {{ dataType.normalizedName }} extends mongoose.Document {
  constructor(object) {
    super(object, {{ dataType.normalizedName }}Schema);
    this._type = 'FHIR::{{ dataType.normalizedName }}';
  }
}
{{# if (isSchemaFunctionRequired dataType.normalizedName) }}

function {{dataType.normalizedName}}SchemaFunction(add, options) {
  const extended = new Schema({
{{# each memberVariables}}
{{# if (eq this.variableName 'id')}}

{{else}}
  {{> mongooseMember member=this}},
{{/if}}
{{/each}}  
{{# if (isSchemaFunctionRequired dataType.normalizedName) }}
    id: {
      type: String,
      default() {
        return this._id ? this._id.toString() : mongoose.Types.ObjectId().toString();
      },
    },
{{/if}}
  }, options);

  if (add) {
    extended.add(add);
  }
  return extended;
}
{{/if}}

{{# if (isSchemaFunctionRequired dataType.normalizedName) }}
module.exports.{{ dataType.normalizedName }}SchemaFunction = {{ dataType.normalizedName }}SchemaFunction;
{{/if}}
module.exports.{{ dataType.normalizedName }}Schema = {{ dataType.normalizedName }}Schema;
module.exports.{{ dataType.normalizedName }} = {{ dataType.normalizedName }};
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  memberVariables: Array<MemberVariable>;
  imports: Array<DataType>;
}

export default Handlebars.compile<TemplateContext>(source);
