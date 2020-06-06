import IDataType from "../../../model/dataTypes/IDataType";
import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";

export const source = `{{> classImport dataType=this }}
export default class {{ name }}{{# if baseDataType }} extends {{ baseDataType.typeName }}{{/ if }} {
  static readonly baseType: string = "{{ baseFhirType }}";
  static readonly namespace: string = "{{ namespace }}";
  static readonly typeName: string = "{{ fhirName }}";{{# if memberVariables }}
  {{# each memberVariables }}
  {{> complexMember member=this }}

  {{/ each }}
{{/ if }}
{{# if primitive }}

  {{> primitiveParse }}
  {{ else }}

  {{> complexParse }}
  {{/ if }}
}
`;

export interface ITemplateContext {
  distinctTypes: Array<IDataType>;
  name: string;
  baseDataType: IDataType | null;
  baseFhirType: string;
  namespace: string;
  fhirName: string;
  memberVariables: Array<MemberVariable>;
}

export default Handlebars.compile<ITemplateContext>(source);
