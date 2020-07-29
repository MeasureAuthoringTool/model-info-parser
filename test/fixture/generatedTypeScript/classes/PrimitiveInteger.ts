/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveInteger extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "integer";

  public value?: number;

  public static parsePrimitive(
    value: number,
    extension?: IElement | null,
    providedInstance: PrimitiveInteger = new PrimitiveInteger()
  ): PrimitiveInteger {
      let newInstance: PrimitiveInteger;
  
      if (extension) {
        newInstance = Element.parse(extension);
      } else {
        newInstance = providedInstance;
      }
    
      newInstance.value = value;
      
      return newInstance;
  }
  
  public getTypeName(): string {
    return "PrimitiveInteger";
  }
  
  public static isPrimitiveInteger(input?: unknown): input is PrimitiveInteger {
    const castInput = input as PrimitiveInteger;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveInteger";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
