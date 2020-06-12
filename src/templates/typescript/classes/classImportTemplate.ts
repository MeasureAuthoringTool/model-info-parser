export default `{{# if imports.dataTypes }}
{{# each imports.dataTypes }}
import {{ this.normalizedName }} from "../{{ this.namespace }}/{{ this.normalizedName }}";
{{/ each }}

{{/ if }}`;
