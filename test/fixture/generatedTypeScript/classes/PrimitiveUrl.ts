/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveUri,
} from "../internal";

export class PrimitiveUrl extends PrimitiveUri {
  static readonly baseType: string = "FHIR.uri";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "url";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveUri.parsePrimitive>[0],
    extension?: Parameters<typeof PrimitiveUri.parsePrimitive>[1],
    providedInstance: PrimitiveUrl = new PrimitiveUrl()
  ): PrimitiveUrl {
      return PrimitiveUri.parsePrimitive(value, extension, providedInstance);
  }
  
  public getTypeName(): string {
    return "PrimitiveUrl";
  }
  
  public static isPrimitiveUrl(input?: unknown): input is PrimitiveUrl {
    const castInput = input as PrimitiveUrl;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveUrl";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
