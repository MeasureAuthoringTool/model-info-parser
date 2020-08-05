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

  public toJSON(): IElement {
    const result: IElement = super.toJSON();

    if (this.id) {
      result.id = this.id;
    }

    if (this.extension) {
      result.extension = this.extension.map((x) => x.toJSON());
    }

    return result;
  }
  
  public getTypeName(): string {
    return "Element";
  }
  
  public static isElement(input?: unknown): input is Element {
    const castInput = input as Element;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "Element";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */