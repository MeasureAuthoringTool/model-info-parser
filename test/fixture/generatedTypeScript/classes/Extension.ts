/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Coding,
  Element,
  IElement,
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
  
  static readonly primaryCodePath: string | null = null;

  public url?: PrimitiveUri;

  public value?: PrimitiveBase64Binary | PrimitiveBoolean | PrimitiveCanonical | PrimitiveCode | PrimitiveDate | PrimitiveDateTime | PrimitiveDecimal | PrimitiveId | PrimitiveInstant | PrimitiveInteger | PrimitiveMarkdown | PrimitiveOid | PrimitivePositiveInt | PrimitiveString | PrimitiveTime | PrimitiveUnsignedInt | PrimitiveUri | PrimitiveUrl | PrimitiveUuid | Coding;

  public static parse(
    json: IExtension,
    providedInstance: Extension = new Extension()
  ): Extension {
    const newInstance: Extension = Element.parse(json, providedInstance);
  
    if (json.url !== undefined) {
      newInstance.url = PrimitiveUri.parsePrimitive(json.url, json._url);
    }
    if (json.valueBase64Binary !== undefined) {
      newInstance.value = PrimitiveBase64Binary.parsePrimitive(json.valueBase64Binary, json._valueBase64Binary);
    }
    if (json.valueBoolean !== undefined) {
      newInstance.value = PrimitiveBoolean.parsePrimitive(json.valueBoolean, json._valueBoolean);
    }
    if (json.valueCanonical !== undefined) {
      newInstance.value = PrimitiveCanonical.parsePrimitive(json.valueCanonical, json._valueCanonical);
    }
    if (json.valueCode !== undefined) {
      newInstance.value = PrimitiveCode.parsePrimitive(json.valueCode, json._valueCode);
    }
    if (json.valueDate !== undefined) {
      newInstance.value = PrimitiveDate.parsePrimitive(json.valueDate, json._valueDate);
    }
    if (json.valueDateTime !== undefined) {
      newInstance.value = PrimitiveDateTime.parsePrimitive(json.valueDateTime, json._valueDateTime);
    }
    if (json.valueDecimal !== undefined) {
      newInstance.value = PrimitiveDecimal.parsePrimitive(json.valueDecimal, json._valueDecimal);
    }
    if (json.valueId !== undefined) {
      newInstance.value = PrimitiveId.parsePrimitive(json.valueId, json._valueId);
    }
    if (json.valueInstant !== undefined) {
      newInstance.value = PrimitiveInstant.parsePrimitive(json.valueInstant, json._valueInstant);
    }
    if (json.valueInteger !== undefined) {
      newInstance.value = PrimitiveInteger.parsePrimitive(json.valueInteger, json._valueInteger);
    }
    if (json.valueMarkdown !== undefined) {
      newInstance.value = PrimitiveMarkdown.parsePrimitive(json.valueMarkdown, json._valueMarkdown);
    }
    if (json.valueOid !== undefined) {
      newInstance.value = PrimitiveOid.parsePrimitive(json.valueOid, json._valueOid);
    }
    if (json.valuePositiveInt !== undefined) {
      newInstance.value = PrimitivePositiveInt.parsePrimitive(json.valuePositiveInt, json._valuePositiveInt);
    }
    if (json.valueString !== undefined) {
      newInstance.value = PrimitiveString.parsePrimitive(json.valueString, json._valueString);
    }
    if (json.valueTime !== undefined) {
      newInstance.value = PrimitiveTime.parsePrimitive(json.valueTime, json._valueTime);
    }
    if (json.valueUnsignedInt !== undefined) {
      newInstance.value = PrimitiveUnsignedInt.parsePrimitive(json.valueUnsignedInt, json._valueUnsignedInt);
    }
    if (json.valueUri !== undefined) {
      newInstance.value = PrimitiveUri.parsePrimitive(json.valueUri, json._valueUri);
    }
    if (json.valueUrl !== undefined) {
      newInstance.value = PrimitiveUrl.parsePrimitive(json.valueUrl, json._valueUrl);
    }
    if (json.valueUuid !== undefined) {
      newInstance.value = PrimitiveUuid.parsePrimitive(json.valueUuid, json._valueUuid);
    }
    if (json.valueCoding !== undefined) {
      newInstance.value = Coding.parse(json.valueCoding);
    }
    return newInstance;
  }

  public static isExtension(input?: unknown): input is Extension {
    const castInput = input as Extension;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "Extension";
  }

  public static serializePrimitiveExtension(
    primitive: Element
  ): IElement | undefined {
    let result: IElement | undefined;
    if (primitive.id || primitive.extension) {
      result = {};
      result.id = primitive.id;
      result.extension = primitive?.extension?.map((x) => x.toJSON());
    }
    return result;
  }

  public static serializePrimitiveExtensionArray(
    primitives: Array<Element>
  ): Array<IElement | null> | undefined {
    const initial: Array<IElement | null> = [];
    const result = primitives.reduce((accumulator, currentPrim) => {
      const serializedExtension = Extension.serializePrimitiveExtension(
        currentPrim
      );
      if (serializedExtension) {
        accumulator.push(serializedExtension);
      } else {
        accumulator.push(null);
      }
      return accumulator;
    }, initial);

    if (result.find((x) => !!x)) {
      return result;
    }
    return undefined;
  }

  public toJSON(): IExtension {
    const result: IExtension = super.toJSON();

    if (this.url) {
      result.url = this.url.value;
      result._url = Extension.serializePrimitiveExtension(this.url);
    }

    if (this.value && PrimitiveBase64Binary.isPrimitiveBase64Binary(this.value)) {
      result.valueBase64Binary = this.value.value;
      result._valueBase64Binary = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveBoolean.isPrimitiveBoolean(this.value)) {
      result.valueBoolean = this.value.value;
      result._valueBoolean = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveCanonical.isPrimitiveCanonical(this.value)) {
      result.valueCanonical = this.value.value;
      result._valueCanonical = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveCode.isPrimitiveCode(this.value)) {
      result.valueCode = this.value.value;
      result._valueCode = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveDate.isPrimitiveDate(this.value)) {
      result.valueDate = this.value.value;
      result._valueDate = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveDateTime.isPrimitiveDateTime(this.value)) {
      result.valueDateTime = this.value.value;
      result._valueDateTime = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveDecimal.isPrimitiveDecimal(this.value)) {
      result.valueDecimal = this.value.value;
      result._valueDecimal = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveId.isPrimitiveId(this.value)) {
      result.valueId = this.value.value;
      result._valueId = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveInstant.isPrimitiveInstant(this.value)) {
      result.valueInstant = this.value.value;
      result._valueInstant = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveInteger.isPrimitiveInteger(this.value)) {
      result.valueInteger = this.value.value;
      result._valueInteger = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveMarkdown.isPrimitiveMarkdown(this.value)) {
      result.valueMarkdown = this.value.value;
      result._valueMarkdown = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveOid.isPrimitiveOid(this.value)) {
      result.valueOid = this.value.value;
      result._valueOid = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitivePositiveInt.isPrimitivePositiveInt(this.value)) {
      result.valuePositiveInt = this.value.value;
      result._valuePositiveInt = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveString.isPrimitiveString(this.value)) {
      result.valueString = this.value.value;
      result._valueString = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveTime.isPrimitiveTime(this.value)) {
      result.valueTime = this.value.value;
      result._valueTime = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveUnsignedInt.isPrimitiveUnsignedInt(this.value)) {
      result.valueUnsignedInt = this.value.value;
      result._valueUnsignedInt = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveUri.isPrimitiveUri(this.value)) {
      result.valueUri = this.value.value;
      result._valueUri = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveUrl.isPrimitiveUrl(this.value)) {
      result.valueUrl = this.value.value;
      result._valueUrl = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && PrimitiveUuid.isPrimitiveUuid(this.value)) {
      result.valueUuid = this.value.value;
      result._valueUuid = Extension.serializePrimitiveExtension(this.value);
    }

    if (this.value && Coding.isCoding(this.value)) {
      result.valueCoding = this.value.toJSON();
    }

    return result;
  }

  public clone(): Extension {
    return Extension.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "Extension";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
