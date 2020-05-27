"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const complexMemberTemplate_1 = require("./complexMemberTemplate");
const primitiveMemberTemplate_1 = require("./primitiveMemberTemplate");
const classImportTemplate_1 = require("./classImportTemplate");
handlebars_1.default.registerPartial("classImport", classImportTemplate_1.source);
handlebars_1.default.registerPartial("complexMember", complexMemberTemplate_1.source);
handlebars_1.default.registerPartial("primitiveMember", primitiveMemberTemplate_1.source);
exports.default = handlebars_1.default;
//# sourceMappingURL=registerPartials.js.map