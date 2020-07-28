/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveXhtml extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "xhtml";

  public value?: string;

  public static parsePrimitive(
    value: string,
    extension?: IElement,
    providedInstance: PrimitiveXhtml = new PrimitiveXhtml()
  ): PrimitiveXhtml {
      let newInstance: PrimitiveXhtml;
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
