import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import MemberVariable from "../model/dataTypes/MemberVariable";
import EntityImports from "../model/dataTypes/EntityImports";

/**
 * This transformer return a deep copy of the input EntityDefinition
 * with its imports modified to pull in choice types
 */
export default class ChoiceMemberImportTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  public transform(input: EntityDefinition): EntityDefinition {
    // Get a clone of the input's components
    const {
      metadata,
      dataType,
      parentDataType,
      memberVariables,
      imports,
      collectionName,
    } = input.clone();

    // Loop through each of the member variables.
    // If the data type is a choice type, add those choices to the list of imports
    // Finally, delete the parent type (e.g. "FHIR.Type") from the list of imports.
    const newImportTypes: Array<DataType> = memberVariables.reduce(
      (
        accumulator: Array<DataType>,
        current: MemberVariable
      ): Array<DataType> => {
        if (current.choiceTypes.length > 0) {
          // Remove parent type (e.g. FHIR.Type) from imports
          const filtered: Array<DataType> = accumulator.filter(
            (type) => type !== current.dataType
          );

          // Add the choice types
          return [...filtered, ...current.choiceTypes];
        }

        // If no choiceTypes, don't add anything
        return accumulator;
      },
      imports.dataTypes
    );

    const newImports = new EntityImports(newImportTypes);

    return new EntityDefinition(
      metadata,
      dataType,
      parentDataType,
      memberVariables,
      newImports,
      collectionName
    );
  }
}
