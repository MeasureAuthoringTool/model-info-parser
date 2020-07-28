/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveString extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "string";

  public value?: string;

  public static parsePrimitive(
    value: string,
    extension?: IElement,
    providedInstance: PrimitiveString = new PrimitiveString()
  ): PrimitiveString {
      let newInstance: PrimitiveString;
      if (extension) {
        newInstance = Element.parse(extension);
      } else {
        newInstance = providedInstance;
      }
    
      newInstance.value = value;
      
      return newInstance;
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
