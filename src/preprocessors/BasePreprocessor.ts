import Preprocessor from "./Preprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import TransformedPredicate from "../collectionUtils/core/TransformedPredicate";
import ExtractDataTypeTransformer from "../collectionUtils/ExtractDataTypeTransformer";
import BlacklistedTypesPredicate from "../collectionUtils/BlacklistedTypesPredicate";
import AddResourceTypeFieldTransformer from "../collectionUtils/AddResourceTypeFieldTransformer";
import Predicate from "../collectionUtils/core/Predicate";
import Transformer from "../collectionUtils/core/Transformer";
import ModifyExtensionTypeTransformer from "../collectionUtils/ModifyExtensionTypeTransformer";

/**
 * This EntityCollection Preprocessor contains preprocessing
 * logic common to all types of model generation
 */
export default class BaseProcessor implements Preprocessor {
  public blacklistPredicate: Predicate<EntityDefinition>;

  public addResourceTypeTransformer: Transformer<
    EntityDefinition,
    EntityDefinition
  >;

  public modifyExtensionTypeTransformer: Transformer<
    EntityDefinition,
    EntityDefinition
  >;

  constructor() {
    this.blacklistPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      BlacklistedTypesPredicate.INSTANCE
    );
    this.addResourceTypeTransformer = new AddResourceTypeFieldTransformer();
    this.modifyExtensionTypeTransformer = new ModifyExtensionTypeTransformer();
  }

  preprocess(entityCollection: EntityCollection): EntityCollection {
    // Filter blacklisted types
    let result: EntityCollection = entityCollection.selectRejected(
      this.blacklistPredicate
    );

    // Add resourceType field to Resource entity
    result = result.transform(this.addResourceTypeTransformer);

    // Modify the "FHIR.Extension" type to no longer extend FHIR.Element (to prevent circular dependencies)
    result = result.transform(this.modifyExtensionTypeTransformer);

    return result;
  }
}
