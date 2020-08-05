/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  BundleEntry,
  IBundle,
  Resource,
} from "../internal";

export class Bundle extends Resource {
  static readonly baseType: string = "FHIR.Resource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "Bundle";

  public entry?: Array<BundleEntry>;

  public static parse(
    json: IBundle,
    providedInstance: Bundle = new Bundle()
  ): Bundle {
    const newInstance: Bundle = Resource.parse(json, providedInstance);
  
    if (json.entry) {
      newInstance.entry = json.entry.map((x) => BundleEntry.parse(x));
    }
    return newInstance;
  }

  public toJSON(): IBundle {
    const result: IBundle = super.toJSON();

    if (this.entry) {
      result.entry = this.entry.map((x) => x.toJSON());
    }

    return result;
  }
  
  public getTypeName(): string {
    return "Bundle";
  }
  
  public static isBundle(input?: unknown): input is Bundle {
    const castInput = input as Bundle;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "Bundle";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */