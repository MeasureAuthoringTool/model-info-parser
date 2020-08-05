import Handlebars from "./registerPartials";
import DataType from "../../model/dataTypes/DataType";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  Resource,
{{# each resourceTypes }}
  I{{ this.normalizedName }},
{{/ each }}
{{# each resourceTypes }}
  {{ this.normalizedName }},
{{/ each }}
} from "./internal";

const resourceBundle: Record<string, typeof Resource> = {
{{# each resourceTypes }}
  "{{ this.normalizedName }}": {{ this.normalizedName }}{{# unless @last }},{{/ unless }}
{{/ each }}
};

export type AnyResource =
{{# each resourceTypes }}
  I{{ this.normalizedName }}{{# unless @last }} |{{/ unless}}{{# if @last }};{{/ if }}
{{/ each }}

export function lookupResourceType(typeName: string): typeof Resource | undefined {
  return resourceBundle[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
`;

export interface TemplateContext {
  resourceTypes: Array<DataType>;
}

export default Handlebars.compile<TemplateContext>(source);
