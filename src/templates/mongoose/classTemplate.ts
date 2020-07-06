import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";
import MemberVariable from "../../model/dataTypes/MemberVariable";

export const source = `{{!-- Imports --}}
{{# each imports}} 
{{# if this.systemType}}{{!-- Skip systemType  --}}
{{else}}
{{!-- Import parent schema explicitly to make sure it has been initialized. --}}
{{# if (eq this.normalizedName @root.parentDataType.normalizedName) }}
const { {{ @root.parentDataType.normalizedName }}Schema } = require('./{{ @root.parentDataType.normalizedName }}');
{{else}}
const { {{ this.normalizedName }}Schema } = require('./allSchemaHeaders.js');
{{/if}}
{{/if}}
{{/each}}
{{!-- Imports the header (empty schema placeholder to resolve circular dependencies) --}}
const { {{ dataType.normalizedName }}Schema } = require('./allSchemaHeaders.js');
{{!-- Add all parent fields to the schema --}}

{{# if parentDataType }}
{{ dataType.normalizedName }}Schema.add({{ this.parentDataType.normalizedName }}Schema);
{{ dataType.normalizedName }}Schema.remove('id');
{{# if (isMongooseSchemaFunctionIdRequired dataType.normalizedName) }}
{{ dataType.normalizedName }}Schema.add({
    id: {
      type: String,
      default() {
        return this._id ? this._id.toString() : mongoose.Types.ObjectId().toString();
      }
    }
 });
{{/if}}
{{/if}}
{{!-- Extend schema definition --}}
{{ dataType.normalizedName }}Schema.add({
{{# each memberVariables}}
  {{> mongooseMember member=this}},
{{/each}}
});

module.exports.{{ dataType.normalizedName }}Schema = {{ dataType.normalizedName }}Schema;
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  memberVariables: Array<MemberVariable>;
  imports: Array<DataType>;
}

export default Handlebars.compile<TemplateContext>(source);
