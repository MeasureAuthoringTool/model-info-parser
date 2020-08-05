/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Extension,
  IResourceChild,
  PrimitiveBoolean,
  Resource,
} from "../internal";

export class ResourceChild extends Resource {
  static readonly baseType: string = "FHIR.Resource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "ResourceChild";

  public boolVal?: PrimitiveBoolean;

  public static parse(
    json: IResourceChild,
    providedInstance: ResourceChild = new ResourceChild()
  ): ResourceChild {
    const newInstance: ResourceChild = Resource.parse(json, providedInstance);
  
    if (json.boolVal) {
      newInstance.boolVal = PrimitiveBoolean.parsePrimitive(json.boolVal, json._boolVal);
    }
    return newInstance;
  }

  public toJSON(): IResourceChild {
    const result: IResourceChild = super.toJSON();

    if (this.boolVal) {
      result.boolVal = this.boolVal.value;
      result._boolVal = Extension.serializePrimitiveExtension(this.boolVal);
    }

    return result;
  }
  
  public getTypeName(): string {
    return "ResourceChild";
  }
  
  public static isResourceChild(input?: unknown): input is ResourceChild {
    const castInput = input as ResourceChild;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "ResourceChild";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */