import Handlebars from "../helpers/templateHelpers";
import complexMemberTemplate from "./complexMemberTemplate";
import systemMemberTemplate from "./systemMemberTemplate";
import transformMemberTemplate from "./transformMemberTemplate";

Handlebars.registerPartial("mongoidComplexMember", complexMemberTemplate);
Handlebars.registerPartial("mongoidSystemMember", systemMemberTemplate);
Handlebars.registerPartial("transformMember", transformMemberTemplate);

export default Handlebars;
