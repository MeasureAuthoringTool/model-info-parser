import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityMetadata from "../model/dataTypes/EntityMetadata";
import DataType from "../model/dataTypes/DataType";
import MemberVariable from "../model/dataTypes/MemberVariable";
import EntityImports from "../model/dataTypes/EntityImports";
import FilePath from "../model/dataTypes/FilePath";

export function convertDataType(
  inputType: DataType,
  baseDir: FilePath
): DataType {
  if (inputType.systemType) {
    return inputType;
  }

  return DataType.getInstance(
    inputType.namespace,
    `I${inputType.normalizedName}`,
    baseDir
  );
}

export default class TypeScriptInterfaceTransformer
  implements Transformer<EntityDefinition, EntityDefinition> {
  constructor(public readonly baseDir: FilePath) {}

  transform(input: EntityDefinition): EntityDefinition {
    // Capture and clone original values
    const metadata: EntityMetadata = input.metadata.clone();
    const originalDataType: DataType = input.dataType;
    const originalParentType: DataType | null = input.parentDataType;
    const originalMemberVariables: Array<MemberVariable> = [
      ...input.memberVariables,
    ];
    const originalImports: EntityImports = input.imports.clone();

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

    // Construct result
    return new EntityDefinition(
      metadata,
      newDataType,
      newParentType,
      newMemberVariables,
      newImports
    );
  }
}
