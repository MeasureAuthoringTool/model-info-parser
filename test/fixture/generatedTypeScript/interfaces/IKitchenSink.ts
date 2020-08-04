/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  ICodeableConcept,
  ICoding,
  IElement,
  IPrimitiveBoolean,
  IPrimitiveCanonical,
  IPrimitiveString,
  IPrimitiveTime,
  IPrimitiveUrl,
} from "../internal";

export interface IKitchenSink extends IElement {
  system?: string;

  url?: IPrimitiveUrl;
  _url?: IElement;

  version?: IPrimitiveString;
  _version?: IElement;

  singleCode?: ICodeableConcept;

  coding?: Array<ICoding>;

  times?: Array<IPrimitiveTime>;
  _times?: Array<IElement | null>;

  optionsBoolean?: IPrimitiveBoolean;
  _optionsBoolean?: IElement;
  
  optionsCanonical?: IPrimitiveCanonical;
  _optionsCanonical?: IElement;
  
  optionsCoding?: ICoding;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
