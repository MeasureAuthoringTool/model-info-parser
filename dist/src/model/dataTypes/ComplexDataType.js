"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const primitiveDataTypes_1 = require("./primitiveDataTypes");
class ComplexDataType {
    constructor(namespace, typeName, systemType = false) {
        this.namespace = namespace;
        this.typeName = typeName;
        this.systemType = systemType;
        this.normalizedName = utils_1.normalizeTypeName(this.typeName);
        this.primitive = primitiveDataTypes_1.primitiveTypeCheck(this.typeName);
    }
}
exports.default = ComplexDataType;
//# sourceMappingURL=ComplexDataType.js.map