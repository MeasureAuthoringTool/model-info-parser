import Predicate from "./core/Predicate";
import DataType from "../model/dataTypes/DataType";

interface BlacklistItem {
  namespace: string;
  name: string;
}

export default class BlacklistedTypesPredicate extends Predicate<DataType> {
  public static INSTANCE = new BlacklistedTypesPredicate();

  public static blacklistedTypes: Array<BlacklistItem> = [
    { namespace: "FHIR", name: "allowedUnits" },
    {
      namespace: "FHIR",
      name: "DataElement constraint on ElementDefinition data type",
    },
  ];

  evaluate(input: DataType): boolean {
    const { typeName, namespace } = input;
    const blacklistPredicate = (dataType: BlacklistItem): boolean => {
      return dataType.name === typeName && dataType.namespace === namespace;
    };

    return (
      BlacklistedTypesPredicate.blacklistedTypes.findIndex(
        blacklistPredicate
      ) !== -1
    );
  }
}
