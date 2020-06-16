import _ from "lodash";
import DataType from "./DataType";
import Predicate from "../../collectionUtils/core/Predicate";
import CollectionUtils from "../../collectionUtils/CollectionUtils";

export default class EntityImports {
  public readonly dataTypes: Array<DataType>;

  constructor(dataTypes: Array<DataType>) {
    const uniqueDataTypes = EntityImports.removeDuplicateDataTypes(dataTypes);
    this.dataTypes = EntityImports.sortDataTypes(uniqueDataTypes);
  }

  /**
   * Sort an Array of DataTypes by their normalized name (case-insensitive)
   */
  public static sortDataTypes(input: Array<DataType>): Array<DataType> {
    return input.sort((t1: DataType, t2: DataType): number => {
      const name1 = t1.normalizedName.toUpperCase();
      const name2 = t2.normalizedName.toUpperCase();

      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  public static removeDuplicateDataTypes(
    input: Array<DataType>
  ): Array<DataType> {
    const initial: Array<DataType> = [];

    return input.reduce((accumulator, currentType) => {
      if (!currentType.systemType && !_.find(accumulator, currentType)) {
        accumulator.push(currentType);
      }
      return accumulator;
    }, initial);
  }

  public clone(): EntityImports {
    return new EntityImports([...this.dataTypes]);
  }

  public addImport(importType: DataType): EntityImports {
    const newTypes = [...this.dataTypes, importType];
    return new EntityImports(newTypes);
  }

  public removeImports(predicate: Predicate<DataType>): EntityImports {
    const newTypes = CollectionUtils.selectRejected(this.dataTypes, predicate);
    return new EntityImports(newTypes);
  }
}
