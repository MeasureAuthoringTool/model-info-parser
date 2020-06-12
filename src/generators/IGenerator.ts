import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";

type IGenerator = (
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
) => Promise<string>;

export default IGenerator;
