import Handlebars from 'handlebars';
import { getMongoidPrimitive, removeNamespace } from '../helpers/templateHelpers';
import { source as mongoidComplexMember } from './complexMemberTemplate';
import { source as mongoidSystemMember } from './systemMemberTemplate';

Handlebars.registerPartial('mongoidComplexMember', mongoidComplexMember);
Handlebars.registerPartial('mongoidSystemMember', mongoidSystemMember);

Handlebars.registerHelper('removeNamespace', removeNamespace);
Handlebars.registerHelper('getMongoidPrimitive', getMongoidPrimitive);

export default Handlebars;
