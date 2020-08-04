import IfTransformer from "./core/IfTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import NOPTransformer from "./core/NOPTransformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";
import Transformer from "./core/Transformer";
import AddImportTransformer from "./AddImportTransformer";
import FilePath from "../model/dataTypes/FilePath";
import DataType from "../model/dataTypes/DataType";

/**
 * A Transformer that modifies the FHIR.Extension type to no longer extend FHIR.Element.
 *
 * Upon detecting a FHIR.Extension type, this transformer will:
 * - remove the parent type of Element from FHIR.Extension
 * - remove the FHIR.Element from the list of imports
 * - add a new "id" member (which it used to get from Element)
 * - add a new "extension" member (which it used to get from Element)
 */
export default class ModifyExtensionTypeTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public readonly baseDir: FilePath) {
    super();
  }

  transform(input: EntityDefinition): EntityDefinition {
    // Predicate that checks if an EntityDefinition is for FHIR.Extension
    const extensionEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      new IsDataTypePredicate("FHIR", "Extension")
    );

    const iElementType = DataType.getInstance("FHIR", "IElement", this.baseDir);
    const addIElementImportTransformer = new AddImportTransformer(iElementType);

    // Only execute transformer if it matches predicate
    const ifTransformer = new IfTransformer(
      extensionEntityPredicate,
      addIElementImportTransformer,
      new NOPTransformer()
    );

    return ifTransformer.transform(input);
  }
}
