/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  BackboneElement,
  IBundleEntry,
  Resource,
  FieldMetadata
} from "../internal";

export class BundleEntry extends BackboneElement {
  static readonly baseType: string = "FHIR.BackboneElement";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "Bundle.Entry";
  
  static readonly primaryCodePath: string | null = null;

  static get fieldInfo(): Array<FieldMetadata> {
    return [...BackboneElement.fieldInfo, {
      fieldName: "resource",
      fieldType: [Resource],
      isArray: false
    }];
  }

  public resource?: Resource;

  public static parse(
    json: IBundleEntry,
    providedInstance: BundleEntry = new BundleEntry()
  ): BundleEntry {
    const newInstance: BundleEntry = BackboneElement.parse(json, providedInstance);
  
    if (json.resource !== undefined) {
      newInstance.resource = Resource.parse(json.resource);
    }
    return newInstance;
  }

  public static isBundleEntry(input?: unknown): input is BundleEntry {
    const castInput = input as BundleEntry;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "BundleEntry";
  }

  public toJSON(): IBundleEntry {
    const result: IBundleEntry = super.toJSON();

    if (this.resource) {
      result.resource = this.resource.toJSON();
    }

    return result;
  }

  public clone(): BundleEntry {
    return BundleEntry.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "BundleEntry";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
