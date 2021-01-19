/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  DomainResource,
  Extension,
  FhirList,
  IPathWithArray,
  PrimitiveBoolean,
  FhirType
} from "../internal";

@FhirType("PathWithArray", "DomainResource")
export class PathWithArray extends DomainResource {
  static readonly baseType: string = "FHIR.DomainResource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "PathWithArray";

  static readonly primaryCodePath: string | null = "boolList";

  @FhirList("PrimitiveBoolean")
  public boolList?: Array<PrimitiveBoolean>;

  get primaryCode(): PrimitiveBoolean | undefined {
    return this?.boolList?.[0];
  }

  set primaryCode(primaryCode: PrimitiveBoolean | undefined) {
    this.boolList = primaryCode ? [primaryCode] : [];
  }

  public static parse(
    json: IPathWithArray,
    providedInstance: PathWithArray = new PathWithArray()
  ): PathWithArray {
    const newInstance: PathWithArray = DomainResource.parse(json, providedInstance);
  
    if (json.boolList !== undefined) {
      newInstance.boolList = json.boolList.map((x, i) => PrimitiveBoolean.parsePrimitive(x, json._boolList?.[i]));
    }
    return newInstance;
  }

  public static isPathWithArray(input?: unknown): input is PathWithArray {
    const castInput = input as PathWithArray;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "PathWithArray";
  }

  public toJSON(): IPathWithArray {
    const result: IPathWithArray = super.toJSON();

    if (this.boolList) {
      result.boolList = this.boolList.filter(x => !!x).map(x => x.value) as typeof result.boolList;
      result._boolList = Extension.serializePrimitiveExtensionArray(this.boolList);
    }

    return result;
  }

  public clone(): PathWithArray {
    return PathWithArray.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "PathWithArray";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
