import Preprocessor from "./Preprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityMetadata from "../model/dataTypes/EntityMetadata";
import TransformedPredicate from "../collectionUtils/core/TransformedPredicate";
import ExtractDataTypeTransformer from "../collectionUtils/ExtractDataTypeTransformer";
import BlacklistedTypesPredicate from "../collectionUtils/BlacklistedTypesPredicate";
import AddResourceTypeFieldTransformer from "../collectionUtils/AddResourceTypeFieldTransformer";
import InlineValueSetTypeTransformer from "../collectionUtils/InlineValueSetTypeTransformer";
import InlineValueSetTypePredicate from "../collectionUtils/InlineValueSetTypePredicate";
import Predicate from "../collectionUtils/core/Predicate";
import Transformer from "../collectionUtils/core/Transformer";
import IfTransformer from "../collectionUtils/core/IfTransformer";
import NOPTransformer from "../collectionUtils/core/NOPTransformer";
import ModifyElementTypeTransformer from "../collectionUtils/ModifyElementTypeTransformer";
import DataType from "../model/dataTypes/DataType";
import EntityImports from "../model/dataTypes/EntityImports";

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

  public modifyElementTypeTransformer: Transformer<
    EntityDefinition,
    EntityDefinition
  >;

  constructor() {
    this.blacklistPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      BlacklistedTypesPredicate.INSTANCE
    );
    this.addResourceTypeTransformer = new AddResourceTypeFieldTransformer();
    this.modifyElementTypeTransformer = new ModifyElementTypeTransformer();
  }

  preprocess(entityCollection: EntityCollection): EntityCollection {
    // Filter blacklisted types
    let result: EntityCollection = entityCollection.selectRejected(
      this.blacklistPredicate
    );

    // Inline ValueSet types
    const inlineValueSetTypeTransformer = new IfTransformer<
      EntityDefinition,
      EntityDefinition
    >(
      new InlineValueSetTypePredicate(),
      new InlineValueSetTypeTransformer(entityCollection.baseDir),
      new NOPTransformer()
    );
    result = result.transform(inlineValueSetTypeTransformer);

    // Add resourceType field to Resource entity
    result = result.transform(this.addResourceTypeTransformer);

    // Modify the "FHIR.Element" type to inherit our base "FHIR.Type" type
    result = result.transform(this.modifyElementTypeTransformer);

    // Create a new "FHIR.Type" type and add it to our collection
    const metadata = new EntityMetadata("FHIR", "Type", "");

    const fhirTypeDataType = DataType.getInstance(
      "FHIR",
      "Type",
      entityCollection.baseDir
    );
    const imports = new EntityImports([]);
    const fhirType = new EntityDefinition(
      metadata,
      fhirTypeDataType,
      null,
      [],
      imports
    );
    result = result.addEntityDefinition(fhirType);

    return result;
  }
}
