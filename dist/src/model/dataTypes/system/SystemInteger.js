"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO this should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
// See https://www.hl7.org/fhir/json.html
class SystemInteger {
    constructor() {
        this.namespace = "System";
        this.typeName = "number";
        this.normalizedName = "number";
        this.systemType = true;
        this.primitive = true;
    }
}
exports.default = SystemInteger;
//# sourceMappingURL=SystemInteger.js.map