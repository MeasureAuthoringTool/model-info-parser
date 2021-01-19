/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  DomainResource,
  FhirField,
  INestedPath,
  PrimitiveBoolean,
  ResourceChild,
  FhirType
} from "../internal";

@FhirType("NestedPath", "DomainResource")
export class NestedPath extends DomainResource {
  static readonly baseType: string = "FHIR.DomainResource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "NestedPath";

  static readonly primaryCodePath: string | null = "top.boolVal";

  @FhirField("ResourceChild")
  public top?: ResourceChild;

  get primaryCode(): PrimitiveBoolean | undefined {
    return this?.top?.boolVal;
  }

  set primaryCode(primaryCode: PrimitiveBoolean | undefined) {
    this.top = this.top || new ResourceChild();
    this.top.boolVal = primaryCode;
  }

  public static parse(
    json: INestedPath,
    providedInstance: NestedPath = new NestedPath()
  ): NestedPath {
    const newInstance: NestedPath = DomainResource.parse(json, providedInstance);
  
    if (json.top !== undefined) {
      newInstance.top = ResourceChild.parse(json.top);
    }
    return newInstance;
  }

  public static isNestedPath(input?: unknown): input is NestedPath {
    const castInput = input as NestedPath;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "NestedPath";
  }

  public toJSON(): INestedPath {
    const result: INestedPath = super.toJSON();

    if (this.top) {
      result.top = this.top.toJSON();
    }

    return result;
  }

  public clone(): NestedPath {
    return NestedPath.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "NestedPath";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
