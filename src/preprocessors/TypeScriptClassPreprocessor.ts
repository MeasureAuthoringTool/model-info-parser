import Preprocessor from "./Preprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import DataType from "../model/dataTypes/DataType";
import IsPrimitiveEntityDefinitionPredicate from "../collectionUtils/IsPrimitiveEntityDefinitionPredicate";
import PrimitiveParentPredicate from "../collectionUtils/PrimitiveParentPredicate";
import AddImportTransformer from "../collectionUtils/AddImportTransformer";
import AddInterfaceImportTransformer from "../collectionUtils/AddInterfaceImportTransformer";
import NotPredicate from "../collectionUtils/core/NotPredicate";
import AllPredicate from "../collectionUtils/core/AllPredicate";
import NOPTransformer from "../collectionUtils/core/NOPTransformer";
import IfTransformer from "../collectionUtils/core/IfTransformer";
import ChainedTransformer from "../collectionUtils/core/ChainedTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

/**
 * EntityCollection Preprocessor for the TypeScript classes
 */
export default class TypeScriptClassPreprocessor implements Preprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    // Add IExtension import to primitive types
    const isPrimitivePredicate = new IsPrimitiveEntityDefinitionPredicate();
    const notPrimitivePredicate = new NotPredicate(isPrimitivePredicate);
    const primitiveParentPredicate = new NotPredicate(
      new PrimitiveParentPredicate()
    );
    const iExtensionPreciate = new AllPredicate(
      isPrimitivePredicate,
      primitiveParentPredicate
    );

    const iElementType = DataType.getInstance(
      "FHIR",
      "IElement",
      entityCollection.baseDir
    );

    const addIElementImportTransformer = new AddImportTransformer(iElementType);

    const addPrimitiveImportsTransformer = new IfTransformer(
      iExtensionPreciate,
      addIElementImportTransformer,
      new NOPTransformer<EntityDefinition>()
    );

    // Add imports to complex types
    const addInterfaceImportsTransformer = new AddInterfaceImportTransformer(
      entityCollection.baseDir
    );
    const addComplexImportsTransformer = new IfTransformer(
      notPrimitivePredicate,
      addInterfaceImportsTransformer,
      new NOPTransformer<EntityDefinition>()
    );

    const chainedTransformer = new ChainedTransformer<EntityDefinition>(
      addPrimitiveImportsTransformer,
      addComplexImportsTransformer
    );

    return entityCollection.transform(chainedTransformer);
  }
}
