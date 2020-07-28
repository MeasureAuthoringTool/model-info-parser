import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";
import DataType from "../../../model/dataTypes/DataType";
import EntityMetadata from "../../../model/dataTypes/EntityMetadata";
import EntityImports from "../../../model/dataTypes/EntityImports";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle */
{{# if imports.dataTypes }}import { 
{{# each imports.dataTypes }}
  {{ this.normalizedName }},
{{/ each }}
} from "../internal";

{{/ if }}
export class {{ dataType.normalizedName }}{{# if parentDataType }} extends {{ parentDataType.normalizedName }}{{/ if }} {
  static readonly baseType: string = "{{ metadata.parentTypeName }}";

  static readonly namespace: string = "{{ metadata.namespace }}";

  static readonly typeName: string = "{{ metadata.originalTypeName }}";

  {{# each memberVariables }}
  {{> complexMember member=this }}


  {{ else }}
  {{/ each }}
{{# if dataType.primitive }}
  {{> primitiveParse }}
  {{ else }}
  {{> complexParse }}
  {{/ if }}
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  metadata: EntityMetadata;
  memberVariables: Array<MemberVariable>;
  imports: EntityImports;
}

export default Handlebars.compile<TemplateContext>(source);
