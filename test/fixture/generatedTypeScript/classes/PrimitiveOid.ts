/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveUri,
} from "../internal";

export class PrimitiveOid extends PrimitiveUri {
  static readonly baseType: string = "FHIR.uri";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "oid";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveUri.parsePrimitive>[0],
    extension: Parameters<typeof PrimitiveUri.parsePrimitive>[1],
    providedInstance: PrimitiveOid = new PrimitiveOid()
  ): PrimitiveOid {
      return PrimitiveUri.parsePrimitive(value, extension, providedInstance);
  }
  
  public getTypeName(): string {
    return "PrimitiveOid";
  }
}

export function isPrimitiveOid(input?: unknown): input is PrimitiveOid {
  const castInput = input as PrimitiveOid;
  return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveOid";
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
