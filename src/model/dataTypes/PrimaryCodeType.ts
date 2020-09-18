import DataType from "./DataType";

export default class PrimaryCodeType {
  constructor(
    public readonly dataType: DataType,
    public readonly isArray: boolean,
    public readonly path: string
  ) {}

  public clone(fieldsToUpdate?: Partial<PrimaryCodeType>): PrimaryCodeType {
    const partial: Partial<PrimaryCodeType> | undefined = fieldsToUpdate;

    let newDataType: DataType;
    if (partial?.dataType !== undefined) {
      newDataType = partial.dataType;
    } else {
      newDataType = this.dataType;
    }

    let newIsArray: boolean;
    if (partial?.isArray !== undefined) {
      newIsArray = partial.isArray;
    } else {
      newIsArray = this.isArray;
    }

    let newPath: string;
    if (partial?.path !== undefined) {
      newPath = partial.path;
    } else {
      newPath = this.path;
    }

    return new PrimaryCodeType(newDataType, newIsArray, newPath);
  }
}
