export default `{{# if distinctTypes }}
{{# each distinctTypes }}
import I{{ this.normalizedName }} from "../{{ this.namespace }}/I{{ this.normalizedName }}";
{{/ each }}

{{/ if }}`;
