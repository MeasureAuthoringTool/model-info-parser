import Handlebars from "handlebars";
import { source as classImportSource } from "./classImportTemplate";
import { source as complexMemberSource } from "./complexMemberTemplate";

Handlebars.registerPartial("classImport", classImportSource);
Handlebars.registerPartial("complexMember", complexMemberSource);

export default Handlebars;
