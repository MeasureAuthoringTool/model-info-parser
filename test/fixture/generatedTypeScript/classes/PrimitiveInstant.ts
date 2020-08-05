/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveInstant extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "instant";

  public value?: string;

  public static parsePrimitive(
    value: string,
    extension?: IElement | null,
    providedInstance: PrimitiveInstant = new PrimitiveInstant()
  ): PrimitiveInstant {
      let newInstance: PrimitiveInstant;
  
      if (extension) {
        newInstance = Element.parse(extension);
      } else {
        newInstance = providedInstance;
      }
    
      newInstance.value = value;
      
      return newInstance;
  }
  
  public getTypeName(): string {
    return "PrimitiveInstant";
  }
  
  public static isPrimitiveInstant(input?: unknown): input is PrimitiveInstant {
    const castInput = input as PrimitiveInstant;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PrimitiveInstant";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */