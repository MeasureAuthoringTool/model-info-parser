import Handlebars from "../registerPartials";

export const source = `{{~# unless isRootType ~}}
import I{{ baseTypeName }} from "../{{ this.namespace }}/I{{ baseTypeName }}";
{{/ unless }}
type I{{ name }} = {{# unless isRootType }}I{{/ unless}}{{ baseTypeName }};
export default I{{ name }}; 
`;

export interface ITemplateContext {
  isRootType: boolean;
  baseTypeName: string;
  name: string;
  namespace: string;
}

export default Handlebars.compile<ITemplateContext>(source);
