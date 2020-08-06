/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  AnyResource,
  IExtension,
  IResource,
} from "../internal";

export interface IDomainResource extends IResource {
  contained?: Array<AnyResource>;

  extension?: Array<IExtension>;

  modifierExtension?: Array<IExtension>;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
