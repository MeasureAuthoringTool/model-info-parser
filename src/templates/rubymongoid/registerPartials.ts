import Handlebars from "../helpers/templateHelpers";
import complexMemberTemplate from "./complexMemberTemplate";
import systemMemberTemplate from "./systemMemberTemplate";

Handlebars.registerPartial("mongoidComplexMember", complexMemberTemplate);
Handlebars.registerPartial("mongoidSystemMember", systemMemberTemplate);

export default Handlebars;
