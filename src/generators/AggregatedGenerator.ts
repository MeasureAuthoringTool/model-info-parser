import Generator from "./Generator";
import EntityCollection from "../model/dataTypes/EntityCollection";

export default class AggregatedGenerator implements Generator {
  constructor(private generators: Array<Generator>) {}

  public generate(collection: EntityCollection): Array<Promise<void>> {
    let promises: Array<Promise<void>> = [];
    this.generators.forEach((generator: Generator) => {
      const generatorResults: Array<Promise<void>> = generator.generate(
        collection
      );
      promises = [...promises, ...generatorResults];
    });
    return promises;
  }
}
