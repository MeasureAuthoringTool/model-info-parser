import IDataType from "../../model/dataTypes/IDataType";
import Element from "../../model/Element";
import Handlebars from "./registerPartials";

export const source = `{{> classImport dataType=this}}
type {{name}} = {{baseDataType.typeName}};

export default {{name}};
`;

export interface ITemplateContext {
  distinctTypes: Array<IDataType>;
  name: string;
  namespace: string;
  elements: Array<Element>;
}

export default Handlebars.compile<ITemplateContext>(source);
