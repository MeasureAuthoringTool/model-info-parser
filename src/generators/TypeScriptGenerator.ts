import FileWriter from "../FileWriter";
import ComplexDataType from "../model/dataTypes/ComplexDataType";
import {
  filterDataTypeArray,
  removeDuplicateDataTypes,
  safeAddTypeImport,
  sortDataTypes,
} from "../model/dataTypes/distinctDataTypes";
import { primitiveTypeJsonMapping } from "../model/dataTypes/primitiveDataTypes";
import TypeInfo from "../model/TypeInfo";
import classTemplate from "../templates/typescript/classes/classTemplate";
import interfaceTemplate from "../templates/typescript/interfaces/interfaceTemplate";
import typeAliasTemplate from "../templates/typescript/typeAliases/typeAliasTemplate";
import IGenerator from "./IGenerator";

export default class TypeScriptGenerator implements IGenerator {
  async generate(typeInfo: TypeInfo, baseDirectory: string): Promise<string> {
    const classContents: string = classTemplate(typeInfo);
    const { namespace, name, baseDataType } = typeInfo;

    const classFileName = `${name}.ts`;
    const interfaceFileName = `I${name}.ts`;

    const interfacePath = baseDirectory + "/interfaces";
    const classPath = baseDirectory + "/classes";

    const classWriter = new FileWriter(
      classContents,
      classPath,
      namespace,
      classFileName
    );
    await classWriter.writeFile();

    // If the interface type has a primitive, we need to import the IExtension interface
    const hasPrimitive = !!typeInfo.memberVariables.find(
      (memberVar) => memberVar.dataType.primitive
    );

    if (hasPrimitive) {
      let { distinctTypes } = typeInfo;
      const extensionType = ComplexDataType.getInstance("FHIR", "Extension");

      distinctTypes = safeAddTypeImport(distinctTypes, extensionType, name, namespace);

      typeInfo.distinctTypes = distinctTypes;
    }

    let interfaceContents: string = interfaceTemplate(typeInfo);

    // If there are no members, or it's a primitive, just create an alias
    if (typeInfo.memberVariables.length === 0 || typeInfo.primitive) {
      // We need to massage the values a bit so primitive types will all be the correct alias
      if (!baseDataType) {
        throw new Error(`Cannot alias type ${name} with no parent`);
      }
      const baseTypeName = baseDataType.normalizedName;

      const aliasType = {
        name,
        namespace,
        baseTypeName,
        isRootType: false,
      };

      if (
        typeInfo.primitive &&
        namespace === "FHIR" &&
        baseTypeName === "Element"
      ) {
        const mappedValue = primitiveTypeJsonMapping[typeInfo.fhirName];

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
}
