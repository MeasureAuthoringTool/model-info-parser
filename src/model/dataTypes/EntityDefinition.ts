import DataType from "./DataType";
import EntityImports from "./EntityImports";
import EntityMetadata from "./EntityMetadata";
import MemberVariable from "./MemberVariable";
import TypeInfo from "../modelinfo/TypeInfo";
import FilePath from "./FilePath";
import distinctDataTypes from "./distinctDataTypes";
import Predicate from "../../collectionUtils/core/Predicate";

export default class EntityDefinition {
  constructor(
    private _metadata: EntityMetadata,
    private _dataType: DataType,
    private _parentDataType: DataType | null,
    private _memberVariables: Array<MemberVariable>,
    private _imports: EntityImports
  ) {}

  public get metadata(): EntityMetadata {
    return this._metadata;
  }

  public get dataType(): DataType {
    return this._dataType;
  }

  public get parentDataType(): DataType | null {
    return this._parentDataType;
  }

  public get memberVariables(): Array<MemberVariable> {
    return this._memberVariables;
  }

  public get imports(): EntityImports {
    return this._imports;
  }

  public clone(): EntityDefinition {
    const newMembers = this.memberVariables.map((member) => member.clone());

    return new EntityDefinition(
      this.metadata.clone(),
      this.dataType,
      this.parentDataType,
      newMembers,
      this.imports.clone()
    );
  }

  public addImport(importType: DataType): EntityDefinition {
    const result = this.clone();
    result._imports = this.imports.addImport(importType);
    return result;
  }

  public removeImports(predicate: Predicate<DataType>): EntityDefinition {
    const result = this.clone();
    result._imports = this.imports.removeImports(predicate);
    return result;
  }

  public addMemberVariable(memberVar: MemberVariable): EntityDefinition {
    const result = this.clone();
    result._memberVariables = [...result._memberVariables, memberVar];
    return result;
  }

  static createEntityDefinition(
    typeInfo: TypeInfo,
    baseDir: string
  ): EntityDefinition;
  static createEntityDefinition(
    typeInfo: TypeInfo,
    baseDir: FilePath
  ): EntityDefinition;
  static createEntityDefinition(
    typeInfo: TypeInfo,
    baseDirIn: FilePath | string
  ): EntityDefinition {
    let baseDir: FilePath;
    if (baseDirIn instanceof FilePath) {
      baseDir = baseDirIn;
    } else {
      baseDir = FilePath.getInstance(baseDirIn);
    }

    const {
      name,
      namespace,
      baseTypeName,
      baseTypeNamespace,
      elements,
    } = typeInfo;

    // Build up the DataType for this entity's parent
    let parentTypeName = "";
    let parentDataType: DataType | null = null;
    if (baseTypeName && baseTypeNamespace) {
      parentTypeName = `${baseTypeNamespace}.${baseTypeName}`;
      parentDataType = DataType.getInstance(
        baseTypeNamespace,
        baseTypeName,
        baseDir
      );
    }

    // Build up the metadata object
    const metaData = new EntityMetadata(namespace, name, parentTypeName);

    // Build up the DataType for this entity
    const dataType = DataType.getInstance(namespace, name, baseDir);

    // Build up the array of member variables
    const members: Array<MemberVariable> = MemberVariable.createMemberVariables(
      elements,
      baseDir
    );

    // Build up the array of imports
    const distinctTypes = distinctDataTypes(members, parentDataType, dataType);
    const imports = new EntityImports(distinctTypes);

    // Construct the final object
    return new EntityDefinition(
      metaData,
      dataType,
      parentDataType,
      members,
      imports
    );
  }
}
