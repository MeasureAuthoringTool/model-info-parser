"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const primitiveDataTypes_1 = require("./primitiveDataTypes");
const ComplexDataType_1 = __importDefault(require("./ComplexDataType"));
// We use this to remove the type being declared from the list of things to import
// Some classes reference themselves as member variables
function typeMatch(type, normalizedName, namespace) {
    return type.namespace === namespace && type.normalizedName === normalizedName;
}
function distinctDataTypes(input, baseDataType, normalizedName, namespace) {
    const initial = [];
    if (baseDataType && !baseDataType.systemType) {
        initial.push(baseDataType);
    }
    const allDataTypes = input.reduce((accumulator, currentMemberVar) => {
        accumulator.push(currentMemberVar.dataType);
        return accumulator;
    }, []);
    const result = allDataTypes.reduce((accumulator, currentType) => {
        if (!currentType.systemType &&
            !typeMatch(currentType, normalizedName, namespace) &&
            !lodash_1.default.find(accumulator, currentType)) {
            accumulator.push(currentType);
        }
        return accumulator;
    }, initial);
    // We need to check if any of the members are primitives. If so, we should add the Extension to the list of imports
    // (unless we're looking at Extension, itself, or it's already been added)
    if (normalizedName !== "Extension" &&
        primitiveDataTypes_1.containsPrimitive(allDataTypes) &&
        !result.find((type) => type.typeName === "Extension")) {
        result.push(new ComplexDataType_1.default("FHIR", "Extension"));
    }
    return result;
}
exports.default = distinctDataTypes;
//# sourceMappingURL=distinctDataTypes.js.map