import _ from "lodash";
import FileWriter from "../FileWriter";
import classTemplate, {
  TemplateContext as ClassTemplateContext,
} from "../templates/typescript/classes/classTemplate";
import interfaceTemplate, {
  TemplateContext as InterfaceTemplateContext,
} from "../templates/typescript/interfaces/interfaceTemplate";
import internalTemplate from "../templates/typescript/internalTemplate";
import resourceMapTemplate from "../templates/typescript/resourceMapTemplate";
import indexTemplate from "../templates/typescript/indexTemplate";
import typeAliasTemplate from "../templates/typescript/typeAliases/typeAliasTemplate";
import Generator from "./Generator";
import EntityDefinition from "../model/dataTypes/EntityDefinition";
import FilePath from "../model/dataTypes/FilePath";
import EntityCollection from "../model/dataTypes/EntityCollection";
import TypeScriptInterfaceTransformer from "../collectionUtils/TypeScriptInterfaceTransformer";
import TypeScriptClassPreprocessor from "../preprocessors/TypeScriptClassPreprocessor";
import TypeScriptInterfacePreprocessor from "../preprocessors/TypeScriptInterfacePreprocessor";
import { getTypeScriptInterfacePrimitive } from "../templates/helpers/templateHelpers";
import TypeHierarchy from "../model/TypeHierarchy";
import DataType from "../model/dataTypes/DataType";

async function generateClassFile(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<void> {
  const { dataType } = entityDefinition;
  const { normalizedName } = dataType;

  const classPath = `${baseDirectory.value}/classes`;

  // This intermediate type is necessary because Handlebars
  // cannot handle computed properties
  const templateInput: ClassTemplateContext = {
    dataType: entityDefinition.dataType,
    parentDataType: entityDefinition.parentDataType,
    metadata: entityDefinition.metadata,
    memberVariables: entityDefinition.memberVariables,
    imports: entityDefinition.imports,
    primaryCode: entityDefinition.primaryCode,
  };

  const classContents: string = classTemplate(templateInput);

  const classWriter = new FileWriter(
    classContents,
    classPath,
    null,
    `${normalizedName}.ts`
  );
  await classWriter.writeFile();
}

async function generateInterfaceFile(
  entityDefinition: EntityDefinition,
  baseDirectory: FilePath
): Promise<void> {
  const { dataType } = entityDefinition;
  const { normalizedName } = dataType;

  const interfacePath = `${baseDirectory.value}/interfaces`;

  let interfaceContents: string;

  const isPrimitive = entityDefinition.dataType.primitive;
  const hasNoMembers = entityDefinition.memberVariables.length === 0;
  const isFhirType =
    entityDefinition.dataType.namespace === "FHIR" &&
    entityDefinition.dataType.typeName === "IType";

  // If it's a primitive, just create an alias to its system type
  if (isPrimitive) {
    const typeScriptType = getTypeScriptInterfacePrimitive(
      entityDefinition.dataType.normalizedName
    );
    const aliasInput = {
      baseTypeName: typeScriptType,
      name: normalizedName,
      skipImports: true,
    };

    interfaceContents = typeAliasTemplate(aliasInput);
  } else if (hasNoMembers && !isFhirType) {
    // If it has no members, just create an alias
    const { parentDataType } = entityDefinition;

    // All alias type must have a parent
    if (!parentDataType) {
      throw new Error(`Cannot alias type ${normalizedName} with no parent`);
    }

    const baseTypeName = parentDataType.normalizedName;

    const aliasInput = {
      baseTypeName,
      name: normalizedName,
      skipImports: false,
    };

    interfaceContents = typeAliasTemplate(aliasInput);
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
    null,
    `${normalizedName}.ts`
  );
  await interfaceWriter.writeFile();
}

async function generateIndexFiles(
  entityCollection: EntityCollection
): Promise<void> {
  // Generate ResourceMapping.ts
  const hierarchy = new TypeHierarchy(entityCollection);
  const resourceType = DataType.getInstance("FHIR", "Resource", entityCollection.baseDir);
  const resourceChildren: Array<DataType> = hierarchy.getAllChildrenFor(resourceType);

  const resourceMapContents = resourceMapTemplate({
    resourceTypes: resourceChildren
  });
  const resourceMapWriter = new FileWriter(
    resourceMapContents,
    entityCollection.baseDir.toString(),
    null,
    "ResourceMapping.ts"
  );
  await resourceMapWriter.writeFile();

  // Generate the index.ts file
  const indexContents: string = indexTemplate();
  const indexWriter = new FileWriter(
    indexContents,
    entityCollection.baseDir.toString(),
    null,
    "fhir.ts"
  );
  await indexWriter.writeFile();

  // Generate the internal.ts file
  // These types need to appear first in the list of exported modules
  const hoistedClassNames: Array<string> = [
    "Type",
    "Resource",
    "DomainResource",
    "Element",
    "BackboneElement",
    "Extension",
    "Quantity",
    "PrimitiveUri",
    "PrimitiveString",
    "PrimitiveBase64Binary",
    "PrimitiveBoolean",
    "PrimitiveCanonical",
    "PrimitiveCode",
    "PrimitiveDate",
    "PrimitiveDateTime",
    "PrimitiveDecimal",
    "PrimitiveId",
    "PrimitiveInstant",
    "PrimitiveInteger",
    "PrimitiveMarkdown",
    "PrimitiveOid",
    "PrimitivePositiveInt",
    "PrimitiveQuestion",
  ];

  const hoistedInterfaceNames: Array<string> = [
    "IType",
    "IResource",
    "IDomainResource",
    "IElement",
    "IBackboneElement",
    "IExtension",
    "IQuantity",
    "IPrimitiveUri",
    "IPrimitiveString",
    "IPrimitiveBase64Binary",
    "IPrimitiveBoolean",
    "IPrimitiveCanonical",
    "IPrimitiveCode",
    "IPrimitiveDate",
    "IPrimitiveDateTime",
    "IPrimitiveDecimal",
    "IPrimitiveId",
    "IPrimitiveInstant",
    "IPrimitiveInteger",
    "IPrimitiveMarkdown",
    "IPrimitiveOid",
    "IPrimitivePositiveInt",
    "IPrimitiveQuestion",
  ];

  // Get a list of all class names
  const classTypeNames: Array<string> = entityCollection.entities.map(
    (entity) => entity.dataType.normalizedName
  );

  // Trim above list if necessary (not likely for real modelinfo)
  const classesToHoist = _.intersection(hoistedClassNames, classTypeNames);

  // Remove existing occurrences of above types
  const trimmedClasses = _.difference(classTypeNames, classesToHoist);

  // Add the above names to the front of the array
  const classNames: Array<string> = [...classesToHoist, ...trimmedClasses];

  // Get a list of all interface names
  const interfaceTransformer = new TypeScriptInterfaceTransformer(
    entityCollection.baseDir
  );
  const interfaceEntities = entityCollection.transform(interfaceTransformer);
  const interfaceTypeNames: Array<string> = interfaceEntities.entities.map(
    (entity) => entity.dataType.normalizedName
  );

  // Trim above list if necessary (not likely for real modelinfo)
  const interfacesToHoist = _.intersection(
    hoistedInterfaceNames,
    interfaceTypeNames
  );

  // Remove existing occurrences of above types
  const trimmedInterfaces = _.difference(interfaceTypeNames, interfacesToHoist);

  // Add the above names to the front of the array
  const interfaceNames: Array<string> = [
    ...interfacesToHoist,
    ...trimmedInterfaces,
  ];

  const internalContents: string = internalTemplate({
    classNames,
    interfaceNames,
  });
  const writer = new FileWriter(
    internalContents,
    entityCollection.baseDir.toString(),
    null,
    "internal.ts"
  );
  await writer.writeFile();
}

async function generateModels(
  entityCollection: EntityCollection
): Promise<void[]> {
  // Preprocess class entities
  const classEntities = new TypeScriptClassPreprocessor().preprocess(
    entityCollection
  );

  // Generate all class files
  const classPromises = classEntities.entities.map(
    async (entity: EntityDefinition) => {
      return generateClassFile(entity, entityCollection.baseDir);
    }
  );

  // Preprocess interface entities
  const interfaceEntities = new TypeScriptInterfacePreprocessor().preprocess(
    entityCollection
  );
  // Generate all interface files
  const interfacePromises = interfaceEntities.entities.map(
    async (entity: EntityDefinition) => {
      return generateInterfaceFile(entity, entityCollection.baseDir);
    }
  );

  // Generate index.ts and internal.ts
  const indexPromise = generateIndexFiles(entityCollection);

  const allPromises = [...classPromises, ...interfacePromises, indexPromise];

  return Promise.all(allPromises);
}

const typeCheck: Generator = generateModels;
export default typeCheck;
