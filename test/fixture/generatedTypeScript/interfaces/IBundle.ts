/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  IBundleEntry,
  IResource,
} from "../internal";

export interface IBundle extends IResource {
  entry?: Array<IBundleEntry>;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
