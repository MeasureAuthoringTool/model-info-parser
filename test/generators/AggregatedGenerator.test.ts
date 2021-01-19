import { restore as sinonRestore, SinonStub, stub } from "sinon";
import Generator from "../../src/generators/Generator";
import AggregatedGenerator from "../../src/generators/AggregatedGenerator";
import EntityCollection from "../../src/model/dataTypes/EntityCollection";
import FilePath from "../../src/model/dataTypes/FilePath";

describe("AggregatedGenerator", () => {
  let aggregator: AggregatedGenerator;
  let generatorFunc1: SinonStub<[EntityCollection], Array<Promise<void>>>;
  let generatorFunc2: SinonStub<[EntityCollection], Array<Promise<void>>>;
  let generator1: Generator;
  let generator2: Generator;
  let collection: EntityCollection;

  beforeEach(() => {
    collection = new EntityCollection([], FilePath.getInstance("/tmp"));
    generatorFunc1 = stub<[EntityCollection], Array<Promise<void>>>();
    generatorFunc1.returns([Promise.resolve()]);
    generator1 = {
      generate: generatorFunc1,
    };

    generatorFunc2 = stub<[EntityCollection], Array<Promise<void>>>();
    generatorFunc2.returns([Promise.resolve(), Promise.resolve()]);
    generator2 = {
      generate: generatorFunc2,
    };
  });

  afterEach(() => {
    sinonRestore();
  });

  describe("constructor", () => {
    it("should accept an empty array of Generators in the constructor", async () => {
      aggregator = new AggregatedGenerator([]);
      const result = await Promise.all(aggregator.generate(collection));
      expect(result).toBeArrayOfSize(0);
      expect(generatorFunc1).not.toHaveBeenCalled();
      expect(generatorFunc2).not.toHaveBeenCalled();
    });

    it("should accept a single Generators in the constructor", async () => {
      aggregator = new AggregatedGenerator([generator1]);
      const result = await Promise.all(aggregator.generate(collection));
      expect(result).toBeArrayOfSize(1);
      expect(generatorFunc1).toHaveBeenCalledWith(collection);
      expect(generatorFunc2).not.toHaveBeenCalled();
    });

    it("should accept multiple Generators in the constructor", async () => {
      aggregator = new AggregatedGenerator([generator1, generator2]);
      const result = await Promise.all(aggregator.generate(collection));
      expect(result).toBeArrayOfSize(3);
      expect(generatorFunc1).toHaveBeenCalledWith(collection);
      expect(generatorFunc2).toHaveBeenCalledWith(collection);
    });
  });
});
