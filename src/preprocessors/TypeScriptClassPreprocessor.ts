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
import ModifyExtensionTypeTransformer from "../collectionUtils/ModifyExtensionTypeTransformer";
import HasPrimitiveMembersPredicate from "../collectionUtils/HasPrimitiveMembersPredicate";
import TransformedPredicate from "../collectionUtils/core/TransformedPredicate";
import ExtractDataTypeTransformer from "../collectionUtils/ExtractDataTypeTransformer";
import IsDataTypePredicate from "../collectionUtils/IsDataTypePredicate";
import SetPrimaryCodeTransformer from "../collectionUtils/SetPrimaryCodeTransformer";

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
    const noOpTransformer = new NOPTransformer<EntityDefinition>();
    const addComplexImportsTransformer = new IfTransformer(
      notPrimitivePredicate,
      addInterfaceImportsTransformer,
      noOpTransformer
    );

    // Add Extension import to everything with a primitive member
    // (But not the Extension type itself)
    // Predicate that checks if an EntityDefinition is for FHIR.Extension
    const extensionEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      new IsDataTypePredicate("FHIR", "Extension")
    );
    const notExtensionPredicate = new NotPredicate(extensionEntityPredicate);
    const extensionImportPredicate = new AllPredicate(
      notExtensionPredicate,
      new HasPrimitiveMembersPredicate()
    );
    const extensionType = DataType.getInstance(
      "FHIR",
      "Extension",
      entityCollection.baseDir
    );
    const addExtensionImportTransformer = new IfTransformer(
      extensionImportPredicate,
      new AddImportTransformer(extensionType),
      noOpTransformer
    );

    // Modify the Extension type
    const modifyExtensionTypeTransformer = new ModifyExtensionTypeTransformer(
      entityCollection.baseDir
    );

    // Compute the primaryCode values
    const setPrimaryCodeTypeTransformer = new SetPrimaryCodeTransformer(entityCollection);

    const chainedTransformer = new ChainedTransformer<EntityDefinition>(
      addPrimitiveImportsTransformer,
      addComplexImportsTransformer,
      modifyExtensionTypeTransformer,
      addExtensionImportTransformer,
      setPrimaryCodeTypeTransformer
    );

    return entityCollection.transform(chainedTransformer);
  }
}
