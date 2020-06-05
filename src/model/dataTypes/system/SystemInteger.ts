import IDataType from "../IDataType";

// TODO this should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
// See https://www.hl7.org/fhir/json.html
export default class SystemInteger implements IDataType {
  public readonly namespace: string = "System";

  public readonly typeName: string = "number";

  public readonly normalizedName: string = "number";

  public readonly systemType: boolean = true;

  public readonly primitive: boolean = true;
}
