import Handlebars from 'handlebars';
import { getMongoidPrimitive } from '../helpers/templateHelpers';
import complexMemberTemplate from './complexMemberTemplate';
import mongoidPrimitiveMember from './primitiveMemberTemplate';

Handlebars.registerPartial('mongoidComplexMember', complexMemberTemplate);
Handlebars.registerPartial('mongoidPrimitiveMember', mongoidPrimitiveMember);

Handlebars.registerHelper('getMongoidPrimitive', getMongoidPrimitive);

export default Handlebars;
