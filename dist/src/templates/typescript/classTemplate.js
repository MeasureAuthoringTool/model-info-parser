"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerPartials_1 = __importDefault(require("./registerPartials"));
exports.source = `{{> classImport dataType=this}}
export default class {{name}}{{#if baseDataType}} extends {{baseDataType.typeName}}{{/if}} {
  static readonly baseType: string = "{{baseFhirType}}";
  static readonly namespace: string = "{{namespace}}";
  static readonly typeName: string = "{{fhirName}}";
  
  {{#each memberVariables}}
  {{#if this.dataType.primitive}}{{> primitiveMember member=this}}{{else}}{{> complexMember member=this}}{{/if}}
  {{/each}}
}
`;
exports.default = registerPartials_1.default.compile(exports.source);
//# sourceMappingURL=classTemplate.js.map