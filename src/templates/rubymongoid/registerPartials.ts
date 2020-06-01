import Handlebars from 'handlebars';
import { getMongoidPrimitive, removeNamespace } from '../helpers/templateHelpers';
import { source as mongoidComplexMember } from './complexMemberTemplate';
import { source as mongoidPrimitiveMember } from './primitiveMemberTemplate';

Handlebars.registerPartial('mongoidComplexMember', mongoidComplexMember);
Handlebars.registerPartial('mongoidPrimitiveMember', mongoidPrimitiveMember);

Handlebars.registerHelper('removeNamespace', removeNamespace);
Handlebars.registerHelper('getMongoidPrimitive', getMongoidPrimitive);

export default Handlebars;
