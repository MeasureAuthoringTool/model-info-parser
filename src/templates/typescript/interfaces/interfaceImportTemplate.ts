export default `{{# if imports.dataTypes }}
{{# each imports.dataTypes }}
import I{{ this.normalizedName }} from "../{{ this.namespace }}/I{{ this.normalizedName }}";
{{/ each }}

{{/ if }}`;
