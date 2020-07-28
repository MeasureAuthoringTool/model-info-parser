/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveString,
} from "../internal";

export class PrimitiveCode extends PrimitiveString {
  static readonly baseType: string = "FHIR.string";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "code";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveString.parsePrimitive>[0],
    extension: Parameters<typeof PrimitiveString.parsePrimitive>[1],
    providedInstance: PrimitiveCode = new PrimitiveCode()
  ): PrimitiveCode {
      return PrimitiveString.parsePrimitive(value, extension, providedInstance);
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
