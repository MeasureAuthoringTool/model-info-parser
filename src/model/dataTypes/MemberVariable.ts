import DataType from "./DataType"

export default class MemberVariable {
  public readonly dataType: DataType;
  public readonly variableName: string;
  public readonly isArray: boolean;

  constructor(dataType: DataType, variableName: string, isArray: boolean = false) {
    this.dataType = dataType;
    this.variableName = variableName;
    this.isArray = isArray;
  }
}
