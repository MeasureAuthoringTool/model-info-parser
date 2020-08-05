/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  Extension,
  ICoding,
  PrimitiveBoolean,
  PrimitiveCode,
  PrimitiveString,
  PrimitiveUri,
} from "../internal";

export class Coding extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "Coding";

  public system?: PrimitiveUri;

  public version?: PrimitiveString;

  public code?: PrimitiveCode;

  public display?: PrimitiveString;

  public userSelected?: PrimitiveBoolean;

  public static parse(
    json: ICoding,
    providedInstance: Coding = new Coding()
  ): Coding {
    const newInstance: Coding = Element.parse(json, providedInstance);
  
    if (json.system) {
      newInstance.system = PrimitiveUri.parsePrimitive(json.system, json._system);
    }
    if (json.version) {
      newInstance.version = PrimitiveString.parsePrimitive(json.version, json._version);
    }
    if (json.code) {
      newInstance.code = PrimitiveCode.parsePrimitive(json.code, json._code);
    }
    if (json.display) {
      newInstance.display = PrimitiveString.parsePrimitive(json.display, json._display);
    }
    if (json.userSelected) {
      newInstance.userSelected = PrimitiveBoolean.parsePrimitive(json.userSelected, json._userSelected);
    }
    return newInstance;
  }

  public toJSON(): ICoding {
    const result: ICoding = super.toJSON();

    if (this.system) {
      result.system = this.system.value;
      result._system = Extension.serializePrimitiveExtension(this.system);
    }

    if (this.version) {
      result.version = this.version.value;
      result._version = Extension.serializePrimitiveExtension(this.version);
    }

    if (this.code) {
      result.code = this.code.value;
      result._code = Extension.serializePrimitiveExtension(this.code);
    }

    if (this.display) {
      result.display = this.display.value;
      result._display = Extension.serializePrimitiveExtension(this.display);
    }

    if (this.userSelected) {
      result.userSelected = this.userSelected.value;
      result._userSelected = Extension.serializePrimitiveExtension(this.userSelected);
    }

    return result;
  }
  
  public getTypeName(): string {
    return "Coding";
  }
  
  public static isCoding(input?: unknown): input is Coding {
    const castInput = input as Coding;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "Coding";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */