import IDataType from "../../model/dataTypes/IDataType";
import Element from "../../model/Element";
import Handlebars from "./registerPartials";

export const source = `{{> classImport dataType=this }}
export default class {{ name }}{{# if baseDataType }} extends {{ baseDataType.typeName }}{{/ if }} {
  static readonly baseType: string = "{{ baseFhirType }}";
  static readonly namespace: string = "{{ namespace }}";
  static readonly typeName: string = "{{ fhirName }}";
  
  {{# each memberVariables }}
  {{> complexMember member=this }}

  {{/ each }}
}
`;

export interface ITemplateContext {
  distinctTypes: Array<IDataType>;
  name: string;
  namespace: string;
  elements: Array<Element>;
}

export default Handlebars.compile<ITemplateContext>(source);
