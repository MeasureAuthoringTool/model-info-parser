/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  IDomainResource,
  IElement,
  IPrimitiveBoolean,
} from "../internal";

export interface IPathWithArray extends IDomainResource {
  boolList?: Array<IPrimitiveBoolean>;
  _boolList?: Array<IElement | null>;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
