/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  AnyResource,
  IBackboneElement,
} from "../internal";

export interface IBundleEntry extends IBackboneElement {
  resource?: AnyResource;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
