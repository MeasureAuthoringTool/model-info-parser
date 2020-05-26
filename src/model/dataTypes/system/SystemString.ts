import DataType from "../DataType"

export default class SystemString implements DataType {
  public readonly namespace: string = "System";
  public readonly typeName: string = "string";
  public readonly normalizedName: string = "string";
  public readonly systemType: boolean = true;
  public readonly primitive: boolean = true;
}

export const SystemStringInstance: SystemString = new SystemString();
