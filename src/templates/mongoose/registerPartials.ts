import Handlebars from "handlebars";
import {
  eq,
  getMongoosePrimitive,
  isSchemaFunctionIdRequired,
  isSchemaFunctionRequired,
} from "./templateHelpers";
import mongooseMemberTemplate from "./mongooseMemberTemplate";

Handlebars.registerPartial("mongooseMember", mongooseMemberTemplate);

Handlebars.registerHelper("getMongoosePrimitive", getMongoosePrimitive);
Handlebars.registerHelper("isSchemaFunctionRequired", isSchemaFunctionRequired);
Handlebars.registerHelper(
  "isSchemaFunctionIdRequired",
  isSchemaFunctionIdRequired
);
Handlebars.registerHelper("eq", eq);

export default Handlebars;
