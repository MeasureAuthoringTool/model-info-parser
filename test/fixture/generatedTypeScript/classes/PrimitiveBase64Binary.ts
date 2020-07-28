/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveBase64Binary extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "base64Binary";

  public value?: string;

  public static parsePrimitive(
    value: string,
    extension?: IElement,
    providedInstance: PrimitiveBase64Binary = new PrimitiveBase64Binary()
  ): PrimitiveBase64Binary {
      let newInstance: PrimitiveBase64Binary;
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
