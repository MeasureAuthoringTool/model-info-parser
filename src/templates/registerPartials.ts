import Handlebars from "handlebars";
import { source as complexMemberSource } from "./complexMemberTemplate";
import { source as primitiveMemberSource } from "./primitiveMemberTemplate";
import { source as classImportSource } from "./classImportTemplate";

Handlebars.registerPartial("classImport", classImportSource);
Handlebars.registerPartial("complexMember", complexMemberSource);
Handlebars.registerPartial("primitiveMember", primitiveMemberSource);

export default Handlebars;