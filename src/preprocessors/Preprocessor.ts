import EntityCollection from "../model/dataTypes/EntityCollection";

/**
 * A simple interface that defining the concept of a EntityCollection
 * preprocessor.
 */
export default interface Preprocessor {
  preprocess: (entityCollection: EntityCollection) => EntityCollection;
}
