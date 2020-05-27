import IDataType from "../IDataType";

export default class SystemDate implements IDataType {
  public readonly namespace: string = "System";
  public readonly typeName: string = "Date";
  public readonly normalizedName: string = "Date";
  public readonly systemType: boolean = true;
  public readonly primitive: boolean = true;
}
