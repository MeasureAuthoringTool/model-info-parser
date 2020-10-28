/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  CodeableConcept,
  Coding,
  DomainResource,
  INestedArray,
  FieldMetadata
} from "../internal";

export class NestedArray extends DomainResource {
  static readonly baseType: string = "FHIR.DomainResource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "NestedArray";
  
  static readonly primaryCodePath: string | null = "codeList.coding";

  static get fieldInfo(): Array<FieldMetadata> {
    return [...DomainResource.fieldInfo, {
      fieldName: "codeList",
      fieldType: [CodeableConcept],
      isArray: true
    }];
  }

  public codeList?: Array<CodeableConcept>;

  get primaryCode(): Coding | undefined {
    return this?.codeList?.[0]?.coding?.[0];
  }

  set primaryCode(primaryCode: Coding | undefined) {
    this.codeList = this.codeList || [new CodeableConcept()];
    this.codeList[0].coding = primaryCode ? [primaryCode] : [];
  }

  public static parse(
    json: INestedArray,
    providedInstance: NestedArray = new NestedArray()
  ): NestedArray {
    const newInstance: NestedArray = DomainResource.parse(json, providedInstance);
  
    if (json.codeList !== undefined) {
      newInstance.codeList = json.codeList.map((x) => CodeableConcept.parse(x));
    }
    return newInstance;
  }

  public static isNestedArray(input?: unknown): input is NestedArray {
    const castInput = input as NestedArray;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "NestedArray";
  }

  public toJSON(): INestedArray {
    const result: INestedArray = super.toJSON();

    if (this.codeList) {
      result.codeList = this.codeList.map((x) => x.toJSON());
    }

    return result;
  }

  public clone(): NestedArray {
    return NestedArray.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "NestedArray";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
