import EntityDefinition from "../model/dataTypes/EntityDefinition";
import IfTransformer from "./core/IfTransformer";
import NOPTransformer from "./core/NOPTransformer";
import MemberVariable from "../model/dataTypes/MemberVariable";
import SystemString from "../model/dataTypes/system/SystemString";
import AddMemberVariableTransformer from "./AddMemberVariableTransformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";

// Predicate that checks if a DataType is for FHIR.Resource
const resourceDataTypePredicate = new IsDataTypePredicate("FHIR", "Resource");

// Predicate that checks if an EntityDefinition is for FHIR.Resource
const resourceEntityPredicate = new TransformedPredicate(
  ExtractDataTypeTransformer.INSTANCE,
  resourceDataTypePredicate
);

// MemberVariable to add
const resourceTypeMember = new MemberVariable(SystemString, "resourceType");

// Transformer to add the member variable
const addMemberTransformer = new AddMemberVariableTransformer(
  resourceTypeMember
);

/**
 * This is a transformer that, when evaluating an EntityDefinition, will add a new
 * MemberVariable of type string, named "resourceType", but only if the EntityDefinition
 * in question is for FHIR.Resource
 */
export default class AddResourceTypeFieldTransformer extends IfTransformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor() {
    super(
      resourceEntityPredicate,
      addMemberTransformer,
      new NOPTransformer<EntityDefinition>()
    );
  }
}
