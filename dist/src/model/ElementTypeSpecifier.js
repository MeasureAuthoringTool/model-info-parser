"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const MemberVariable_1 = __importDefault(require("./dataTypes/MemberVariable"));
const utils_1 = require("../utils");
const parseDataType_1 = __importDefault(require("./dataTypes/parseDataType"));
var TypeSpecifier;
(function (TypeSpecifier) {
    TypeSpecifier["ListTypeSpecifier"] = "ns4:ListTypeSpecifier";
    TypeSpecifier["ChoiceTypeSpecifier"] = "ns4:ChoiceTypeSpecifier";
})(TypeSpecifier = exports.TypeSpecifier || (exports.TypeSpecifier = {}));
class ElementTypeSpecifier {
    constructor(parentElementName, raw) {
        this.parentElementName = parentElementName;
        const { $: attrs } = raw;
        const type = attrs["xsi:type"];
        this.memberVariables = [];
        switch (type) {
            case "ns4:ListTypeSpecifier":
                this.specifierType = TypeSpecifier.ListTypeSpecifier;
                break;
            case "ns4:ChoiceTypeSpecifier":
                this.specifierType = TypeSpecifier.ChoiceTypeSpecifier;
                break;
            default:
                throw new Error(`Unsupported ElementTypeSpecifier: ${type}`);
        }
        if (this.specifierType === TypeSpecifier.ChoiceTypeSpecifier) {
            const choiceArray = raw["ns4:choice"];
            choiceArray.forEach((specifier) => {
                const dataType = ElementTypeSpecifier.convertSpecifierToDataType(specifier);
                const { typeName } = dataType;
                const capitalTypeName = lodash_1.default.upperFirst(typeName);
                const memberName = parentElementName + capitalTypeName;
                this.memberVariables.push(new MemberVariable_1.default(dataType, memberName, false));
            });
        }
        else if (this.specifierType === TypeSpecifier.ListTypeSpecifier) {
            const namedSpecifierArray = raw["ns4:elementTypeSpecifier"];
            if (namedSpecifierArray) {
                // The more complex way, with child "NameTypeSpecifier" elements
                const [specifier] = namedSpecifierArray;
                const dataType = ElementTypeSpecifier.convertSpecifierToDataType(specifier);
                this.memberVariables.push(new MemberVariable_1.default(dataType, parentElementName, true));
            }
            else {
                // The simpler variety of lists- no child "elementTypeSpecifier NameTypeSpecifier" elements
                const elementType = attrs.elementType;
                const [namespace, normalizedTypeName] = utils_1.normalizeElementTypeName(elementType);
                const dataType = parseDataType_1.default(namespace, normalizedTypeName);
                this.memberVariables.push(new MemberVariable_1.default(dataType, parentElementName, true));
            }
        }
        else {
            throw new Error(`Unsupported TypeSpecifier ${this.specifierType}`);
        }
    }
    static convertSpecifierToDataType(specifier) {
        const { $: specifierAttrs } = specifier;
        const { name, modelName } = specifierAttrs;
        const normalizedName = utils_1.normalizeTypeName(name);
        return parseDataType_1.default(modelName, normalizedName);
    }
}
exports.default = ElementTypeSpecifier;
//# sourceMappingURL=ElementTypeSpecifier.js.map