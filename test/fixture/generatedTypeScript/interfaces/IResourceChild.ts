/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  IDomainResource,
  IElement,
  IPrimitiveBoolean,
} from "../internal";

export interface IResourceChild extends IDomainResource {
  boolVal?: IPrimitiveBoolean;
  _boolVal?: IElement;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
