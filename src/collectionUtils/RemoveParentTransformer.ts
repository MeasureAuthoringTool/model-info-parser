import EntityDefinition from "../model/dataTypes/EntityDefinition";
import Transformer from "./core/Transformer";

export default class RemoveParentTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  public transform(input: EntityDefinition): EntityDefinition {
    if (input.parentDataType === null) {
      return input;
    }
    return new EntityDefinition(
      input.metadata,
      input.dataType,
      null,
      input.memberVariables,
      input.imports
    );
  }
}
