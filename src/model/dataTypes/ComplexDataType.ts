import { normalizeTypeName } from "../../utils";
import IDataType from "./IDataType";
import { primitiveTypeCheck } from "./primitiveDataTypes";

export default class ComplexDataType implements IDataType {
  public normalizedName: string;
  public primitive: boolean;

  constructor(
    public readonly namespace: string,
    public readonly typeName: string,
    public readonly systemType: boolean = false
  ) {
    this.normalizedName = normalizeTypeName(this.typeName);
    this.primitive = primitiveTypeCheck(this.typeName);
  }
}
