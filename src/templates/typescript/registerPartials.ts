import Handlebars from "handlebars";
import { source as classImportSource } from "./classes/classImportTemplate";
import { source as complexMemberSource } from "./classes/complexMemberTemplate";
import { source as complexParseSource } from "./classes/complexParseTemplate";
import { source as primitiveParseSource } from "./classes/primitiveParseTemplate";
import { source as interfaceImportSource } from "./interfaces/interfaceImportTemplate";
import { source as interfaceMemberSource } from "./interfaces/interfaceMemberTemplate";
import { source as primitiveMemberSource } from "./interfaces/primitiveMemberTemplate";

Handlebars.registerPartial("classImport", classImportSource);
Handlebars.registerPartial("interfaceImport", interfaceImportSource);
Handlebars.registerPartial("complexMember", complexMemberSource);
Handlebars.registerPartial("interfaceMember", interfaceMemberSource);
Handlebars.registerPartial("primitiveMember", primitiveMemberSource);
Handlebars.registerPartial("primitiveParse", primitiveParseSource);
Handlebars.registerPartial("complexParse", complexParseSource);

export default Handlebars;
