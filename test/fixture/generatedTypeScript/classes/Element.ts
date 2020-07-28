/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Extension,
  IElement,
  Type,
} from "../internal";

export class Element extends Type {
  static readonly baseType: string = "";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "Element";

  public id?: string;

  public extension?: Array<Extension>;

  public static parse(
    json: IElement,
    providedInstance: Element = new Element()
  ): Element {
    const newInstance: Element = Type.parse(json, providedInstance);
  
    if (json.id) {
      newInstance.id = json.id;
    }
    if (json.extension) {
      newInstance.extension = json.extension.map((x) => Extension.parse(x));
    }
    return newInstance;
  }
  
  public getTypeName(): string {
    return "Element";
  }
}

export function isElement(input?: unknown): input is Element {
  const castInput = input as Element;
  return !!input && castInput.getTypeName && castInput.getTypeName() === "Element";
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
