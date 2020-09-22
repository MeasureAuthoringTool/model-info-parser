import PathSegment from "./PathSegment";
import DataType from "./DataType";

export default class PrimaryCode {
  constructor(
    public readonly pathSegments: Array<PathSegment>,
    public readonly returnType: Array<DataType>
  ) {
    if (pathSegments.length === 0) {
      throw new Error("Cannot create PrimaryCode with no PathSegments");
    }
    if (returnType.length === 0) {
      throw new Error("Cannot create PrimaryCode with no return types");
    }
  }

  public clone(fieldsToUpdate?: Partial<PrimaryCode>): PrimaryCode {
    const partial: Partial<PrimaryCode> | undefined = fieldsToUpdate;

    let newPathSegments: Array<PathSegment>;
    if (partial?.pathSegments !== undefined) {
      newPathSegments = [...partial.pathSegments];
    } else {
      newPathSegments = [...this.pathSegments];
    }

    let newReturnType: Array<DataType>;
    if (partial?.returnType !== undefined) {
      newReturnType = [...partial.returnType];
    } else {
      newReturnType = [...this.returnType];
    }

    return new PrimaryCode(newPathSegments, newReturnType);
  }
}
