import EntityCollection from "../model/dataTypes/EntityCollection";

type Generator = (entityCollection: EntityCollection) => Promise<Array<string>>;

export default Generator;
