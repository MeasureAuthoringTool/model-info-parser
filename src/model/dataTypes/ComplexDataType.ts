import DataType from "./DataType";
import { normalizeTypeName } from "../../utils";
import { primitiveTypeCheck } from "./primitiveDataTypes";

export default class ComplexDataType implements DataType {
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
