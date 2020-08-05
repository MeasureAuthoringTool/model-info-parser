import Transformer from "./core/Transformer";
import DataType from "../model/dataTypes/DataType";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

export default class ExtractDataTypeTransformer extends Transformer<
  EntityDefinition,
  DataType
> {
  public static INSTANCE = new ExtractDataTypeTransformer();

  transform(input: EntityDefinition): DataType {
    return input.dataType;
  }
}
