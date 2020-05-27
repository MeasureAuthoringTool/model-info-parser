"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeElementTypeName(elementType) {
    const tokens = elementType.split(/\./);
    if (tokens.length < 2) {
        throw new Error(`Invalid elementType encountered: ${elementType}`);
    }
    const [ns, ...typeArr] = tokens;
    const name = typeArr.reduce((accumulator, currentToken) => accumulator + currentToken, "");
    return [ns, name];
}
exports.normalizeElementTypeName = normalizeElementTypeName;
function normalizeTypeName(typeName) {
    const regex = /[\.\s]*/gi;
    return typeName.replace(regex, "");
}
exports.normalizeTypeName = normalizeTypeName;
//# sourceMappingURL=utils.js.map