import IfTransformer from "./core/IfTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import NOPTransformer from "./core/NOPTransformer";
import NotPredicate from "./core/NotPredicate";
import IsDataTypePredicate from "./IsDataTypePredicate";
import HasParentPredicate from "./HasParentPredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";
import Transformer from "./core/Transformer";
import AddImportTransformer from "./AddImportTransformer";
import SetParentTransformer from "./SetParentTransformer";
import ChainedTransformer from "./core/ChainedTransformer";
import AllPredicate from "./core/AllPredicate";
import FilePath from "../model/dataTypes/FilePath";

/**
 * A Transformer that modifies types with no parent to extend our
 * hand-made FHIR.Type type
 *
 * Upon detecting a type with no parent, this transformer will:
 * - add an import for FHIR.Type
 * - add FHIR.type as the parent of FHIR.Element
 */
export default class ModifyRootTypeTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public baseDir: FilePath) {
    super();
  }

  transform(input: EntityDefinition): EntityDefinition {
    // Predicate that checks if an EntityDefinition is the root FHIR.Type
    const typeEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      new IsDataTypePredicate("FHIR", "Type")
    );

    // Predicate that checks if an EntityDefinition is ANYTHING BUT the root FHIR.Type
    const notTypeEntityPredicate = new NotPredicate(typeEntityPredicate);

    // Predicate that checks if an EntityDefinition has no parent, and it is NOT the FHIR.Type
    const combinedPredicate = new AllPredicate(
      notTypeEntityPredicate,
      new NotPredicate(HasParentPredicate.INSTANCE)
    );

    // Construct a DataType for FHIR.Type
    const typeDataType = DataType.getInstance(
      "FHIR",
      "Type",
      this.baseDir
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
      combinedPredicate,
      chainedTransformer,
      new NOPTransformer()
    );

    return ifTransformer.transform(input);
  }
}
