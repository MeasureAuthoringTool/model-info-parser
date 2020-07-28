/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Element,
  IElement,
} from "../internal";

export class PrimitiveBoolean extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "boolean";

  public value?: boolean;

  public static parsePrimitive(
    value: boolean,
    extension?: IElement,
    providedInstance: PrimitiveBoolean = new PrimitiveBoolean()
  ): PrimitiveBoolean {
      let newInstance: PrimitiveBoolean;
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
