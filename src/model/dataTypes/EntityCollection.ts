import EntityDefinition from "./EntityDefinition";
import ModelInfo from "../modelInfo/ModelInfo";
import FilePath from "./FilePath";
import Predicate from "../../collectionUtils/core/Predicate";
import Transformer from "../../collectionUtils/core/Transformer";
import CollectionUtils from "../../collectionUtils/CollectionUtils";

export default class EntityCollection {
  constructor(
    public readonly entities: Array<EntityDefinition>,
    public readonly baseDir: FilePath
  ) {}

  public static createEntityCollection(
    modelInfo: ModelInfo,
    baseDirIn: FilePath
  ): EntityCollection;

  public static createEntityCollection(
    modelInfo: ModelInfo,
    baseDirIn: string
  ): EntityCollection;

  public static createEntityCollection(
    modelInfo: ModelInfo,
    baseDirIn: string | FilePath
  ): EntityCollection {
    let baseDir: FilePath;
    if (baseDirIn instanceof FilePath) {
      baseDir = baseDirIn;
    } else {
      baseDir = FilePath.getInstance(baseDirIn);
    }

    const { types } = modelInfo;
    const entities: Array<EntityDefinition> = types.map((type) =>
      EntityDefinition.createEntityDefinition(type, baseDir)
    );

    return new EntityCollection(entities, baseDir);
  }

  public clone(): EntityCollection {
    const newEntities = this.entities.map((entity) => entity.clone());
    return new EntityCollection(newEntities, this.baseDir);
  }

  public addEntityDefinition(definition: EntityDefinition): EntityCollection {
    const clonedEntities = this.entities.map((entity) => entity.clone());
    const newEntities = [...clonedEntities, definition];
    return new EntityCollection(newEntities, this.baseDir);
  }

  public select(predicate: Predicate<EntityDefinition>): EntityCollection {
    const newEntities = CollectionUtils.select(this.entities, predicate);
    return new EntityCollection(newEntities, this.baseDir);
  }

  public selectRejected(
    predicate: Predicate<EntityDefinition>
  ): EntityCollection {
    const newEntities = CollectionUtils.selectRejected(
      this.entities,
      predicate
    );
    return new EntityCollection(newEntities, this.baseDir);
  }

  public transform(
    transformer: Transformer<EntityDefinition, EntityDefinition>
  ): EntityCollection {
    const newEntities = CollectionUtils.transform(this.entities, transformer);
    return new EntityCollection(newEntities, this.baseDir);
  }
}
