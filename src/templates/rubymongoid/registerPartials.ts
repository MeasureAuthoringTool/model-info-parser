import Handlebars from 'handlebars';
import { getMongoidPrimitive, removeNamespace } from '../helpers/templateHelpers';
import { source as complexMemberSource } from './complexMemberTemplate';
import { source as primitiveMemberSource } from './primitiveMemberTemplate';

Handlebars.registerPartial('complexMember', complexMemberSource);
Handlebars.registerPartial('primitiveMember', primitiveMemberSource);

Handlebars.registerHelper('removeNamespace', removeNamespace);
Handlebars.registerHelper('getMongoidPrimitive', getMongoidPrimitive);

export default Handlebars;
