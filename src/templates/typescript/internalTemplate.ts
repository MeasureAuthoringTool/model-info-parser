import Handlebars from "./registerPartials";

export const source = `/* eslint-disable import/no-cycle */
export * from "./FieldMetadata";
export * from "./Decorators";

{{# each interfaceNames }}
export * from "./interfaces/{{ this }}";
{{/ each }}

{{# each classNames }}
export * from "./classes/{{ this }}";
{{/ each }}

export * from "./ResourceMapping";
export * from "./TypeMapping";

/* eslint-enable import/no-cycle */
`;

export interface TemplateContext {
  classNames: Array<string>;
  interfaceNames: Array<string>;
}

export default Handlebars.compile<TemplateContext>(source);
