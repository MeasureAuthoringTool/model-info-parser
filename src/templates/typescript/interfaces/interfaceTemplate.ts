import IDataType from "../../../model/dataTypes/IDataType";
import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Element from "../../../model/Element";
import Handlebars from "../registerPartials";

export const source = `{{> interfaceImport dataType=this }}
export default interface I{{ name }}{{# if baseDataType }} extends I{{ baseDataType.typeName }}{{/ if }} {
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

export interface ITemplateContext {
  baseDataType: IDataType | null;
  memberVariables: Array<MemberVariable>;
  distinctTypes: Array<IDataType>;
  name: string;
}

export default Handlebars.compile<ITemplateContext>(source);
