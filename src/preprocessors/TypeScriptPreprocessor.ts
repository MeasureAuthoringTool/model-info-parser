import BasePreprocessor from "./BasePreprocessor";
import EntityCollection from "../model/dataTypes/EntityCollection";
import ChoiceMemberImportTransformer from "../collectionUtils/ChoiceMemberImportTransformer";

/**
 * EntityCollection Preprocessor for the TypeScript-specific model generation
 */
export default class TypeScriptPreprocessor extends BasePreprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    const superResult = super.preprocess(entityCollection);

    const transformer = new ChoiceMemberImportTransformer();
    return superResult.transform(transformer);
  }
}
