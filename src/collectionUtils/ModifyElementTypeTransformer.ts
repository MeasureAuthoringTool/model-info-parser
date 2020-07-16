import IfTransformer from "./core/IfTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import NOPTransformer from "./core/NOPTransformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";
import Transformer from "./core/Transformer";
import AddImportTransformer from "./AddImportTransformer";
import SetParentTransformer from "./SetParentTransformer";
import ChainedTransformer from "./core/ChainedTransformer";

/**
 * A Transformer that modifies the FHIR.Element type to extend our
 * hand-made FHIR.Type type
 *
 * Upon detecting a FHIR.Element type, this transformer will:
 * - add an import for FHIR.Type
 * - add FHIR.type as the parent of FHIR.Element
 */
export default class ModifyElementTypeTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  transform(input: EntityDefinition): EntityDefinition {
    // Predicate that checks if an EntityDefinition is for FHIR.Element
    const elementEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      new IsDataTypePredicate("FHIR", "Element")
    );

    // Construct a DataType for FHIR.Type
    const typeDataType = DataType.getInstance(
      "FHIR",
      "Type",
      input.dataType.path
    );

    // Transformer that sets Element's parent type to FHIR.Type
    const setParentTransformer = new SetParentTransformer(typeDataType);

    // Transformer that adds the FHIR.Type import
    const addTypeImportTransformer = new AddImportTransformer(typeDataType);

    // Chain the transformers together
    const chainedTransformer = new ChainedTransformer<EntityDefinition>(
      setParentTransformer,
      addTypeImportTransformer
    );

    // Only execute transformer if it matches predicate
    const ifTransformer = new IfTransformer(
      elementEntityPredicate,
      chainedTransformer,
      new NOPTransformer()
    );

    return ifTransformer.transform(input);
  }
}
