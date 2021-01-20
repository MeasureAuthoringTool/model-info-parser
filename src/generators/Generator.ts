import EntityCollection from "../model/dataTypes/EntityCollection";

export default interface Generator {
  generate: (entityCollection: EntityCollection) => Array<Promise<void>>;
}
