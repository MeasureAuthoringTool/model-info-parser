import Predicate from "./core/Predicate";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

/**
 * This predicate looks for types that should have extended FHIR.code
 * in the modelinfo.xml file. A future fix to the modelinfo.xml
 * should make this predicate unnecessary.
 *
 * The criteria is any EntityDefinition that:
 *  - extends FHIR.Element
 *  - has a single MemberVariable named "value" of type System.string
 */
export default class InlineValueSetTypePredicate
  implements Predicate<EntityDefinition> {
  evaluate(input: EntityDefinition): boolean {
    const { dataType, parentDataType, memberVariables } = input;
    // Must not already be primitive
    if (dataType.primitive) {
      return false;
    }

    // Must extend FHIR.Element
    if (
      !parentDataType ||
      parentDataType.namespace !== "FHIR" ||
      parentDataType.normalizedName !== "Element"
    ) {
      return false;
    }

    // Must have a single memberVariable
    if (memberVariables.length !== 1) {
      return false;
    }

    const [member] = memberVariables;

    // Single member must be a System.String named "value"
    return !(
      member.variableName !== "value" ||
      !member.dataType.systemType ||
      member.dataType.normalizedName !== "String"
    );
  }
}
