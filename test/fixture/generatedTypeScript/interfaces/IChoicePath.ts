/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  ICoding,
  IDomainResource,
  IElement,
  IPrimitiveBoolean,
  IPrimitiveCanonical,
} from "../internal";

export interface IChoicePath extends IDomainResource {
  optionsBoolean?: IPrimitiveBoolean;
  _optionsBoolean?: IElement;
  
  optionsCanonical?: IPrimitiveCanonical;
  _optionsCanonical?: IElement;
  
  optionsCoding?: ICoding;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
