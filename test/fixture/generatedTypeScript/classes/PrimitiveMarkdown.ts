/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveString,
} from "../internal";

export class PrimitiveMarkdown extends PrimitiveString {
  static readonly baseType: string = "FHIR.string";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "markdown";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveString.parsePrimitive>[0],
    extension?: Parameters<typeof PrimitiveString.parsePrimitive>[1],
    providedInstance: PrimitiveMarkdown = new PrimitiveMarkdown()
  ): PrimitiveMarkdown {
      return PrimitiveString.parsePrimitive(value, extension, providedInstance);
  }
  
  public getTypeName(): string {
    return "PrimitiveMarkdown";
  }
  
  public static isPrimitiveMarkdown(input?: unknown): input is PrimitiveMarkdown {
    const castInput = input as PrimitiveMarkdown;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveMarkdown";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */