/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Extension,
  IDomainResource,
  Resource,
} from "../internal";

export class DomainResource extends Resource {
  static readonly baseType: string = "FHIR.Resource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "DomainResource";

  public contained?: Array<Resource>;

  public extension?: Array<Extension>;

  public modifierExtension?: Array<Extension>;

  public static parse(
    json: IDomainResource,
    providedInstance: DomainResource = new DomainResource()
  ): DomainResource {
    const newInstance: DomainResource = Resource.parse(json, providedInstance);
  
    if (json.contained) {
      newInstance.contained = json.contained.map((x) => Resource.parse(x));
    }
    if (json.extension) {
      newInstance.extension = json.extension.map((x) => Extension.parse(x));
    }
    if (json.modifierExtension) {
      newInstance.modifierExtension = json.modifierExtension.map((x) => Extension.parse(x));
    }
    return newInstance;
  }

  public static isDomainResource(input?: unknown): input is DomainResource {
    const castInput = input as DomainResource;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "DomainResource";
  }

  public toJSON(): IDomainResource {
    const result: IDomainResource = super.toJSON();

    if (this.contained) {
      result.contained = this.contained.map((x) => x.toJSON());
    }

    if (this.extension) {
      result.extension = this.extension.map((x) => x.toJSON());
    }

    if (this.modifierExtension) {
      result.modifierExtension = this.modifierExtension.map((x) => x.toJSON());
    }

    return result;
  }
  
  public getTypeName(): string {
    return "DomainResource";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */