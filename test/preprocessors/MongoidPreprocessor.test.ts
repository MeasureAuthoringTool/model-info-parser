import MongoidPreprocessor from "../../src/preprocessors/MongoidPreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("MongoidPreprocessor", () => {
  const entityBuilder = new EntityDefinitionBuilder();

  let preprocessor: MongoidPreprocessor;
  let entityDefinition: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    preprocessor = new MongoidPreprocessor();
    entityDefinition = entityBuilder.buildEntityDefinition();
    entityCollection = new EntityCollection(
      [entityDefinition],
      FilePath.getInstance("/tmp")
    );
  });

  it("should do nothing extra for now", () => {
    expect(preprocessor.preprocess(entityCollection)).not.toBe(entityCollection);
  });
});
