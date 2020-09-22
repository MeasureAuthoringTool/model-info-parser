import EntityDefinition from "../model/dataTypes/EntityDefinition";
import Transformer from "./core/Transformer";
import IsDataTypePredicate from "./IsDataTypePredicate";
import EntityImports from "../model/dataTypes/EntityImports";
import DataType from "../model/dataTypes/DataType";
import FilePath from "../model/dataTypes/FilePath";
import MemberVariable from "../model/dataTypes/MemberVariable";

const isIResourcePredicate = new IsDataTypePredicate("FHIR", "IResource");

export default class AnyResourceTypeTransformer
  implements Transformer<EntityDefinition, EntityDefinition> {
  constructor(public readonly baseDir: FilePath) {}

  transform(input: EntityDefinition): EntityDefinition {
    const iResourceMembers = input.memberVariables.filter(
      (member) =>
        isIResourcePredicate.evaluate(member.dataType) ||
        member.choiceTypes.some((type) => isIResourcePredicate.evaluate(type))
    );

    if (iResourceMembers.length === 0) {
      return input;
    }

    const iResourceType = DataType.getInstance(
      "FHIR",
      "IResource",
      this.baseDir
    );
    const anyResourceType = DataType.getInstance(
      "FHIR",
      "AnyResource",
      this.baseDir
    );

    // Replace IResource member types with "AnyResource"
    const newMembers = input.memberVariables.map((member) => {
      const newDataType = isIResourcePredicate.evaluate(member.dataType)
        ? anyResourceType
        : member.dataType;

      const newChoices = member.choiceTypes.map((type) => {
        if (isIResourcePredicate.evaluate(type)) {
          return anyResourceType;
        }
        return type;
      });

      return new MemberVariable(
        newDataType,
        member.variableName,
        member.isArray,
        member.relationshipType,
        member.bidirectional,
        newChoices
      );
    });

    // Replace "IResource" imports with "AnyResource"
    const newImportTypes = input.imports.dataTypes.map((type) => {
      if (type === iResourceType) {
        return anyResourceType;
      }
      return type;
    });

    // If entity extends IResource, add that import back
    if (input.parentDataType === iResourceType) {
      newImportTypes.push(iResourceType);
    }

    const newImports = new EntityImports(newImportTypes);

    return input.clone({
      memberVariables: newMembers,
      imports: newImports,
    });
  }
}
