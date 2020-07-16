import FileWriter from "../FileWriter";
import classTemplate, {
  TemplateContext as ClassTemplateContext,
} from "../templates/typescript/classes/classTemplate";
import interfaceTemplate, {
  TemplateContext as InterfaceTemplateContext,
} from "../templates/typescript/interfaces/interfaceTemplate";
import typeAliasTemplate from "../templates/typescript/typeAliases/typeAliasTemplate";
import Generator from "./Generator";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";
import EntityCollection from "../model/dataTypes/EntityCollection";
import EntityInterfaceTransformer from "../collectionUtils/EntityInterfaceTransformer";

async function generateClassFile(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<void> {
  const { dataType } = entityDefinition;
  const { normalizedName, namespace } = dataType;

  const classPath = `${baseDirectory.value}/classes`;

  // This intermediate type is necessary because Handlebars
  // cannot handle computed properties
  const templateInput: ClassTemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    metadata: entityDefinition.metadata,
    memberVariables: entityDefinition.memberVariables,
    imports: entityDefinition.imports,
  };

  const classContents: string = classTemplate(templateInput);

  const classWriter = new FileWriter(
    classContents,
    classPath,
    namespace,
    `${normalizedName}.ts`
  );
  await classWriter.writeFile();
}

async function generateInterfaceFile(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<void> {
  const { dataType } = entityDefinition;
  const { normalizedName, namespace } = dataType;

  const interfacePath = `${baseDirectory.value}/interfaces`;

  let interfaceContents: string;

  // If there are no members, or it's a primitive, just create an alias
  const hasNoMembers = entityDefinition.memberVariables.length === 0;
  const isPrimitive = entityDefinition.dataType.primitive;
  const isFhirType =
    entityDefinition.dataType.namespace === "FHIR" &&
    entityDefinition.dataType.typeName === "IType";
  if (!isFhirType && (hasNoMembers || isPrimitive)) {
    const { parentDataType } = entityDefinition;

    // All alias type must have a parent
    if (!parentDataType) {
      throw new Error(`Cannot alias type ${normalizedName} with no parent`);
    }

    // We need to massage the values a bit so primitive types will all be the correct alias
    const baseTypeName = parentDataType.normalizedName;

    const aliasType = {
      baseTypeName,
      isRootType: false,
      name: normalizedName,
      namespace,
    };

    interfaceContents = typeAliasTemplate(aliasType);
  } else {
    // Not an alias type, but a "regular" interface

    // This intermediate type is necessary because Handlebars
    // cannot handle computed properties
    const templateInput: InterfaceTemplateContext = {
      dataType: entityDefinition.dataType,
      parentDataType: entityDefinition.parentDataType,
      metadata: entityDefinition.metadata,
      memberVariables: entityDefinition.memberVariables,
      imports: entityDefinition.imports,
    };

    interfaceContents = interfaceTemplate(templateInput);
  }

  const interfaceWriter = new FileWriter(
    interfaceContents,
    interfacePath,
    namespace,
    `${normalizedName}.ts`
  );
  await interfaceWriter.writeFile();
}

async function generate(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<string> {
  await generateClassFile(entityDefinition, baseDirectory);

  // Transform the EntityDefinition for use as an interface type
  const interfaceTransformer = new EntityInterfaceTransformer(baseDirectory);
  const interfaceEntityDefinition = interfaceTransformer.transform(
    entityDefinition
  );

  await generateInterfaceFile(interfaceEntityDefinition, baseDirectory);

  // If the interface type has a primitive, we need to import the IExtension interface
  // const hasPrimitive = !!entityDefinition.memberVariables.find(
  //   (memberVar) => memberVar.dataType.primitive
  // );
  // if (
  //   hasPrimitive &&
  //   !(namespace === "FHIR" && normalizedName === "Extension")
  // ) {
  //   const extensionType = DataType.getInstance("FHIR", "Extension", classPath);
  //
  //   const distinctTypes = safeAddTypeImport(
  //     entityDefinition.imports.dataTypes,
  //     extensionType,
  //     entityDefinition.dataType
  //   );
  //
  //   interfaceEntityDefinition = new EntityDefinition(
  //     entityDefinition.metadata,
  //     entityDefinition.dataType,
  //     entityDefinition.parentDataType,
  //     entityDefinition.memberVariables,
  //     new EntityImports(distinctTypes)
  //   );
  // }

  // If there are no members, or it's a primitive, just create an alias
  // if (hasNoMembers || isPrimitive) {

  // const isElementType = namespace === "FHIR" && baseTypeName === "Element";
  // if (
  //   isPrimitive && isElementType
  // ) {
  //   const mappedValue =
  //     primitiveTypeJsonMapping[
  //       interfaceEntityDefinition.metadata.originalTypeName
  //     ];
  //
  //   aliasType.isRootType = true;
  //   aliasType.baseTypeName = mappedValue;
  // }
  // }

  return "done"; // FIXME
}

async function generateModels(
  entityCollection: EntityCollection
): Promise<string[]> {
  const promises = entityCollection.entities.map(
    async (entity: EntityDefinition) => {
      return generate(entity, entityCollection.baseDir);
    }
  );

  return Promise.all(promises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
