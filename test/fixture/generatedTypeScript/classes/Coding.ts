/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
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
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
