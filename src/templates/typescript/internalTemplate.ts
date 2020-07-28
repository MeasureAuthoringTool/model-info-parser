import Handlebars from "./registerPartials";

export const source = `
/* eslint-disable import/no-cycle */
{{# each interfaceNames }}
export * from "./interfaces/{{ this }}";
{{/ each }}

{{# each classNames }}
export * from "./classes/{{ this }}";
{{/ each }}
/* eslint-enable import/no-cycle */

`;

export interface TemplateContext {
  classNames: Array<string>;
  interfaceNames: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
