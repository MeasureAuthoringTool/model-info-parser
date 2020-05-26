import DataType from "../DataType";

export default class SystemBoolean implements DataType {
  public readonly namespace: string = "System";
  public readonly typeName: string = "boolean";
  public readonly normalizedName: string = "boolean";
  public readonly systemType: boolean = true;
  public readonly primitive: boolean = true;
}
