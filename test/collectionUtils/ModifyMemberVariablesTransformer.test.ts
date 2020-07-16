import ModifyMemberVariablesTransformer from "../../src/collectionUtils/ModifyMemberVariablesTransformer";
import NOPTransformer from "../../src/collectionUtils/core/NOPTransformer";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityDefinitionBuilder from "../model/dataTypes/EntityDefinitionBuilder";

import SpyInstance = jest.SpyInstance;

describe("ModifyMemberVariablesTransformer", () => {
  let noOpTransformer: NOPTransformer<MemberVariable>;
  let transformSpy: SpyInstance;
  let entity: EntityDefinition;

  beforeEach(() => {
    entity = new EntityDefinitionBuilder().buildEntityDefinition();
    noOpTransformer = new NOPTransformer<MemberVariable>();
    transformSpy = jest.spyOn(noOpTransformer, "transform");
  });

  describe("#transform()", () => {
    it("should call the transformer for each memberVariables", () => {
      const transformer = new ModifyMemberVariablesTransformer(noOpTransformer);
      const result = transformer.transform(entity);
      expect(entity).not.toBe(result);
      expect(transformSpy).toHaveBeenCalledTimes(2);
    });
  });
});
