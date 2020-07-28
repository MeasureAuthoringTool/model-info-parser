/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Coding,
  Element,
  IExtension,
  PrimitiveBase64Binary,
  PrimitiveBoolean,
  PrimitiveCanonical,
  PrimitiveCode,
  PrimitiveDate,
  PrimitiveDateTime,
  PrimitiveDecimal,
  PrimitiveId,
  PrimitiveInstant,
  PrimitiveInteger,
  PrimitiveMarkdown,
  PrimitiveOid,
  PrimitivePositiveInt,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUnsignedInt,
  PrimitiveUri,
  PrimitiveUrl,
  PrimitiveUuid,
} from "../internal";

export class Extension extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "Extension";

  public url?: PrimitiveUri;

  public value?: PrimitiveBase64Binary | PrimitiveBoolean | PrimitiveCanonical | PrimitiveCode | PrimitiveDate | PrimitiveDateTime | PrimitiveDecimal | PrimitiveId | PrimitiveInstant | PrimitiveInteger | PrimitiveMarkdown | PrimitiveOid | PrimitivePositiveInt | PrimitiveString | PrimitiveTime | PrimitiveUnsignedInt | PrimitiveUri | PrimitiveUrl | PrimitiveUuid | Coding;

  public static parse(
    json: IExtension,
    providedInstance: Extension = new Extension()
  ): Extension {
    const newInstance: Extension = Element.parse(json, providedInstance);
  
    if (json.url) {
      newInstance.url = PrimitiveUri.parsePrimitive(json.url, json._url);
    }
    if (json.valueBase64Binary) {
      newInstance.value = PrimitiveBase64Binary.parsePrimitive(json.valueBase64Binary, json._valueBase64Binary);
    }
    if (json.valueBoolean) {
      newInstance.value = PrimitiveBoolean.parsePrimitive(json.valueBoolean, json._valueBoolean);
    }
    if (json.valueCanonical) {
      newInstance.value = PrimitiveCanonical.parsePrimitive(json.valueCanonical, json._valueCanonical);
    }
    if (json.valueCode) {
      newInstance.value = PrimitiveCode.parsePrimitive(json.valueCode, json._valueCode);
    }
    if (json.valueDate) {
      newInstance.value = PrimitiveDate.parsePrimitive(json.valueDate, json._valueDate);
    }
    if (json.valueDateTime) {
      newInstance.value = PrimitiveDateTime.parsePrimitive(json.valueDateTime, json._valueDateTime);
    }
    if (json.valueDecimal) {
      newInstance.value = PrimitiveDecimal.parsePrimitive(json.valueDecimal, json._valueDecimal);
    }
    if (json.valueId) {
      newInstance.value = PrimitiveId.parsePrimitive(json.valueId, json._valueId);
    }
    if (json.valueInstant) {
      newInstance.value = PrimitiveInstant.parsePrimitive(json.valueInstant, json._valueInstant);
    }
    if (json.valueInteger) {
      newInstance.value = PrimitiveInteger.parsePrimitive(json.valueInteger, json._valueInteger);
    }
    if (json.valueMarkdown) {
      newInstance.value = PrimitiveMarkdown.parsePrimitive(json.valueMarkdown, json._valueMarkdown);
    }
    if (json.valueOid) {
      newInstance.value = PrimitiveOid.parsePrimitive(json.valueOid, json._valueOid);
    }
    if (json.valuePositiveInt) {
      newInstance.value = PrimitivePositiveInt.parsePrimitive(json.valuePositiveInt, json._valuePositiveInt);
    }
    if (json.valueString) {
      newInstance.value = PrimitiveString.parsePrimitive(json.valueString, json._valueString);
    }
    if (json.valueTime) {
      newInstance.value = PrimitiveTime.parsePrimitive(json.valueTime, json._valueTime);
    }
    if (json.valueUnsignedInt) {
      newInstance.value = PrimitiveUnsignedInt.parsePrimitive(json.valueUnsignedInt, json._valueUnsignedInt);
    }
    if (json.valueUri) {
      newInstance.value = PrimitiveUri.parsePrimitive(json.valueUri, json._valueUri);
    }
    if (json.valueUrl) {
      newInstance.value = PrimitiveUrl.parsePrimitive(json.valueUrl, json._valueUrl);
    }
    if (json.valueUuid) {
      newInstance.value = PrimitiveUuid.parsePrimitive(json.valueUuid, json._valueUuid);
    }
    if (json.valueCoding) {
      newInstance.value = Coding.parse(json.valueCoding);
    }
    return newInstance;
  }
  
  public getTypeName(): string {
    return "Extension";
  }
}

export function isExtension(input?: unknown): input is Extension {
  const castInput = input as Extension;
  return !!input && castInput.getTypeName && castInput.getTypeName() === "Extension";
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
