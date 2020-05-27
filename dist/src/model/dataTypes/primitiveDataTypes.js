"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitiveTypeNames = [
    "base64Binary",
    "boolean",
    "canonical",
    "code",
    "date",
    "dateTime",
    "decimal",
    "id",
    "instant",
    "integer",
    "markdown",
    "oid",
    "positiveInt",
    "question",
    "string",
    "time",
    "unsignedInt",
    "uri",
    "url",
    "uuid",
    "xhtml",
];
function primitiveTypeCheck(name) {
    return exports.primitiveTypeNames.includes(name);
}
exports.primitiveTypeCheck = primitiveTypeCheck;
/**
 * Checks if any of the specified types are primitive
 * @param distinctTypes
 * @returns true if any of the provided types are primitive
 */
function containsPrimitive(distinctTypes) {
    const firstPrimitive = distinctTypes.find((type) => primitiveTypeCheck(type.typeName));
    return !!firstPrimitive;
}
exports.containsPrimitive = containsPrimitive;
//# sourceMappingURL=primitiveDataTypes.js.map