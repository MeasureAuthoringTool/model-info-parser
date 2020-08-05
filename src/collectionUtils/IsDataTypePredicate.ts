import Predicate from "./core/Predicate";
import DataType from "../model/dataTypes/DataType";

export default class IsDataTypePredicate extends Predicate<DataType> {
  constructor(public namespace: string, public name: string) {
    super();
  }

  evaluate(input: DataType): boolean {
    return input.namespace === this.namespace && input.typeName === this.name;
  }
}
