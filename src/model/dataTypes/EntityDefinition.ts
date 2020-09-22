import DataType from "./DataType";
import EntityImports from "./EntityImports";
import EntityMetadata from "./EntityMetadata";
import MemberVariable from "./MemberVariable";
import TypeInfo from "../modelInfo/TypeInfo";
import FilePath from "./FilePath";
import distinctDataTypes from "./distinctDataTypes";
import Transformer from "../../collectionUtils/core/Transformer";
import Predicate from "../../collectionUtils/core/Predicate";
import CollectionUtils from "../../collectionUtils/CollectionUtils";
import PrimaryCode from "./PrimaryCode";

export default class EntityDefinition {
  constructor(
    private _metadata: EntityMetadata,
    private _dataType: DataType,
    private _parentDataType: DataType | null,
    private _memberVariables: Array<MemberVariable>,
    private _imports: EntityImports,
    private _primaryCode: PrimaryCode | null,
    private _collectionName: string | null = null
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

  public get collectionName(): string | null {
    return this._collectionName;
  }

  public get primaryCode(): PrimaryCode | null {
    return this._primaryCode;
  }

  public clone(fieldsToUpdate?: Partial<EntityDefinition>): EntityDefinition {
    const partial: Partial<EntityDefinition> | undefined = fieldsToUpdate;

    let newMetadata: EntityMetadata;
    if (partial?.metadata !== undefined) {
      newMetadata = partial.metadata;
    } else {
      newMetadata = this.metadata.clone();
    }

    let newDataType: DataType;
    if (partial?.dataType !== undefined) {
      newDataType = partial.dataType;
    } else {
      newDataType = this.dataType;
    }

    let newParentType: DataType | null;
    if (partial?.parentDataType !== undefined) {
      newParentType = partial.parentDataType;
    } else {
      newParentType = this.parentDataType;
    }

    let newMembers: Array<MemberVariable>;
    if (partial?.memberVariables !== undefined) {
      newMembers = partial.memberVariables;
    } else {
      newMembers = this.memberVariables.map((member) => member.clone());
    }

    let newImports: EntityImports;
    if (partial?.imports !== undefined) {
      newImports = partial.imports;
    } else {
      newImports = this.imports.clone();
    }

    let newPrimaryCode: PrimaryCode | null;
    if (partial?.primaryCode !== undefined) {
      newPrimaryCode = partial.primaryCode;
    } else {
      newPrimaryCode = this.primaryCode;
    }

    let newCollectionName: string | null;
    if (partial?.collectionName !== undefined) {
      newCollectionName = partial.collectionName;
    } else {
      newCollectionName = this.collectionName;
    }

    return new EntityDefinition(
      newMetadata,
      newDataType,
      newParentType,
      newMembers,
      newImports,
      newPrimaryCode,
      newCollectionName
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

  public removeMemberVariables(
    predicate: Predicate<MemberVariable>
  ): EntityDefinition {
    const result = this.clone();
    result._memberVariables = CollectionUtils.selectRejected(
      this._memberVariables,
      predicate
    );
    return result;
  }

  public transformMemberVariables(
    transformer: Transformer<MemberVariable, MemberVariable>
  ): EntityDefinition {
    const result = this.clone();
    result._memberVariables = CollectionUtils.transform(
      this.memberVariables,
      transformer
    );
    return result;
  }

  public setPrimaryCode(newPrimaryCode: PrimaryCode | null): EntityDefinition {
    return this.clone({
      primaryCode: newPrimaryCode,
    });
  }

  public setCollectionName(newName: string | null): EntityDefinition {
    return this.clone({
      collectionName: newName,
    });
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
      primaryCodePath,
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
    const metaData = new EntityMetadata(
      namespace,
      name,
      parentTypeName,
      primaryCodePath
    );

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
    // Note: the primaryCodeType cannot be determined by a single TypeInfo
    // It will have to be set by a Transformer with access to the entire EntityCollection
    return new EntityDefinition(
      metaData,
      dataType,
      parentDataType,
      members,
      imports,
      null // this cannot be determined yet
    );
  }
}
