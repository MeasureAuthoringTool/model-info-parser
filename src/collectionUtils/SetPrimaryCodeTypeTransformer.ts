import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import MemberVariable from "../model/dataTypes/MemberVariable";
import AddImportTransformer from "./AddImportTransformer";
import DataType from "../model/dataTypes/DataType";
import PrimaryCodeType from "../model/dataTypes/PrimaryCodeType";

interface EntityTypeMapping {
  [dataType: string]: EntityDefinition;
}

function findMemberByName(
  memberName: string,
  entityDefinition: EntityDefinition
): MemberVariable {
  const { namespace, originalTypeName } = entityDefinition.metadata;

  const matchingMembers = entityDefinition.memberVariables.filter(
    (member: MemberVariable) => {
      return member.variableName === memberName;
    }
  );

  // No members found
  if (matchingMembers.length === 0) {
    throw new Error(
      `The path '${memberName}' cannot be found on ${namespace}.${originalTypeName}`
    );
  }

  // Too many members found
  if (matchingMembers.length > 1) {
    throw new Error(
      `The path '${memberName}' resolves to multiple locations on ${namespace}.${originalTypeName}`
    );
  }

  return matchingMembers[0];
}

function lookupEntityDefinition(
  dataType: DataType,
  mapping: EntityTypeMapping
): EntityDefinition {
  const { namespace, normalizedName } = dataType;
  const key = `${namespace}.${normalizedName}`;
  const result = mapping[key];
  if (!result) {
    throw new Error(`Cannot find EntityDefinition for type ${key}`);
  }
  return mapping[key];
}

/**
 * This transformer sets the primaryCodeType variable of an EntityDefinition
 */
export default class SetPrimaryCodeTypeTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public entityCollection: EntityCollection) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    const { primaryCodePath } = input.metadata;

    // If no primary code path, then there's no primary code
    if (primaryCodePath === null) {
      return input;
    }

    // Create a mapping of all known DataTypes to their EntityDefinitions
    const entityMapping: EntityTypeMapping = {};
    this.entityCollection.entities.forEach((entity) => {
      const { dataType } = entity;
      const { namespace, normalizedName } = dataType;
      const key = `${namespace}.${normalizedName}`;
      entityMapping[key] = entity;
    });

    // Navigate the object tree to find the nested member we're after
    const segments = primaryCodePath.split(".");
    const initialValue: PrimaryCodeType = new PrimaryCodeType(input.dataType, false, "");
    const result: PrimaryCodeType = segments.reduce(
      (accumulator: PrimaryCodeType, currentSegment: string) => {
        const currentEntity = lookupEntityDefinition(accumulator.dataType, entityMapping);
        const matchingMember = findMemberByName(currentSegment, currentEntity);
        const { dataType, isArray, variableName } = matchingMember;

        let newPath: string = accumulator.path;
        if (newPath !== "") {
          newPath = `${newPath}?.`
        }
        if (isArray) {
          newPath = `${newPath}${variableName}?.[0]`
        } else {
          newPath = `${newPath}${variableName}`
        }

        return new PrimaryCodeType(dataType, isArray, newPath);
      },
      initialValue
    );

    // const matchingMember = findMemberByName(primaryCodePath, input);
    // const { dataType, isArray } = matchingMember;

    // Add an import to the referenced type
    const addImportTransformer = new AddImportTransformer(result.dataType);
    const transformedInput = addImportTransformer.transform(input);


    // Set the primaryCodeType
    return transformedInput.clone({
      primaryCodeType: result,
    });
  }
}
