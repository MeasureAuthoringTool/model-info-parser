"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ElementTypeSpecifier_1 = __importDefault(require("./ElementTypeSpecifier"));
const parseDataType_1 = __importDefault(require("./dataTypes/parseDataType"));
const utils_1 = require("../utils");
const MemberVariable_1 = __importDefault(require("./dataTypes/MemberVariable"));
class Element {
    constructor(raw) {
        const { $: attrs } = raw;
        this.name = attrs.name;
        const specifierElementArray = raw["ns4:elementTypeSpecifier"];
        if (specifierElementArray) {
            // Not a simple element... (choice or array)
            const [rawSpecifierElement] = specifierElementArray;
            const elementTypeSpecifier = new ElementTypeSpecifier_1.default(this.name, rawSpecifierElement);
            this.memberVariables = elementTypeSpecifier.memberVariables;
        }
        else {
            // Simple element def
            const elementType = attrs.elementType;
            const [namespace, normalizedTypeName] = utils_1.normalizeElementTypeName(elementType);
            const dataType = parseDataType_1.default(namespace, normalizedTypeName);
            this.memberVariables = [new MemberVariable_1.default(dataType, this.name, false)];
        }
    }
}
exports.default = Element;
//# sourceMappingURL=Element.js.map