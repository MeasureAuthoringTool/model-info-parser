/* eslint-disable import/prefer-default-export, import/no-cycle */
import { 
  PrimitiveCode,
} from "../internal";

export class AddressType extends PrimitiveCode {
  static readonly baseType: string = "FHIR.Element";

  static readonly namespace: string = "FHIR";

  static readonly typeName: string = "AddressType";

  public static parsePrimitive(
    value: Parameters<typeof PrimitiveCode.parsePrimitive>[0],
    extension?: Parameters<typeof PrimitiveCode.parsePrimitive>[1],
    providedInstance: AddressType = new AddressType()
  ): AddressType {
      return PrimitiveCode.parsePrimitive(value, extension, providedInstance);
  }

  public static isAddressType(input?: unknown): input is AddressType {
    const castInput = input as AddressType;
    return !!input && castInput.getTypeName && castInput.getTypeName() === "AddressType";
  }
  
  public getTypeName(): string {
    return "AddressType";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */