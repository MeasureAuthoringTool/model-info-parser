import Transformer from "./core/Transformer";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import { convertDataType } from "./TypeScriptInterfaceTransformer";
import FilePath from "../model/dataTypes/FilePath";
import AddImportTransformer from "./AddImportTransformer";

/**
 * This transformer adds an import of the interface type that matches
 * the data type of the entity. For example, it would add an IExtension
 * import to the Extension EntityDefintion
 */
export default class AddInterfaceImportTransformer extends Transformer<
  EntityDefinition,
  EntityDefinition
> {
  constructor(public readonly baseDir: FilePath) {
    super();
  }

  public transform(input: EntityDefinition): EntityDefinition {
    const interfaceType = convertDataType(input.dataType, this.baseDir);

    const addInputTransformer = new AddImportTransformer(interfaceType);

    return addInputTransformer.transform(input);
  }
}
