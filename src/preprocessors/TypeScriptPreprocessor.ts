import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import NOPTransformer from "../collectionUtils/core/NOPTransformer";
import IfTransformer from "../collectionUtils/core/IfTransformer";
import ChainedTransformer from "../collectionUtils/core/ChainedTransformer";
import ChoiceMemberImportTransformer from "../collectionUtils/ChoiceMemberImportTransformer";
import AddImportTransformer from "../collectionUtils/AddImportTransformer";
import HasPrimitiveMembersPredicate from "../collectionUtils/HasPrimitiveMembersPredicate";
import DataType from "../model/dataTypes/DataType";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

/**
 * EntityCollection Preprocessor for the TypeScript-specific model generation
 */
export default class TypeScriptPreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    const superResult = super.preprocess(entityCollection);

    // Add imports for all the choice members
    const choiceImportTransformer = new ChoiceMemberImportTransformer();

    // Add a FHIR.Element import if the entity has any primitive members
    const elementType = DataType.getInstance(
      "FHIR",
      "Element",
      entityCollection.baseDir
    );
    const addElementTransformer = new AddImportTransformer(elementType);
    const elementImportTransformer = new IfTransformer(
      new HasPrimitiveMembersPredicate(),
      addElementTransformer,
      new NOPTransformer()
    );

    const chainedTransformer = new ChainedTransformer<EntityDefinition>(
      choiceImportTransformer,
      elementImportTransformer
    );

    return superResult.transform(chainedTransformer);
  }
}
