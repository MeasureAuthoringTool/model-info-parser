import Handlebars from "../helpers/templateHelpers";
import complexMemberTemplate from "./complexMemberTemplate";
import transformMemberTemplate from "./transformMemberTemplate";

Handlebars.registerPartial("mongoidComplexMember", complexMemberTemplate);
Handlebars.registerPartial("transformMember", transformMemberTemplate);

export default Handlebars;
