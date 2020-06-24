import Handlebars from "../helpers/templateHelpers";
import classImportTemplate from "./classes/classImportTemplate";
import complexMemberTemplate from "./classes/complexMemberTemplate";
import complexParseTemplate from "./classes/complexParseTemplate";
import primitiveParseTemplate from "./classes/primitiveParseTemplate";
import interfaceImportTemplate from "./interfaces/interfaceImportTemplate";
import interfaceMemberTemplate from "./interfaces/interfaceMemberTemplate";
import primitiveMemberTemplate from "./interfaces/primitiveMemberTemplate";

Handlebars.registerPartial("classImport", classImportTemplate);
Handlebars.registerPartial("interfaceImport", interfaceImportTemplate);
Handlebars.registerPartial("complexMember", complexMemberTemplate);
Handlebars.registerPartial("interfaceMember", interfaceMemberTemplate);
Handlebars.registerPartial("primitiveMember", primitiveMemberTemplate);
Handlebars.registerPartial("primitiveParse", primitiveParseTemplate);
Handlebars.registerPartial("complexParse", complexParseTemplate);

export default Handlebars;
