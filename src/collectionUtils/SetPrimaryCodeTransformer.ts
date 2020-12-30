import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import EntityCollection from "../model/dataTypes/EntityCollection";
import MemberVariable from "../model/dataTypes/MemberVariable";
import AddImportTransformer from "./AddImportTransformer";
import DataType from "../model/dataTypes/DataType";
import PathSegment from "../model/dataTypes/PathSegment";
import PrimaryCode from "../model/dataTypes/PrimaryCode";

interface EntityTypeMapping {
  [dataType: string]: EntityDefinition;
}

function findMemberByName(
  memberName: string,
  entityDefinition: EntityDefinition
): MemberVariable {
  const { namespace, originalTypeName } = entityDefinition.metadata;

  const matchingMembers = entityDefinition.memberVariables.filter(
    (member: MemberVariable) => memberName.startsWith(member.variableName)
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
export default class SetPrimaryCodeTransformer extends Transformer<
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
    const segmentStrings = primaryCodePath.split(".");

    // return type is the last segment we encounter
    let returnType: Array<DataType> = [];

    const initialValue: Array<PathSegment> = [];
    const pathSegments: Array<PathSegment> = segmentStrings.reduce(
      (accumulator: Array<PathSegment>, currentSegmentString: string) => {
        // Find the entity for the current segment
        let currentDataType: DataType;
        if (accumulator.length === 0) {
          currentDataType = input.dataType;
        } else {
          currentDataType = accumulator[accumulator.length - 1].dataType;
        }
        const currentBaseEntity = lookupEntityDefinition(
          currentDataType,
          entityMapping
        );

        // Find the member variable
        const matchingMember = findMemberByName(
          currentSegmentString,
          currentBaseEntity
        );

        const { choiceTypes, variableName, dataType, isArray } = matchingMember;

        if (choiceTypes.length === 0) {
          returnType = [dataType];
        } else {
          returnType = choiceTypes;
        }

        const newSegment = new PathSegment(dataType, isArray, variableName);
        accumulator.push(newSegment);
        return accumulator;
      },
      initialValue
    );

    const primaryCode = new PrimaryCode(pathSegments, returnType);

    // Add an import to the return type
    const addImportTransformer = new AddImportTransformer(
      ...primaryCode.returnType
    );
    const transformedInput = addImportTransformer.transform(input);

    // Set the primaryCode
    return transformedInput.clone({
      primaryCode,
    });
  }
}
