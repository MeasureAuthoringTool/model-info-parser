import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import DataType from "../model/dataTypes/DataType";
import MemberVariable from "../model/dataTypes/MemberVariable";
import EntityImports from "../model/dataTypes/EntityImports";
import FilePath from "../model/dataTypes/FilePath";
import AddImportTransformer from "./AddImportTransformer";
import IfTransformer from "./core/IfTransformer";
import NOPTransformer from "./core/NOPTransformer";
import HasPrimitiveMembersPredicate from "./HasPrimitiveMembersPredicate";
import AnyResourceTypeTransformer from "./AnyResourceTypeTransformer";

export function convertDataType(
  inputType: DataType,
  baseDir: FilePath
): DataType {
  if (inputType.systemType) {
    return inputType;
  }

  const newType = DataType.getInstance(
    inputType.namespace,
    `I${inputType.normalizedName}`,
    baseDir
  );

  if (inputType.primitive) {
    newType.primitive = true;
  }

  return newType;
}

export default class TypeScriptInterfaceTransformer
  implements Transformer<EntityDefinition, EntityDefinition> {
  constructor(public readonly baseDir: FilePath) {}

  transform(input: EntityDefinition): EntityDefinition {
    // Add Element import if type has primitive members
    const elementType = DataType.getInstance("FHIR", "Element", this.baseDir);
    const addElementTransformer = new AddImportTransformer(elementType);
    const elementImportTransformer = new IfTransformer(
      new HasPrimitiveMembersPredicate(),
      addElementTransformer,
      new NOPTransformer()
    );

    const transformedInput = elementImportTransformer.transform(input);

    // Capture and clone original values
    const originalDataType: DataType = transformedInput.dataType;
    const originalParentType: DataType | null = transformedInput.parentDataType;
    const originalMemberVariables: Array<MemberVariable> = [
      ...transformedInput.memberVariables,
    ];
    const originalImports: EntityImports = transformedInput.imports.clone();

    // Convert dataType
    const newDataType = convertDataType(originalDataType, this.baseDir);

    // Convert parentDataType
    let newParentType: DataType | null = null;
    if (originalParentType) {
      newParentType = convertDataType(originalParentType, this.baseDir);
    }

    // Construct MemberVariables
    const newMemberVariables: Array<MemberVariable> = originalMemberVariables.map(
      (member) => {
        const newType = convertDataType(member.dataType, this.baseDir);
        const newChoiceTypes = member.choiceTypes.map((type) =>
          convertDataType(type, this.baseDir)
        );

        return new MemberVariable(
          newType,
          member.variableName,
          member.isArray,
          member.relationshipType,
          member.bidirectional,
          newChoiceTypes
        );
      }
    );

    // Construct imports
    const newImportTypes = originalImports.dataTypes.map((type) =>
      convertDataType(type, this.baseDir)
    );
    const newImports = new EntityImports(newImportTypes);

    const result = transformedInput.clone({
      dataType: newDataType,
      parentDataType: newParentType,
      memberVariables: newMemberVariables,
      imports: newImports,
    });

    // Transform result to change "Resource" to "AnyResource"
    return new AnyResourceTypeTransformer(this.baseDir).transform(result);
  }
}
