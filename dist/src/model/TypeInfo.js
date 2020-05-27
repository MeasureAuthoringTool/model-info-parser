"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Element_1 = __importDefault(require("./Element"));
const distinctDataTypes_1 = __importDefault(require("./dataTypes/distinctDataTypes"));
const MemberVariable_1 = __importDefault(require("./dataTypes/MemberVariable"));
const parseDataType_1 = __importDefault(require("./dataTypes/parseDataType"));
const primitiveDataTypes_1 = require("./dataTypes/primitiveDataTypes");
const SystemString_1 = require("./dataTypes/system/SystemString");
const ComplexDataType_1 = __importDefault(require("./dataTypes/ComplexDataType"));
const elementTypeName = "ns4:element";
// We treat "string" and "boolean" differently because they are reserved TS keywords.
// The other "system" types get generated as type aliases. E.g. "FHIR.integer" is just an alias to TS "number"
const reservedKeywordTypeNames = ["boolean", "string"];
// These are FHIR types we don't know how to deal with (and hope we never have to)
const blacklistedTypes = ["allowedUnits", "DataElement constraint on ElementDefinition data type"];
class TypeInfo {
    constructor(raw) {
        this.aliasType = false;
        const attrs = raw.$;
        const rawElementsArr = raw[elementTypeName] || [];
        this.fhirName = attrs.name;
        this.name = utils_1.normalizeTypeName(this.fhirName);
        this.namespace = attrs.namespace;
        // Parse the parent class/baseType info
        // TODO What about "baseTypeSpecifier"? Only on "allowedUnits"??
        this.baseFhirType = attrs.baseType;
        if (this.baseFhirType) {
            const [baseNamespace, normalizedBaseTypeName] = utils_1.normalizeElementTypeName(this.baseFhirType);
            this.baseDataType = parseDataType_1.default(baseNamespace, normalizedBaseTypeName);
        }
        else {
            this.baseDataType = null;
        }
        // Convert raw XML into our Element type
        this.elements = [];
        rawElementsArr.forEach((rawElement) => {
            this.elements.push(new Element_1.default(rawElement));
        });
        // No data members, just an alias to the parent type
        if (this.elements.length === 0) {
            this.aliasType = true;
        }
        // Just a single member, whose name is "value"
        if (this.elements.length === 1 && this.elements[0].name === "value") {
            const [valueElement] = this.elements;
            if (valueElement.memberVariables.length === 1) {
                // Just a simple alias type
                this.aliasType = true;
                this.baseDataType = valueElement.memberVariables[0].dataType;
            }
            else {
                // Leave the field alone.
                // The value can be a choice of types. Look at Contract.Term.Offer.Answer as an example
            }
        }
        this.memberVariables = this.elements.reduce((accumulator, currentElement) => {
            return accumulator.concat(currentElement.memberVariables);
        }, []);
        this.distinctTypes = distinctDataTypes_1.default(this.memberVariables, this.baseDataType, this.name, this.namespace);
        this.isReservedKeyword = reservedKeywordTypeNames.includes(this.name);
        this.isBlacklisted = blacklistedTypes.includes(this.fhirName);
        this.primitive = primitiveDataTypes_1.primitiveTypeCheck(this.name);
        // Check if we're looking at "Extension". We have to treat that differently to prevent circular dependencies
        if (this.namespace === "FHIR" && this.name === "Extension") {
            // Remove "Element" from the list of imports
            this.distinctTypes = this.distinctTypes.filter((type) => type.typeName !== "Element");
            // Stop being a child of Element
            this.baseDataType = null;
            // Add the "id" property (just like Element)
            this.memberVariables.push(new MemberVariable_1.default(SystemString_1.SystemStringInstance, "id"));
            // Add an Array of Extensions to itself (just like Element)
            const extensionDataType = new ComplexDataType_1.default("FHIR", "Extension");
            this.memberVariables.push(new MemberVariable_1.default(extensionDataType, "extension", true));
        }
    }
}
exports.default = TypeInfo;
//# sourceMappingURL=TypeInfo.js.map