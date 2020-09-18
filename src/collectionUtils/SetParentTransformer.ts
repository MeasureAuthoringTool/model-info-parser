import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import Transformer from "./core/Transformer";

export default class SetParentTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public parentType: DataType | null) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    if (input.parentDataType === this.parentType) {
      return input;
    }

    return input.clone({
      parentDataType: this.parentType,
    });
  }
}
