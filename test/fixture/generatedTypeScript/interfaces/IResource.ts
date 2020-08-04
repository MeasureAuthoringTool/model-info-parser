/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  IElement,
  IPrimitiveCode,
} from "../internal";

export interface IResource {
  id?: string;

  language?: IPrimitiveCode;
  _language?: IElement;

  resourceType?: string;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
