/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  CodeableConcept,
  Coding,
  Element,
  Extension,
  FhirChoice,
  FhirField,
  FhirList,
  IKitchenSink,
  PrimitiveBoolean,
  PrimitiveCanonical,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUrl,
  FhirType
} from "../internal";

@FhirType("KitchenSink", "Element")
export class KitchenSink extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "KitchenSink";

  static readonly primaryCodePath: string | null = "singleCode";

  @FhirField("SystemString")
  public system?: string;

  @FhirField("PrimitiveUrl")
  public url?: PrimitiveUrl;

  @FhirField("PrimitiveString")
  public version?: PrimitiveString;

  @FhirField("CodeableConcept")
  public singleCode?: CodeableConcept;

  @FhirList("Coding")
  public coding?: Array<Coding>;

  @FhirList("PrimitiveTime")
  public times?: Array<PrimitiveTime>;

  @FhirChoice("PrimitiveBoolean", "PrimitiveCanonical", "Coding")
  public options?: PrimitiveBoolean | PrimitiveCanonical | Coding;

  get primaryCode(): CodeableConcept | undefined {
    return this?.singleCode;
  }

  set primaryCode(primaryCode: CodeableConcept | undefined) {
    this.singleCode = primaryCode;
  }

  public static parse(
    json: IKitchenSink,
    providedInstance: KitchenSink = new KitchenSink()
  ): KitchenSink {
    const newInstance: KitchenSink = Element.parse(json, providedInstance);
  
    if (json.system !== undefined) {
      newInstance.system = json.system;
    }
    if (json.url !== undefined) {
      newInstance.url = PrimitiveUrl.parsePrimitive(json.url, json._url);
    }
    if (json.version !== undefined) {
      newInstance.version = PrimitiveString.parsePrimitive(json.version, json._version);
    }
    if (json.singleCode !== undefined) {
      newInstance.singleCode = CodeableConcept.parse(json.singleCode);
    }
    if (json.coding !== undefined) {
      newInstance.coding = json.coding.map((x) => Coding.parse(x));
    }
    if (json.times !== undefined) {
      newInstance.times = json.times.map((x, i) => PrimitiveTime.parsePrimitive(x, json._times?.[i]));
    }
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

  public static isKitchenSink(input?: unknown): input is KitchenSink {
    const castInput = input as KitchenSink;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "KitchenSink";
  }

  public toJSON(): IKitchenSink {
    const result: IKitchenSink = super.toJSON();

    if (this.system) {
      result.system = this.system;
    }

    if (this.url) {
      result.url = this.url.value;
      result._url = Extension.serializePrimitiveExtension(this.url);
    }

    if (this.version) {
      result.version = this.version.value;
      result._version = Extension.serializePrimitiveExtension(this.version);
    }

    if (this.singleCode) {
      result.singleCode = this.singleCode.toJSON();
    }

    if (this.coding) {
      result.coding = this.coding.map((x) => x.toJSON());
    }

    if (this.times) {
      result.times = this.times.filter(x => !!x).map(x => x.value) as typeof result.times;
      result._times = Extension.serializePrimitiveExtensionArray(this.times);
    }

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

  public clone(): KitchenSink {
    return KitchenSink.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "KitchenSink";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
