/* eslint-disable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
import { 
  ICoding,
  IElement,
  IPrimitiveBase64Binary,
  IPrimitiveBoolean,
  IPrimitiveCanonical,
  IPrimitiveCode,
  IPrimitiveDate,
  IPrimitiveDateTime,
  IPrimitiveDecimal,
  IPrimitiveId,
  IPrimitiveInstant,
  IPrimitiveInteger,
  IPrimitiveMarkdown,
  IPrimitiveOid,
  IPrimitivePositiveInt,
  IPrimitiveString,
  IPrimitiveTime,
  IPrimitiveUnsignedInt,
  IPrimitiveUri,
  IPrimitiveUrl,
  IPrimitiveUuid,
} from "../internal";

export interface IExtension extends IElement {
  url?: IPrimitiveUri;
  _url?: IElement;

  valueBase64Binary?: IPrimitiveBase64Binary;
  _valueBase64Binary?: IElement;
  
  valueBoolean?: IPrimitiveBoolean;
  _valueBoolean?: IElement;
  
  valueCanonical?: IPrimitiveCanonical;
  _valueCanonical?: IElement;
  
  valueCode?: IPrimitiveCode;
  _valueCode?: IElement;
  
  valueDate?: IPrimitiveDate;
  _valueDate?: IElement;
  
  valueDateTime?: IPrimitiveDateTime;
  _valueDateTime?: IElement;
  
  valueDecimal?: IPrimitiveDecimal;
  _valueDecimal?: IElement;
  
  valueId?: IPrimitiveId;
  _valueId?: IElement;
  
  valueInstant?: IPrimitiveInstant;
  _valueInstant?: IElement;
  
  valueInteger?: IPrimitiveInteger;
  _valueInteger?: IElement;
  
  valueMarkdown?: IPrimitiveMarkdown;
  _valueMarkdown?: IElement;
  
  valueOid?: IPrimitiveOid;
  _valueOid?: IElement;
  
  valuePositiveInt?: IPrimitivePositiveInt;
  _valuePositiveInt?: IElement;
  
  valueString?: IPrimitiveString;
  _valueString?: IElement;
  
  valueTime?: IPrimitiveTime;
  _valueTime?: IElement;
  
  valueUnsignedInt?: IPrimitiveUnsignedInt;
  _valueUnsignedInt?: IElement;
  
  valueUri?: IPrimitiveUri;
  _valueUri?: IElement;
  
  valueUrl?: IPrimitiveUrl;
  _valueUrl?: IElement;
  
  valueUuid?: IPrimitiveUuid;
  _valueUuid?: IElement;
  
  valueCoding?: ICoding;

}
/* eslint-enable import/prefer-default-export, import/no-cycle, @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */
