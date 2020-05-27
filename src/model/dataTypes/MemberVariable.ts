import IDataType from "./IDataType";

export default class MemberVariable {
  public readonly dataType: IDataType;
  public readonly variableName: string;
  public readonly isArray: boolean;

  constructor(dataType: IDataType, variableName: string, isArray: boolean = false) {
    this.dataType = dataType;
    this.variableName = variableName;
    this.isArray = isArray;
  }
}
