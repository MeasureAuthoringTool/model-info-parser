import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";

/**
 * EntityCollection Preprocessor for the Mongoose-specific model generation
 */
export default class MongoosePreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    return super.preprocess(entityCollection);
  }
}
