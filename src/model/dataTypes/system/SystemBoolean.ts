import IDataType from "../IDataType";

export default class SystemBoolean implements IDataType {
  public readonly namespace: string = "System";

  public readonly typeName: string = "boolean";

  public readonly normalizedName: string = "boolean";

  public readonly systemType: boolean = true;

  public readonly primitive: boolean = true;
}
