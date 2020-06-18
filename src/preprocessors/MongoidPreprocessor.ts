import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";

/**
 * EntityCollection Preprocessor for the Mongoid-specific model generation
 */
export default class MongoidPreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    return super.preprocess(entityCollection);
  }
}
