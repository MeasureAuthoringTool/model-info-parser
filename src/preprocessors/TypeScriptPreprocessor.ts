import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";

/**
 * EntityCollection Preprocessor for the TypeScript-specific model generation
 */
export default class TypeScriptPreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    return super.preprocess(entityCollection);
  }
}
