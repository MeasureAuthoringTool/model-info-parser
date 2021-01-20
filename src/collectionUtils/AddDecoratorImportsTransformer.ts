import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";
import AddImportTransformer from "./AddImportTransformer";
import DataType from "../model/dataTypes/DataType";

/**
 * This transformer adds imports for FhirField, FhirList and FhirChoice
 * if the EntityDefinition has those types of fields.
 */
export default class AddDecoratorImportsTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public readonly baseDir: FilePath) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    const { memberVariables } = input;

    const hasField = !!memberVariables.find((member) => {
      if (member.isArray) {
        return false;
      }
      return member.choiceTypes.length === 0;
    });
    const hasList = !!memberVariables.find((member) => member.isArray);
    const hasChoice = !!memberVariables.find(
      (member) => member.choiceTypes.length > 1
    );

    let result: EntityDefinition = input.clone();
    if (hasField) {
      const fhirFieldType = DataType.getInstance(
        "FHIR",
        "FhirField",
        this.baseDir
      );
      const transformer = new AddImportTransformer(fhirFieldType);
      result = transformer.transform(result);
    }
    if (hasList) {
      const fhirListType = DataType.getInstance(
        "FHIR",
        "FhirList",
        this.baseDir
      );
      const transformer = new AddImportTransformer(fhirListType);
      result = transformer.transform(result);
    }
    if (hasChoice) {
      const fhirChoiceType = DataType.getInstance(
        "FHIR",
        "FhirChoice",
        this.baseDir
      );
      const transformer = new AddImportTransformer(fhirChoiceType);
      result = transformer.transform(result);
    }

    return result;
  }
}
