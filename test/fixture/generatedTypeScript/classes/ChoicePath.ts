/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Coding,
  DomainResource,
  Extension,
  IChoicePath,
  PrimitiveBoolean,
  PrimitiveCanonical,
  FieldMetadata
} from "../internal";

export class ChoicePath extends DomainResource {
  static readonly baseType: string = "FHIR.DomainResource";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "ChoicePath";
  
  static readonly primaryCodePath: string | null = "optionsBoolean";

  static get fieldInfo(): Array<FieldMetadata> {
    return [...DomainResource.fieldInfo, {
      fieldName: "options",
      fieldType: [PrimitiveBoolean, PrimitiveCanonical, Coding],
      isArray: false
    }];
  }

  public options?: PrimitiveBoolean | PrimitiveCanonical | Coding;

  get primaryCode(): PrimitiveBoolean | PrimitiveCanonical | Coding | undefined {
    return this?.options;
  }

  set primaryCode(primaryCode: PrimitiveBoolean | PrimitiveCanonical | Coding | undefined) {
    this.options = primaryCode;
  }

  public static parse(
    json: IChoicePath,
    providedInstance: ChoicePath = new ChoicePath()
  ): ChoicePath {
    const newInstance: ChoicePath = DomainResource.parse(json, providedInstance);
  
    if (json.optionsBoolean !== undefined) {
      newInstance.options = PrimitiveBoolean.parsePrimitive(json.optionsBoolean, json._optionsBoolean);
    }
    if (json.optionsCanonical !== undefined) {
      newInstance.options = PrimitiveCanonical.parsePrimitive(json.optionsCanonical, json._optionsCanonical);
    }
    if (json.optionsCoding !== undefined) {
      newInstance.options = Coding.parse(json.optionsCoding);
    }
    return newInstance;
  }

  public static isChoicePath(input?: unknown): input is ChoicePath {
    const castInput = input as ChoicePath;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "ChoicePath";
  }

  public toJSON(): IChoicePath {
    const result: IChoicePath = super.toJSON();

    if (this.options && PrimitiveBoolean.isPrimitiveBoolean(this.options)) {
      result.optionsBoolean = this.options.value;
      result._optionsBoolean = Extension.serializePrimitiveExtension(this.options);
    }

    if (this.options && PrimitiveCanonical.isPrimitiveCanonical(this.options)) {
      result.optionsCanonical = this.options.value;
      result._optionsCanonical = Extension.serializePrimitiveExtension(this.options);
    }

    if (this.options && Coding.isCoding(this.options)) {
      result.optionsCoding = this.options.toJSON();
    }

    return result;
  }

  public clone(): ChoicePath {
    return ChoicePath.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "ChoicePath";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
