/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  CodeableConcept,
  Coding,
  Element,
  Extension,
  IKitchenSink,
  PrimitiveBoolean,
  PrimitiveCanonical,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUrl,
} from "../internal";

export class KitchenSink extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "KitchenSink";

  public system?: string;

  public url?: PrimitiveUrl;

  public version?: PrimitiveString;

  public singleCode?: CodeableConcept;

  public coding?: Array<Coding>;

  public times?: Array<PrimitiveTime>;

  public options?: PrimitiveBoolean | PrimitiveCanonical | Coding;

  public static parse(
    json: IKitchenSink,
    providedInstance: KitchenSink = new KitchenSink()
  ): KitchenSink {
    const newInstance: KitchenSink = Element.parse(json, providedInstance);
  
    if (json.system) {
      newInstance.system = json.system;
    }
    if (json.url) {
      newInstance.url = PrimitiveUrl.parsePrimitive(json.url, json._url);
    }
    if (json.version) {
      newInstance.version = PrimitiveString.parsePrimitive(json.version, json._version);
    }
    if (json.singleCode) {
      newInstance.singleCode = CodeableConcept.parse(json.singleCode);
    }
    if (json.coding) {
      newInstance.coding = json.coding.map((x) => Coding.parse(x));
    }
    if (json.times) {
      newInstance.times = json.times.map((x, i) => {
        const ext = json._times && json._times[i];
        return PrimitiveTime.parsePrimitive(x, ext);
      });
    }
    if (json.optionsBoolean) {
      newInstance.options = PrimitiveBoolean.parsePrimitive(json.optionsBoolean, json._optionsBoolean);
    }
    if (json.optionsCanonical) {
      newInstance.options = PrimitiveCanonical.parsePrimitive(json.optionsCanonical, json._optionsCanonical);
    }
    if (json.optionsCoding) {
      newInstance.options = Coding.parse(json.optionsCoding);
    }
    return newInstance;
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
  
  public getTypeName(): string {
    return "KitchenSink";
  }
  
  public static isKitchenSink(input?: unknown): input is KitchenSink {
    const castInput = input as KitchenSink;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "KitchenSink";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
