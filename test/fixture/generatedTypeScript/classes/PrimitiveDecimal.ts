/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveDecimal extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "decimal";

  public value?: number;

  public static parsePrimitive(
    value: number,
    extension?: IElement | null,
    providedInstance: PrimitiveDecimal = new PrimitiveDecimal()
  ): PrimitiveDecimal {
      let newInstance: PrimitiveDecimal;
  
      if (extension) {
        newInstance = Element.parse(extension);
      } else {
        newInstance = providedInstance;
      }
    
      newInstance.value = value;
      
      return newInstance;
  }
  
  public getTypeName(): string {
    return "PrimitiveDecimal";
  }
  
  public static isPrimitiveDecimal(input?: unknown): input is PrimitiveDecimal {
    const castInput = input as PrimitiveDecimal;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveDecimal";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */