export default `{{# each imports.dataTypes }}
import {{ this.normalizedName }} from "
{{~# if (eq this.namespace ../metadata.namespace) ~}}
.
{{~ else ~}}
../{{ this.namespace }}
{{~/ if ~}}/{{ this.normalizedName }}";
{{/ each }}

`;
