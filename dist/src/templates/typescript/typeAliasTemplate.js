"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerPartials_1 = __importDefault(require("./registerPartials"));
exports.source = `{{> classImport dataType=this}}
type {{name}} = {{baseDataType.typeName}};

export default {{name}};
`;
exports.default = registerPartials_1.default.compile(exports.source);
//# sourceMappingURL=typeAliasTemplate.js.map