import Handlebars from "../helpers/templateHelpers";
import classImportTemplate from "./classes/classImportTemplate";
import complexMemberTemplate from "./classes/complexMemberTemplate";
import complexParseTemplate from "./classes/complexParseTemplate";
import primitiveParseTemplate from "./classes/primitiveParseTemplate";
import choiceTypeTemplate from "./classes/choiceTypeTemplate";
import interfaceChoiceTypeTemplate from "./interfaces/interfaceChoiceTypeTemplate";
import interfaceMemberTemplate from "./interfaces/interfaceMemberTemplate";
import primitiveMemberTemplate from "./interfaces/primitiveMemberTemplate";
import parseSingleMemberTemplate from "./classes/parseSingleMemberTemplate";
import parseChoiceMemberTemplate from "./classes/parseChoiceMemberTemplate";

Handlebars.registerPartial("classImport", classImportTemplate);
Handlebars.registerPartial("complexMember", complexMemberTemplate);
Handlebars.registerPartial("interfaceMember", interfaceMemberTemplate);
Handlebars.registerPartial("primitiveMember", primitiveMemberTemplate);
Handlebars.registerPartial("choiceType", choiceTypeTemplate);
Handlebars.registerPartial("interfaceChoiceType", interfaceChoiceTypeTemplate);
Handlebars.registerPartial("primitiveParse", primitiveParseTemplate);
Handlebars.registerPartial("complexParse", complexParseTemplate);
Handlebars.registerPartial("parseSingleMember", parseSingleMemberTemplate);
Handlebars.registerPartial("parseChoiceMember", parseChoiceMemberTemplate);

export default Handlebars;
