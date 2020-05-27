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
const classTemplate_1 = __importDefault(require("../templates/typescript/classTemplate"));
const typeAliasTemplate_1 = __importDefault(require("../templates/typescript/typeAliasTemplate"));
const FileWriter_1 = __importDefault(require("../FileWriter"));
class TypeScriptGenerator {
    constructor(baseDirectory) {
        this.baseDirectory = baseDirectory;
    }
    generate(typeInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let contents;
            if (typeInfo.aliasType) {
                contents = typeAliasTemplate_1.default(typeInfo);
            }
            else {
                contents = classTemplate_1.default(typeInfo);
            }
            const { namespace, name } = typeInfo;
            const fileName = `${name}.ts`;
            const writer = new FileWriter_1.default(contents, this.baseDirectory, namespace, fileName);
            yield writer.writeFile();
            return contents;
        });
    }
}
exports.default = TypeScriptGenerator;
//# sourceMappingURL=TypeScriptGenerator.js.map