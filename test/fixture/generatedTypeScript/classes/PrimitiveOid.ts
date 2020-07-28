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
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
