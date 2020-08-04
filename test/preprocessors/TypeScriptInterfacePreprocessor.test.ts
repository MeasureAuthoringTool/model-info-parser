import TypeScriptInterfacePreprocessor from "../../src/preprocessors/TypeScriptInterfacePreprocessor";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";
import FilePath from "../../src/model/dataTypes/FilePath";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";

describe("TypeScriptInterfacePreprocessor", () => {
  const entityBuilder = new EntityDefinitionBuilder();
  let preprocessor: TypeScriptInterfacePreprocessor;
  let path: FilePath;
  let entityDefinition: EntityDefinition;
  let entityCollection: EntityCollection;

  beforeEach(() => {
    path = FilePath.getInstance("/tmp");
    preprocessor = new TypeScriptInterfacePreprocessor();
    entityDefinition = entityBuilder.buildEntityDefinition();
    entityCollection = new EntityCollection([entityDefinition], path);
  });

  it("should delegate all logic to the TypeScriptInterfaceTransformer", () => {
    const transformSpy = jest.spyOn(entityCollection, "transform");

    const result = preprocessor.preprocess(entityCollection);
    expect(result).not.toBe(entityDefinition);
    expect(transformSpy).toHaveBeenCalledTimes(1);
  });
});
