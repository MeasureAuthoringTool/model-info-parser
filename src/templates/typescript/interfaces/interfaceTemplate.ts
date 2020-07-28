import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";
import DataType from "../../../model/dataTypes/DataType";
import EntityMetadata from "../../../model/dataTypes/EntityMetadata";
import EntityImports from "../../../model/dataTypes/EntityImports";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
{{# if imports.dataTypes }}import { 
{{# each imports.dataTypes }}
  {{ this.normalizedName }},
{{/ each }}
} from "../internal";

{{/ if }}
export interface {{ dataType.normalizedName }}{{# if parentDataType }} extends {{ parentDataType.normalizedName }}{{/ if }} {
{{# if memberVariables }}
  {{# each memberVariables }}
  {{# if dataType.primitive }}
  {{> primitiveMember member=this }}
  {{ else }}
  {{> interfaceMember member=this }}
  {{/ if }}
  {{# unless @last }}

  {{/ unless }}
  {{/ each }}
{{/ if }}

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  metadata: EntityMetadata;
  memberVariables: Array<MemberVariable>;
  imports: EntityImports;
}

export default Handlebars.compile<TemplateContext>(source);
