import EntityCollection from "../model/dataTypes/EntityCollection";

type Generator = (entityCollection: EntityCollection) => Promise<Array<void>>;

export default Generator;
