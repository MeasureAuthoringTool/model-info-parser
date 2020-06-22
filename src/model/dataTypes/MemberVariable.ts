import _ from "lodash";
import DataType from "./DataType";
import Element from "../modelInfo/Element";
import ChoiceElement from "../modelInfo/ChoiceElement";
import ListElement from "../modelInfo/ListElement";
import SimpleElement from "../modelInfo/SimpleElement";
import FilePath from "./FilePath";

export const enum RelationshipType {
  EmbedsOne = "embeds_one",
  EmbedsMany = "embeds_many",
  BelongsTo = "belongs_to",
  HasOne = "has_one",
  HasMany = "has_many",
  HasAndBelongsToMany = "has_and_belongs_to_many",
}

export default class MemberVariable {
  public readonly dataType: DataType;

  public readonly variableName: string;

  public readonly isArray: boolean;

  public readonly relationshipType: RelationshipType;

  public readonly bidirectional: boolean;

  constructor(
    dataType: DataType,
    variableName: string,
    isArray = false,
    relationshipType?: RelationshipType,
    bidirectional = true
  ) {
    this.dataType = dataType;
    this.variableName = variableName;
    this.isArray = isArray;
    this.bidirectional = bidirectional;

    // If not specified, default to "embeds_many" for arrays, and "embeds_one" for non-arrays
    if (!relationshipType) {
      this.relationshipType = isArray
        ? RelationshipType.EmbedsMany
        : RelationshipType.EmbedsOne;
    } else {
      this.relationshipType = relationshipType;
    }
  }

  public clone(): MemberVariable {
    return new MemberVariable(
      this.dataType,
      this.variableName,
      this.isArray,
      this.relationshipType,
      this.bidirectional
    );
  }

  /**
   * Convert an array of various Element types into an array of MemberVariables
   */
  public static createMemberVariables(
    elements: Array<Element>,
    baseDir: string
  ): Array<MemberVariable>;

  public static createMemberVariables(
    elements: Array<Element>,
    baseDir: FilePath
  ): Array<MemberVariable>;

  public static createMemberVariables(
    elements: Array<Element>,
    baseDirIn: FilePath | string
  ): Array<MemberVariable> {
    let baseDir: FilePath;
    if (baseDirIn instanceof FilePath) {
      baseDir = baseDirIn;
    } else {
      baseDir = FilePath.getInstance(baseDirIn);
    }

    const initial: Array<MemberVariable> = [];
    return elements.reduce((accumulator, currentElement) => {
      const newMembers = MemberVariable.createMemberVariable(
        currentElement,
        baseDir
      );
      return [...accumulator, ...newMembers];
    }, initial);
  }

  /**
   * Convert a single Element of any type into an array of MemberVariables.
   * SimpleElement and ListElement parameters will return an array with one MemberVariable,
   * while ChoiceElement parameters will result in one MemberVariable per choice.
   */
  public static createMemberVariable(
    element: Element,
    baseDir: FilePath
  ): Array<MemberVariable>;

  public static createMemberVariable(
    element: Element,
    baseDir: string
  ): Array<MemberVariable>;

  public static createMemberVariable(
    element: Element,
    baseDirIn: FilePath | string
  ): Array<MemberVariable> {
    let baseDir: FilePath;
    if (baseDirIn instanceof FilePath) {
      baseDir = baseDirIn;
    } else {
      baseDir = FilePath.getInstance(baseDirIn);
    }

    if (baseDir.isRelative()) {
      throw new Error(
        `Cannot create MemberVariable with relative base directory "${baseDirIn.toString()}"`
      );
    }

    if (element instanceof SimpleElement) {
      const simpleElement: SimpleElement = element;
      const dataType = DataType.getInstance(
        simpleElement.namespace,
        simpleElement.typeName,
        baseDir
      );
      const member = new MemberVariable(dataType, simpleElement.name, false);
      return [member];
    }

    if (element instanceof ListElement) {
      const listElement: ListElement = element;
      const dataType = DataType.getInstance(
        listElement.namespace,
        listElement.typeName,
        baseDir
      );
      const member = new MemberVariable(dataType, listElement.name, true);
      return [member];
    }

    if (element instanceof ChoiceElement) {
      const { name, choices } = element;

      return choices.map((choice) => {
        const variableName = `${name}${_.upperFirst(choice.typeName)}`;
        const dataType = DataType.getInstance(
          choice.namespace,
          choice.typeName,
          baseDir
        );
        return new MemberVariable(dataType, variableName, false);
      });
    }

    throw new Error("Unrecognized Element type");
  }
}
