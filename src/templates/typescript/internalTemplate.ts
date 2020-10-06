import Handlebars from "./registerPartials";

export const source = `
/* eslint-disable import/no-cycle */
import { Type } from "./classes/Type";

{{# each interfaceNames }}
export * from "./interfaces/{{ this }}";
{{/ each }}

{{# each classNames }}
export * from "./classes/{{ this }}";
{{/ each }}

export interface FieldMetadata {
  fieldName: string,
  fieldType: Array<typeof Type | typeof String | typeof Boolean | typeof Date | typeof Number>,
  isArray: boolean
}

export * from "./ResourceMapping";
/* eslint-enable import/no-cycle */

`;

export interface TemplateContext {
  classNames: Array<string>;
  interfaceNames: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
