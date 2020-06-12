import IfTransformer from "./core/IfTransformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import NOPTransformer from "./core/NOPTransformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import TransformedPredicate from "./core/TransformedPredicate";
import ExtractDataTypeTransformer from "./ExtractDataTypeTransformer";
import MemberVariable from "../model/dataTypes/MemberVariable";
import SystemString from "../model/dataTypes/system/SystemString";
import Transformer from "./core/Transformer";
import RemoveImportsTransformer from "./RemoveImportsTransformer";
import RemoveParentTransformer from "./RemoveParentTransformer";
import AddMemberVariableTransformer from "./AddMemberVariableTransformer";
import ChainedTransformer from "./core/ChainedTransformer";

/**
 * A Transformer that modifies the FHIR.Extension type to no longer extend FHIR.Element.
 *
 * Upon detecting a FHIR.Extension type, this transformer will:
 * - remove the parent type of Element from FHIR.Extension
 * - remove the FHIR.Element from the list of imports
 * - add a new "id" member (which it used to get from Element)
 * - add a new "extension" member (which it used to get from Element)
 */
export default class ModifyExtensionTypeTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  // eslint-disable-next-line class-methods-use-this
  transform(input: EntityDefinition): EntityDefinition {
    // Predicate that checks if an EntityDefinition is for FHIR.Extension
    const extensionEntityPredicate = new TransformedPredicate(
      ExtractDataTypeTransformer.INSTANCE,
      new IsDataTypePredicate("FHIR", "Extension")
    );

    // Transformer that removes the Extension's parent type of Element
    const removeParentTransformer = new RemoveParentTransformer();

    // Transformer that removes the FHIR.Element import from a type
    const removeElementTransformer = new RemoveImportsTransformer(
      new IsDataTypePredicate("FHIR", "Element")
    );

    // Transformer that adds a new "id" MemberVariable
    const idMember = new MemberVariable(SystemString, "id");
    const addIdMemberTransformer = new AddMemberVariableTransformer(idMember);

    // Transformer that adds a new "extension" array MemberVariable
    const extensionMember = new MemberVariable(
      input.dataType,
      "extension",
      true
    );
    const addExtensionMemberTransformer = new AddMemberVariableTransformer(
      extensionMember
    );

    // Chain the transformers together
    const chainedTransformer = new ChainedTransformer<EntityDefinition>(
      removeParentTransformer,
      removeElementTransformer,
      addIdMemberTransformer,
      addExtensionMemberTransformer
    );

    // Only execute transformer if it matches predicate
    const ifTransformer = new IfTransformer(
      extensionEntityPredicate,
      chainedTransformer,
      new NOPTransformer()
    );

    return ifTransformer.transform(input);
  }
}
