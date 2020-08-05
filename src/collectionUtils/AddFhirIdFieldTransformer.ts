import EntityDefinition from "../model/dataTypes/EntityDefinition";
import IfTransformer from "./core/IfTransformer";
import NOPTransformer from "./core/NOPTransformer";
import MemberVariable from "../model/dataTypes/MemberVariable";
import SystemString from "../model/dataTypes/system/SystemString";
import AddMemberVariableTransformer from "./AddMemberVariableTransformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";

// MemberVariable to add
const fhirIdMember = new MemberVariable(SystemString, "fhirId");

// Transformer to add the member variable
const addMemberTransformer = new AddMemberVariableTransformer(fhirIdMember);

/**
 * This is a transformer that, when evaluating an EntityDefinition,
 * will add a new MemberVariable of type string, named "fhirId"
 * to the resource satisfying the given predicate
 */
export default class AddFhirIdFieldTransformer extends IfTransformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(dataTypePredicate: IsDataTypePredicate) {
    const resourceEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      dataTypePredicate
    );
    super(
      resourceEntityPredicate,
      addMemberTransformer,
      new NOPTransformer<EntityDefinition>()
    );
  }
}
