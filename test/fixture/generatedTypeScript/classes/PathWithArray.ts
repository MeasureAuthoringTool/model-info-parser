/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  DomainResource,
  Extension,
  IPathWithArray,
  PrimitiveBoolean,
  FieldMetadata
} from "../internal";

export class PathWithArray extends DomainResource {
  static readonly baseType: string = "FHIR.DomainResource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "PathWithArray";
  
  static readonly primaryCodePath: string | null = "boolList";

  static get fieldInfo(): Array<FieldMetadata> {
    return [...DomainResource.fieldInfo, {
      fieldName: "boolList",
      fieldType: [PrimitiveBoolean],
      isArray: true
    }];
  }

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
      newInstance.boolList = json.boolList.map((x, i) => {
        const ext = json._boolList && json._boolList[i];
        return PrimitiveBoolean.parsePrimitive(x, ext);
      });
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
