import MongoosePreprocessor from "../../src/preprocessors/MongoosePreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("MongoosePreprocessor", () => {
  const entityBuilder = new EntityDefinitionBuilder();

  let preprocessor: MongoosePreprocessor;
  let entityDefinition: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    preprocessor = new MongoosePreprocessor();
    entityDefinition = entityBuilder.buildEntityDefinition();
    entityCollection = new EntityCollection(
      [entityDefinition],
      FilePath.getInstance("/tmp")
    );
  });

  it("should do nothing extra for now", () => {
    expect(preprocessor.preprocess(entityCollection)).not.toBe(
      entityCollection
    );
  });
});
