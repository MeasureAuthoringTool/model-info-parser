import Handlebars from "./registerPartials";
import DataType from "../model/dataTypes/DataType";
import Element from "../model/Element";

export const source =
`{{> classImport dataType=this}}
type {{name}} = {{baseDataType.typeName}};

export default {{name}};
`;

export interface TemplateContext {
  distinctTypes: Array<DataType>;
  name: string;
  namespace: string;
  elements: Array<Element>;
}

export default Handlebars.compile<TemplateContext>(source);
