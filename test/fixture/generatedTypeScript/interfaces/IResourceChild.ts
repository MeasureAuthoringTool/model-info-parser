/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  IElement,
  IPrimitiveBoolean,
  IResource,
} from "../internal";

export interface IResourceChild extends IResource {
  boolVal?: IPrimitiveBoolean;
  _boolVal?: IElement;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
