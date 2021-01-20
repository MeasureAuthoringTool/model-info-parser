import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
{{# each allTypes }}
  {{ this.normalizedName }},
{{/ each }}
} from "./internal";

const typeMapping: Record<string, typeof Type> = {
{{# each allTypes }}
  "{{ this.normalizedName }}": {{ this.normalizedName }}{{# unless @last }},{{/ unless }}
{{/ each }}
};

export const allTypeNames = [
{{# each allTypes }}
  "{{ this.normalizedName }}"{{# unless @last }},{{/ unless }}
{{/ each }}
] as const;

type TypeNames = typeof allTypeNames;
export type TypeName = TypeNames[number];

export function lookupType(typeName: string): typeof Type | undefined {
  return typeMapping[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
`;

export interface TemplateContext {
  allTypes: Array<DataType>;
}

export default Handlebars.compile<TemplateContext>(source);
