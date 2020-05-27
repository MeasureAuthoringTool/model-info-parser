"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TypeInfo_1 = __importDefault(require("./TypeInfo"));
exports.typeName = "ns4:modelInfo";
exports.typeInfoTypeName = "ns4:typeInfo";
class ModelInfo {
    constructor(raw) {
        const { $: attrs, [exports.typeInfoTypeName]: rawTypeInfoArr } = raw[exports.typeName];
        this.name = attrs.name;
        this.version = attrs.version;
        this.types = rawTypeInfoArr.map((rawType) => new TypeInfo_1.default(rawType));
        this.complexTypes = this.types.filter((type) => !type.isReservedKeyword && !type.isBlacklisted);
    }
}
exports.default = ModelInfo;
//# sourceMappingURL=ModelInfo.js.map