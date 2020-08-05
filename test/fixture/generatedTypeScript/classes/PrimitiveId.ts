/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveString,
} from "../internal";

export class PrimitiveId extends PrimitiveString {
  static readonly baseType: string = "FHIR.string";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "id";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveString.parsePrimitive>[0],
    extension?: Parameters<typeof PrimitiveString.parsePrimitive>[1],
    providedInstance: PrimitiveId = new PrimitiveId()
  ): PrimitiveId {
      return PrimitiveString.parsePrimitive(value, extension, providedInstance);
  }
  
  public getTypeName(): string {
    return "PrimitiveId";
  }
  
  public static isPrimitiveId(input?: unknown): input is PrimitiveId {
    const castInput = input as PrimitiveId;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveId";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */