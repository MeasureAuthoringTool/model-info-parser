import Handlebars from "../registerPartials";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention */
{{# unless skipImports }}
import { {{ baseTypeName }} } from "../internal";

{{/ unless}}
export type {{ name }} = {{ baseTypeName }};
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention */
`;

export interface TemplateContext {
  skipImports: boolean;
  baseTypeName: string;
  name: string;
}

export default Handlebars.compile<TemplateContext>(source);
