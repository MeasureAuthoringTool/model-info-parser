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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileWriter {
    constructor(contents, baseDirectory, subDir, fileName) {
        this.contents = contents;
        this.baseDirectory = baseDirectory;
        this.subDir = subDir;
        this.fileName = fileName;
        this.fullPath = baseDirectory;
        if (this.subDir) {
            this.fullPath = `${this.fullPath}/${this.subDir}`;
        }
        this.fullFileName = `${this.fullPath}/${this.fileName}`;
    }
    writeFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.mkdir(this.fullPath, { recursive: true });
                yield fs_1.promises.writeFile(this.fullFileName, this.contents);
            }
            catch (err) {
                console.error(err);
                throw new Error(`Unable to write file ${this.fullFileName}`);
            }
        });
    }
}
exports.default = FileWriter;
//# sourceMappingURL=FileWriter.js.map