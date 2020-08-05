/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveString,
} from "../internal";

export class PrimitiveQuestion extends PrimitiveString {
  static readonly baseType: string = "FHIR.string";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "question";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveString.parsePrimitive>[0],
    extension?: Parameters<typeof PrimitiveString.parsePrimitive>[1],
    providedInstance: PrimitiveQuestion = new PrimitiveQuestion()
  ): PrimitiveQuestion {
      return PrimitiveString.parsePrimitive(value, extension, providedInstance);
  }
  
  public getTypeName(): string {
    return "PrimitiveQuestion";
  }
  
  public static isPrimitiveQuestion(input?: unknown): input is PrimitiveQuestion {
    const castInput = input as PrimitiveQuestion;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveQuestion";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */