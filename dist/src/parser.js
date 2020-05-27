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
const fs_1 = require("fs");
const xml2js_1 = __importDefault(require("xml2js"));
const ModelInfo_1 = __importDefault(require("./model/ModelInfo"));
const parser = new xml2js_1.default.Parser( /* options */);
const readXml = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawFile = yield fs_1.promises.readFile(fullName);
        const parsedXml = yield parser.parseStringPromise(rawFile);
        const modelInfo = new ModelInfo_1.default(parsedXml);
        return modelInfo;
    }
    catch (err) {
        console.error(err);
        throw new Error("Unable to read ModelInfo file");
    }
});
exports.default = readXml;
//# sourceMappingURL=parser.js.map