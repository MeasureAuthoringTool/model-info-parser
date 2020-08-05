import Handlebars from "../helpers/templateHelpers";
import mongooseMemberTemplate from "./mongooseMemberTemplate";

Handlebars.registerPartial("mongooseMember", mongooseMemberTemplate);

export default Handlebars;
