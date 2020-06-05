import { normalizeTypeName } from "../../utils";
import IDataType from "./IDataType";
import { primitiveTypeCheck } from "./primitiveDataTypes";

// This cache is a map of namespace strings, whose objects are a map of types under that namespace
// E.g.: { "FHIR": { "Account": { /* Account obj }, "Activity": { /* Activity Obj */ } }
interface ICachedNamespace {
  [key: string]: ComplexDataType;
}
interface ICacheType {
  [key: string]: ICachedNamespace;
}

export default class ComplexDataType implements IDataType {
  private static cache: ICacheType = {};

  public readonly systemType: boolean = false;

  public normalizedName: string;

  public primitive: boolean;

  public static getInstance(
    namespace: string,
    typeName: string
  ): ComplexDataType {
    let cachedNamespace: ICachedNamespace = ComplexDataType.cache[namespace];

    // If namespace not found, create and add to cache
    if (!cachedNamespace) {
      cachedNamespace = {};
      ComplexDataType.cache[namespace] = cachedNamespace;
    }

    let cachedType: ComplexDataType = cachedNamespace[typeName];

    // If type not found, create and add to cache
    if (!cachedType) {
      cachedType = new ComplexDataType(namespace, typeName);
      cachedNamespace[typeName] = cachedType;
    }

    return cachedType;
  }

  private constructor(
    public readonly namespace: string,
    public readonly typeName: string
  ) {
    this.normalizedName = normalizeTypeName(this.typeName);
    this.primitive = primitiveTypeCheck(this.typeName);
  }
}
