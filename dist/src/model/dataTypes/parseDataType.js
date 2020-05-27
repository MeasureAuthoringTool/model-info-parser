"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComplexDataType_1 = __importDefault(require("./ComplexDataType"));
const SystemBoolean_1 = __importDefault(require("./system/SystemBoolean"));
const SystemDate_1 = __importDefault(require("./system/SystemDate"));
const SystemDateTime_1 = __importDefault(require("./system/SystemDateTime"));
const SystemDecimal_1 = __importDefault(require("./system/SystemDecimal"));
const SystemInteger_1 = __importDefault(require("./system/SystemInteger"));
const SystemString_1 = __importDefault(require("./system/SystemString"));
const SystemTime_1 = __importDefault(require("./system/SystemTime"));
function parseDataType(ns, normalizedTypeName) {
    if (ns === "FHIR") {
        // We treat "FHIR.string" and "FHIR.boolean" differently because they are reserved TS keywords.
        // The other "system" types get generated as type aliases. E.g. "FHIR.integer" is just an alias to "number"
        switch (normalizedTypeName) {
            case "string":
                return new SystemString_1.default();
            case "boolean":
                return new SystemBoolean_1.default();
            default:
                return new ComplexDataType_1.default(ns, normalizedTypeName);
        }
    }
    if (ns !== "System") {
        throw new Error(`Unexpected namespace: ${ns}`);
    }
    // Handle the "System" namespace types
    switch (normalizedTypeName) {
        case "Boolean":
            return new SystemBoolean_1.default();
        case "Date":
            return new SystemDate_1.default();
        case "Decimal":
            return new SystemDecimal_1.default();
        case "DateTime":
            return new SystemDateTime_1.default();
        case "Integer":
            return new SystemInteger_1.default();
        case "String":
            return new SystemString_1.default();
        case "Time":
            return new SystemTime_1.default();
        default:
            throw new Error(`Unrecognized System type: ${normalizedTypeName}`);
    }
}
exports.default = parseDataType;
//# sourceMappingURL=parseDataType.js.map