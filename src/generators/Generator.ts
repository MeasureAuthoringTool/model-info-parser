import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";

type Generator = (
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
) => Promise<string>;

export default Generator;
