import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";
import DataType from "../../../model/dataTypes/DataType";
import EntityMetadata from "../../../model/dataTypes/EntityMetadata";
import EntityImports from "../../../model/dataTypes/EntityImports";

export const source = `{{> interfaceImport dataType=this }}
export default interface I{{ dataType.normalizedName }}{{# if parentDataType }} extends I{{ parentDataType.normalizedName }}{{/ if }} {
{{# if memberVariables }}
  {{# each memberVariables }}
  {{# if dataType.primitive }}
  {{> primitiveMember member=this }}
  
  {{ else }}
  {{> interfaceMember member=this }}
  
  {{/ if }}
  {{/ each }}
{{/ if }}
}
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  metadata: EntityMetadata;
  memberVariables: Array<MemberVariable>;
  imports: EntityImports;
}

export default Handlebars.compile<TemplateContext>(source);
