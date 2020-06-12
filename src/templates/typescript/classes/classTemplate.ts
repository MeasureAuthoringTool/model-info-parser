import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";
import DataType from "../../../model/dataTypes/DataType";
import EntityMetadata from "../../../model/dataTypes/EntityMetadata";
import EntityImports from "../../../model/dataTypes/EntityImports";

export const source = `{{> classImport dataType=this }}
export default class {{ dataType.normalizedName }}{{# if parentDataType }} extends {{ parentDataType.normalizedName }}{{/ if }} {
  static readonly baseType: string = "{{ metadata.parentTypeName }}";
  static readonly namespace: string = "{{ metadata.namespace }}";
  static readonly typeName: string = "{{ metadata.originalTypeName }}";{{# if memberVariables }}
  {{# each memberVariables }}
  {{> complexMember member=this }}

  {{/ each }}
{{/ if }}
{{# if dataType.primitive }}

  {{> primitiveParse }}
  {{ else }}

  {{> complexParse }}
  {{/ if }}
}
`;

export interface ITemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  metadata: EntityMetadata;
  memberVariables: Array<MemberVariable>;
  imports: EntityImports;
}

export default Handlebars.compile<ITemplateContext>(source);
