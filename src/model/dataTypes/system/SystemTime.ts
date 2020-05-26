import DataType from "../DataType";

export default class SystemTime implements DataType {
  public readonly namespace: string = "System";
  public readonly typeName: string = "Date";
  public readonly normalizedName: string = "Date";
  public readonly systemType: boolean = true;
  public readonly primitive: boolean = true;
}
