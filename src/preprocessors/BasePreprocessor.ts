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
import AddFhirIdFieldTransformer from "../collectionUtils/AddFhirIdFieldTransformer";
import IsDataTypePredicate from "../collectionUtils/IsDataTypePredicate";

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

  public addFhirIdToResourceTransformer: Transformer<
    EntityDefinition,
    EntityDefinition
  >;

  public addFhirIdToElementTransformer: Transformer<
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
    // Predicate that checks if a DataType is for FHIR.Resource
    const resourceDataTypePredicate = new IsDataTypePredicate("FHIR", "Resource");
    // Predicate that checks if a DataType is for FHIR.Element
    const elementDataTypePredicate = new IsDataTypePredicate("FHIR", "Element");
    this.addFhirIdToResourceTransformer = new AddFhirIdFieldTransformer(resourceDataTypePredicate);
    this.addFhirIdToElementTransformer = new AddFhirIdFieldTransformer(elementDataTypePredicate);
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

    // Add fhirId field to Resource entity
    result = result.transform(this.addFhirIdToResourceTransformer);

    // Add fhirId field to Element entity
    result = result.transform(this.addFhirIdToElementTransformer);

    return result;
  }
}
