/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  Coding,
  Element,
  Extension,
  ICodeableConcept,
  PrimitiveString,
  FieldMetadata
} from "../internal";

export class CodeableConcept extends Element {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "CodeableConcept";
  
  static readonly primaryCodePath: string | null = null;

  static get fieldInfo(): Array<FieldMetadata> {
    return [...Element.fieldInfo, {
      fieldName: "coding",
      fieldType: [Coding],
      isArray: true
    }, {
      fieldName: "text",
      fieldType: [PrimitiveString],
      isArray: false
    }];
  }

  public coding?: Array<Coding>;

  public text?: PrimitiveString;

  public static parse(
    json: ICodeableConcept,
    providedInstance: CodeableConcept = new CodeableConcept()
  ): CodeableConcept {
    const newInstance: CodeableConcept = Element.parse(json, providedInstance);
  
    if (json.coding !== undefined) {
      newInstance.coding = json.coding.map((x) => Coding.parse(x));
    }
    if (json.text !== undefined) {
      newInstance.text = PrimitiveString.parsePrimitive(json.text, json._text);
    }
    return newInstance;
  }

  public static isCodeableConcept(input?: unknown): input is CodeableConcept {
    const castInput = input as CodeableConcept;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "CodeableConcept";
  }

  public toJSON(): ICodeableConcept {
    const result: ICodeableConcept = super.toJSON();

    if (this.coding) {
      result.coding = this.coding.map((x) => x.toJSON());
    }

    if (this.text) {
      result.text = this.text.value;
      result._text = Extension.serializePrimitiveExtension(this.text);
    }

    return result;
  }

  public clone(): CodeableConcept {
    return CodeableConcept.parse(this.toJSON());
  }

  public getTypeName(): string {
    return "CodeableConcept";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
