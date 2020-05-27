#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const parser_1 = __importDefault(require("./parser"));
const TypeScriptGenerator_1 = __importDefault(require("./generators/TypeScriptGenerator"));
/*
FHIR JSON Spec
https://www.hl7.org/fhir/DSTU2/json.html
// TODO what about Value Sets?
- Look at Address in modelinfo. It has an AddressType element (which has a value, of type string -> alias to string)
- But in the spec, you see that "type" on "Address" is defined as a "code", and seems to be a ValueSet of type AddressType
- How can you tell which of these fields reference a ValueSet?

// TODO everything should be nullable/undefined
// TODO date/dateTime/instant/time elements should probably be a string

TODO "Resource" types (top-level) will have a "resourceType" member

Also, way down the line: can we validate? (for an example, an unsigned int will be a "number" in ts)
Might need to store a static, type layout in the class definition to help with custom validation rules
(e.g. "foo is an unsigned int, bar is an "instant", etc)


// TODO system numbers should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
// See https://www.hl7.org/fhir/json.html

// TODO what about "contextRelationship" and "context"? (I think it's like a Resource referencing another resource

 */
commander_1.program.version(package_json_1.version);
// Get the location of the modelinfo.xml file from CLI args
// Default is the FHIR modelinfo.xml file in resources
commander_1.program.requiredOption("-f, --modelinfo-file <file>", "modelinfo.xml file being parsed", `${__dirname}/../resources/fhir-modelinfo-4.0.1.xml`);
// Get the output directory from CLI args
// Default is /generated/{namespace} e.g. /generated/FHIR
commander_1.program.requiredOption("-o, --output-directory <file>", "output directory for generated code", `${__dirname}/../generated`);
const { modelinfoFile, outputDirectory } = commander_1.program;
console.log(`Parsing ${modelinfoFile} and writing to ${outputDirectory}`);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const modelInfo = yield parser_1.default(modelinfoFile);
    const { complexTypes } = modelInfo;
    const generator = new TypeScriptGenerator_1.default(outputDirectory);
    const promises = complexTypes.map((typeInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const generated = yield generator.generate(typeInfo);
        return generated;
    }));
    const generatedTypes = yield Promise.all(promises);
});
main()
    .then((result) => {
    console.log("Done");
})
    .catch((err) => {
    console.error("ERROR");
    console.error(err);
});
//# sourceMappingURL=generateTypeScript.js.map