import Preprocessor from "./Preprocessor";
import TypeScriptInterfaceTransformer from "../collectionUtils/TypeScriptInterfaceTransformer";
import EntityCollection from "../model/dataTypes/EntityCollection";

/**
 * EntityCollection Preprocessor for the TypeScript interfaces
 */
export default class TypeScriptInterfacePreprocessor implements Preprocessor {
  preprocess(entityCollection: EntityCollection): EntityCollection {
    return entityCollection.transform(
      new TypeScriptInterfaceTransformer(entityCollection.baseDir)
    );
  }
}
