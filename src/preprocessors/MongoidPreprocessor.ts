import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import TransformedPredicate from "../collectionUtils/core/TransformedPredicate";
import ExtractDataTypeTransformer from "../collectionUtils/ExtractDataTypeTransformer";
import IsDataTypePredicate from "../collectionUtils/IsDataTypePredicate";
import MemberVariable, {
  RelationshipType,
} from "../model/dataTypes/MemberVariable";
import DataType from "../model/dataTypes/DataType";
import AddMemberVariableTransformer from "../collectionUtils/AddMemberVariableTransformer";
import IfTransformer from "../collectionUtils/core/IfTransformer";
import NOPTransformer from "../collectionUtils/core/NOPTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import ChainedTransformer from "../collectionUtils/core/ChainedTransformer";

/**
 * EntityCollection Preprocessor for the Mongoid-specific model generation
 */
export default class MongoidPreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    // Perform all the "base" transformations
    const startingCollection = super.preprocess(entityCollection);

    // Predicate that checks if a DataType is for FHIR.Measure
    const measureDataTypePredicate = new IsDataTypePredicate("FHIR", "Measure");

    // Predicate that checks if an EntityDefinition is for FHIR.Measure
    const measureEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      measureDataTypePredicate
    );

    // ValueSet DataType
    const valueSetType = DataType.getInstance(
      "FHIR",
      "ValueSet",
      entityCollection.baseDir
    );

    // Patient DataType
    const patientType = DataType.getInstance(
      "FHIR",
      "Patient",
      entityCollection.baseDir
    );

    // ValueSet MemberVariable to add
    const valueSetCollectionMember = new MemberVariable(
      valueSetType,
      "valueSets",
      true,
      RelationshipType.HasAndBelongsToMany,
      false
    );

    // Patient MemberVariable to add
    const patientCollectionMember = new MemberVariable(
      patientType,
      "patients",
      true,
      RelationshipType.HasAndBelongsToMany,
      false
    );

    // Transformer to add the "valueSets" member variable
    const addValueSetsTransformer = new AddMemberVariableTransformer(
      valueSetCollectionMember
    );

    // Transformer to add the "patients" member variable
    const addPatientsTransformer = new AddMemberVariableTransformer(
      patientCollectionMember
    );

    // Chained transformer that performs all modifications
    const chainedTransformer = new ChainedTransformer(
      addValueSetsTransformer,
      addPatientsTransformer
    );

    // Transformer that only modifies the Measure entity
    const ifTransformer = new IfTransformer(
      measureEntityPredicate,
      chainedTransformer,
      new NOPTransformer<EntityDefinition>()
    );

    return startingCollection.transform(ifTransformer);
  }
}
