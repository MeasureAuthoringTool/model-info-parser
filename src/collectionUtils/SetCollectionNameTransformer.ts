import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";

/**
 * A Transformer implementation that sets the collectionName property
 * on an EntityDefinition instance
 */
export default class SetCollectionNameTransformer
  implements Transformer<EntityDefinition, EntityDefinition> {
  constructor(public readonly collectionName: string) {}

  transform(input: EntityDefinition): EntityDefinition {
    const newEntityDefinition = input.clone();
    return newEntityDefinition.setCollectionName(this.collectionName);
  }
}
