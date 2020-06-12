import Handlebars from 'handlebars';
import { getMongoidPrimitive } from '../helpers/templateHelpers';
import complexMemberTemplate from './complexMemberTemplate';
import systemMemberTemplate from './systemMemberTemplate';

Handlebars.registerPartial('mongoidComplexMember', complexMemberTemplate);
Handlebars.registerPartial('mongoidSystemMember', systemMemberTemplate);

Handlebars.registerHelper('getMongoidPrimitive', getMongoidPrimitive);

export default Handlebars;
