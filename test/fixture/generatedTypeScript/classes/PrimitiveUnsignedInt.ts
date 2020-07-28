/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveInteger,
} from "../internal";

export class PrimitiveUnsignedInt extends PrimitiveInteger {
  static readonly baseType: string = "FHIR.integer";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "unsignedInt";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveInteger.parsePrimitive>[0],
    extension: Parameters<typeof PrimitiveInteger.parsePrimitive>[1],
    providedInstance: PrimitiveUnsignedInt = new PrimitiveUnsignedInt()
  ): PrimitiveUnsignedInt {
      return PrimitiveInteger.parsePrimitive(value, extension, providedInstance);
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
