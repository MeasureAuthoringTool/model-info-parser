import FileWriter from "../FileWriter";
import DataType from "../model/dataTypes/DataType";
import { safeAddTypeImport } from "../model/dataTypes/distinctDataTypes";
import { primitiveTypeJsonMapping } from "../model/dataTypes/primitiveDataTypes";
import classTemplate, {
  ITemplateContext as IClassTemplateContext,
} from "../templates/typescript/classes/classTemplate";
import interfaceTemplate, {
  ITemplateContext as IInterfaceTemplateContext,
} from "../templates/typescript/interfaces/interfaceTemplate";
import typeAliasTemplate from "../templates/typescript/typeAliases/typeAliasTemplate";
import IGenerator from "./IGenerator";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";
import EntityImports from "../model/dataTypes/EntityImports";

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  const classTemplateInput: IClassTemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    metadata: entityDefinition.metadata,
    memberVariables: entityDefinition.memberVariables,
    imports: entityDefinition.imports,
  };

  const classContents: string = classTemplate(classTemplateInput);

  const { dataType, parentDataType } = entityDefinition;
  const { normalizedName, namespace } = dataType;

  const classFileName = `${normalizedName}.ts`;
  const interfaceFileName = `I${normalizedName}.ts`;

  const interfacePath = `${baseDirectory.value}/interfaces`;
  const classPath = `${baseDirectory.value}/classes`;

  const classWriter = new FileWriter(
    classContents,
    classPath,
    namespace,
    classFileName
  );
  await classWriter.writeFile();

  // If the interface type has a primitive, we need to import the IExtension interface
  // TODO this whole section needs to be re-done
  let interfaceEntityDefinition = entityDefinition;
  const hasPrimitive = !!entityDefinition.memberVariables.find(
    (memberVar) => memberVar.dataType.primitive
  );
  if (
    hasPrimitive &&
    !(namespace === "FHIR" && normalizedName === "Extension")
  ) {
    const extensionType = DataType.getInstance("FHIR", "Extension", classPath);

    const distinctTypes = safeAddTypeImport(
      entityDefinition.imports.dataTypes,
      extensionType,
      entityDefinition.dataType
    );

    interfaceEntityDefinition = new EntityDefinition(
      entityDefinition.metadata,
      entityDefinition.dataType,
      entityDefinition.parentDataType,
      entityDefinition.memberVariables,
      new EntityImports(distinctTypes)
    );
  }
  const interfaceTemplateInput: IInterfaceTemplateContext = {
    dataType: interfaceEntityDefinition.dataType,
    parentDataType: interfaceEntityDefinition.parentDataType,
    metadata: interfaceEntityDefinition.metadata,
    memberVariables: interfaceEntityDefinition.memberVariables,
    imports: interfaceEntityDefinition.imports,
  };

  let interfaceContents: string = interfaceTemplate(interfaceTemplateInput);

  // If there are no members, or it's a primitive, just create an alias
  if (
    interfaceEntityDefinition.memberVariables.length === 0 ||
    interfaceEntityDefinition.dataType.primitive
  ) {
    // We need to massage the values a bit so primitive types will all be the correct alias
    if (!parentDataType) {
      throw new Error(`Cannot alias type ${normalizedName} with no parent`);
    }
    const baseTypeName = parentDataType.normalizedName;

    const aliasType = {
      baseTypeName,
      isRootType: false,
      name: normalizedName,
      namespace,
    };

    if (
      interfaceEntityDefinition.dataType.primitive &&
      namespace === "FHIR" &&
      baseTypeName === "Element"
    ) {
      const mappedValue =
        primitiveTypeJsonMapping[
          interfaceEntityDefinition.metadata.originalTypeName
        ];

      aliasType.isRootType = true;
      aliasType.baseTypeName = mappedValue;
    }

    interfaceContents = typeAliasTemplate(aliasType);
  }

  const interfaceWriter = new FileWriter(
    interfaceContents,
    interfacePath,
    namespace,
    interfaceFileName
  );
  await interfaceWriter.writeFile();
  return classContents;
}

const typeCheck: IGenerator = generate;
export default typeCheck;
